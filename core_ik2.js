/*
 * Copyright (c) 2023-2025 Dmitry Romanchenko.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

// Этот файл представляет собой эмулятор ядра микрокомпьютера на базе БИС К145ИК2 и К145ИК5хх.
// Данные БИС применялись в различных советских калькуляторах серии МК и Б3.
// Создан на основе данных из книги "Однокристалльные микрокомпьютеры в системах управления"
// под редакцией В.П. Захарова, Киев: Техника, 1984, а также на основе анализа фотографий кристаллов
// этих БИС, опубликованных на сайте "Радиокартинки" https://radiopicture.listbb.ru 

class Command extends BitLine {
    static size = 19
    #asp = 0
    #mod = false
    #com = 0
    #cus = 0
    #ap = 0
    constructor(line) {
        if (line.length != Command.size) {
            throw new Error("Wrong command line size: " + line.length)
        }
        super(line, true)
        this.#asp = this.ofsToInt([4, 3, 2, 1, 0])
        this.#mod = this.ofsToInt([5]) != 0
        this.#com = this.ofsToInt([6, 7, 8])
        this.#cus = this.ofsToInt([9, 10, 11])
        this.#ap  = this.ofsToInt([12, 13, 14, 15, 16, 17, 18])
    }

    //  поле АСП - адрес синхропрограммы
    get ASP() {
        return this.#asp
    }

    // поле МОД - флаг модификации регистра R
    // если МОД = 1, то изменение регистра R запрещается,
    // а отображение регистра R0 на дисплее разрешается
    get MOD() {
        return this.#mod
    }

    // поле КОМ определяет порядок выполнения синхропрограммы
    get COM() {
        return this.#com
    }

    // поле КУС определяет порядок вычисления адреса следующей команды
    get CUS() {
        return this.#cus
    }

    get Keypad() {
        return (this.#cus & 0x3) == 0
    }

    // поле АП определяет данные для вычисления адреса следующей команды и регистра РВ
    get AP() {
        return this.#ap
    }

    toStr() {
        var result = ""
        result += Hex.byteToStr(this.ASP)
        result += '.'
        result += this.MOD ? '1' : '0'
        result += '.'
        result += Hex.nibbleToStr(this.COM)
        result += '.'
        result += Hex.nibbleToStr(this.CUS)
        result += '.'
        result += Hex.byteToStr(this.AP)
        return result
    }

}

class Commands extends BitLine {
    static num = 128
    static cmdPerLine = 2
    table = []

    constructor(lines) {
        if (lines.length != Command.size * Commands.num) {
            throw new Error("Wrong commands table size")
        }
        super(lines, true)
        var cmd = 0
        for (cmd = 0; cmd < Commands.num; ++cmd) {
            var line = this.ofsToStr(this.#getCommandOffsets(cmd))
            this.table[cmd] = new Command(line)
        }
    }

    // Расчёт смещения начала строки в диодной матрице по адресу команды
    #getTableLineOffset(cmd) {
        return Commands.cmdPerLine * Command.size * ((cmd & 0x20) != 0 ? cmd & 0x1f : ((cmd & 0x1f) ^ 0x1f) | 0x20)
    }

    #getCommandOffsets(cmd) {
        var offsets = []
        var i = 0
        var ofs = this.#getTableLineOffset(cmd) + ((cmd & 0x40) != 0 ? 1 : 0)
        for (i = 0; i < Command.size; ++i) {
            offsets[i] = ofs
            ofs += Commands.cmdPerLine
        }
        return offsets
    }

    getCommand(acmd) {
        return this.table[acmd]
    }
}

class SProgram extends BitLine {
    static size = 30
    static num = 6
    static phases = 3
    static bits = 5
    static progOffsets = [4, 0, 2, 5, 1, 3]

    #sprog = []

    constructor(line) {
        if (line.length != SProgram.phases * SProgram.size) {
            throw new Error("Wrong synchroprogram line size: " + line.length)
        }
        super(line)
        var prog
        for (prog = 0; prog < SProgram.num; ++prog) {
            var phase
            for (phase = 0; phase < SProgram.phases; ++phase) {
                var offs = []
                var bit
                for (bit = 0; bit < SProgram.bits; ++bit) {
                    var ofs = SProgram.progOffsets[prog]
                    if (bit == 0)
                        ofs = SProgram.num - 1 - ofs
                    offs[SProgram.bits - 1 - bit] = ofs + SProgram.num * bit + SProgram.size * phase
                }
                this.#sprog[SProgram.phases * prog + phase] = this.ofsToInt(offs)
            }
        }
    }

    getAUC(cycle, com) {
        // таблица соответствий индекса синхропрограммы текущему циклу команды и её полю КОМ
        const indexes = [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ 3,  4,  4,  4,  4,  4,  4,  4,  5, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1,  3,  4,  5],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  1,  2],
            [ 0,  1,  1,  1,  1,  1,  1,  1,  2, -1, -1, -1],
            [ 3,  4,  4,  4,  4,  4,  4,  4,  5,  0,  1,  2],
            [ 0,  1,  1,  1,  1,  1,  1,  1,  2,  3,  4,  5]
        ]
        const stage = cycle / SProgram.phases | 0
        const phase = cycle % SProgram.phases
        const index = indexes[com][stage]
        if (index < 0) return -1
        return this.#sprog[SProgram.phases * index + phase]
    }

    toStr(com) {
        var result = ""
        var prog
        for (prog = 0; prog < SProgram.num; ++prog) {
            var phase
            for (phase = 0; phase < SProgram.phases; ++phase) {
                var idx = prog * SProgram.phases + phase
                if (idx != 0)
                    result += '.'
                var auc = this.getAUC(prog > 1 ? idx + (8 - 2) * SProgram.phases : idx, com)
                if (auc < 0)
                    result += "--"
                else
                    result += Hex.byteToStr(auc)
            }
        }
        return result
    }
}

class SPrograms extends BitLine {
    static num = 32
    #table = []

    constructor(lines) {
        if (lines.length != SPrograms.num * SProgram.phases * SProgram.size) {
            throw new Error("Wrong synchroprograms table size")
        }
        super(lines)
        var sp
        for (sp = 0; sp < SPrograms.num; ++sp) {
            var line = ""
            var phase
            for (phase = 0; phase < SProgram.phases; ++phase) {
                var beg = this.#getTableLineOffset(sp, phase)
                line += lines.substring(beg, beg + SProgram.size)
            }
            this.#table[sp] = new SProgram(line)
        }
    }

    // Расчёт смещения начала строки в диодной матрице по адресу синхропрограммы
    #getTableLineOffset(sp, phase) {
        return SProgram.size * (SPrograms.num * (SProgram.phases - 1 - phase) + ((sp ^ 0x1e) ^ (phase != 2 ? 0x1f : 0x00)))
    }

    getSP(asp) {
        return this.#table[asp]
    }
}

class Display extends BitLine {
    // количество цифр 
    static digits = 16
    static segments = 8

    // массив цифр
    #table
    #enabled
    #display

    constructor(lines) {
        if (lines.length != Display.digits * Display.segments) {
            throw new Error("Wrong segments table size: " + lines.length)
        }
        super(lines, true)
        this.#enabled = false
        this.#table = []
        this.#display = []
        var digit
        for (digit = 0; digit < Display.digits; ++digit) {
            this.#table[digit] = this.ofsToInt(this.#getSegmentsOffsets(this.#getTableLineOffset(digit)))
        }
    }

    set Enabled(val) {
        this.#enabled = val
    }

    get Data() {
        return this.#display
    }

    update(acc) {
        if (acc.Phase == 0) {
            const ofs = (this.#enabled ? 0x0 : 0xc) | acc.R
            this.#display[acc.Stage] = this.#table[ofs]
        }        
    }

    #getTableLineOffset(digit) {
        const ofss =[15, 7, 11, 3, 13, 5, 9, 1, 14, 6, 10, 2, 12, 4, 8, 0]
        return ofss[digit] * Display.segments
    } 

    // Расположение сегментов индикатора
    //    а
    //   ---
    // б| г |в
    //   --- 
    // д|   |е
    //   --- *и 
    //    ж
    #getSegmentsOffsets(ofs) {
        // Соответствие сегментов столбцам таблицы
        //            а  б  в  г  д  е  ж  и
        const segs = [4, 3, 7, 6, 5, 0, 1, 2]
        var i, res = []
        for (i = 0; i < segs.length; ++i) res[i] = segs[i] + ofs
        return res
    }
}


class Accumulator {
    static cycles = 36

    #num
    // индекс текущего цикла команды
    #index
    // регистр R
    #r
    // регистр M
    #m
    // регистр S
    #s
    // регистр текущего состояния флага L
    #l
    // регистр предыдущего состояния флага L
    #pl
    // регистр состояния клавиатуры Т
    #t
    // адрес текущейкоманды
    #apc
    // регистр РВ
    #rv
    // регистр для фиксации изменения регистра РВ при обработке нажатий клавиш
    #k
    // код нажатой клавиши: биты 0-3 - номер цикла Дх, биты 4 и 5 - входы К1 и К2 соответственно
    #key = 0

    constructor(num) {
        this.#num = num
        this.reset()
    }

    reset() {
        this.#index = -1
        this.#r = []
        this.#m = []
        var i
        for (i = 0; i < Accumulator.cycles; ++i) {
            this.#r[i] = 0
            this.#m[i] = 0
        }
        this.#s = 0
        this.#l = false
        this.#pl = false
        this.#t = false

        this.#apc = 0x00
        this.#rv = 0
        this.#k = 0
        this.#key = 0
    }

    step() {
        this.#index += 1
        if (this.#index >= Accumulator.cycles) {
            this.#index = 0
        }
        // изменение состояния флага L (бит переноса сумматора) происходит в следующем цикле
        // это важно при вычислении адреса следующей команды.
        // если последняя микрокоманда изменяет флаг L, то это изменение не должно учитываться
        // при вычислении нового адреса 
        this.#l = this.#pl
        return this.#index
    }

    keypad(cmd) {
        // Номер текущего цикла Д
        const di = this.#index
        // Номер цикла Д соответствующего нажатой клавише
        const dk = (this.#key & 0xf) * SProgram.phases
        // Состояние линий К1 и К2 (биты 4 и 5 соответственно)
        const k = di == dk ? (this.#key >> 4) & 3 : 0
        // Разрешение записи в регистр Т
        const tWr = cmd.Keypad && (di == 0 || (k != 0))
        // Разрешение модификации битов 5 и 6 регистра РВ
        const kWr = tWr || !this.#t
        if (tWr) this.#t = k != 0
        if (kWr) this.#k = k
    }

    get Phase() { return this.#index % SProgram.phases }
    get Stage() { return this.#index / SProgram.phases | 0 }
    getR(index) { return this.#r[index] }
    get R() { return this.#r[this.#index] }
    get NR() { return ~this.#r[this.#index] & 0xf }
    set R(val) { this.#r[this.#index] = val & 0xf }
    set R1(val) { 
        var index = this.#index - 1
        if (index < 0)
            index += Accumulator.cycles
        this.#r[index] = val & 0xf
    }
    get R33() {
        var index = this.#index + 3
        if (index >= Accumulator.cycles)
            index -= Accumulator.cycles
        return this.#r[index]
    }
    get R11() { return this.#r[30] }
 
    get M() { return this.#m[this.#index] }
    set M(val) { this.#m[this.#index] = val & 0xf }

    set D(data) { this.#m = data }

    get D() { return this.#m }

    get S() { return this.#s }
    get NS() { return ~this.#s & 0xf }
    set S(val) { this.#s = val & 0xf }

    get L() { return this.#l }
    get LV() { return this.#l ? 0 : 10 }
    set L(val) { this.#pl = val }

    get T() { return this.#t }

    get APC() { return this.#apc }
    set APC(val) { this.#apc = val & 0x7f }

    get RV() { return this.#rv }
    set RV(val) { this.#rv = val & 0x7f }

    get K() { return this.#k }
    set Key(val) { this.#key = val }

    // формула для преобразования адреса команды (сдвиг вправо и перенос с инверсией)
    #shift(val) { return (val >> 1) | ((val & 2) == 0 ? 0x40 : 0x00) }

    // текстовый вариант формулы следующего адреса команды
    formulaAPC(cmd) {
        const formulas = [
            "AC = T ? AP : AC; RV = (T ? AP : RV) | (K << 5)", // 0
            "AC = L ? (AC ROR 1) : AP",                        // 1
            "AC = L ? AP : (AC ROR 1)",                        // 2
            "AC = AP",                                         // 3
            "AC = AP | RV | K; RV |= (K << 5)",                // 4
            "AC = AP | RV",                                    // 5
            "AC = AP; RV = AP",                                // 6
            "AC = AP; RVL = R1.10"                             // 7
        ]
        var result = "F" + this.#num + ": "
        result += formulas[cmd.CUS]
        return result
    }

    // расчёт адреса следующей команды в зависимости от значения поля КУС текущей команды
    calcAPC(cmd) {
        switch(cmd.CUS) {
            case 0: {
                if (this.T) {
                    this.RV = cmd.AP
                    this.APC = cmd.AP
                }
                this.RV = (this.RV & 0x1f) | (this.K << 5)
                break
            }
            case 1: {
                if (this.L)
                    this.APC = this.#shift(this.APC)
                else
                    this.APC = cmd.AP
                break
            }
            case 2: {
                if (this.L)
                    this.APC = cmd.AP
                else
                    this.APC = this.#shift(this.APC)
                break
            }
            case 3: {
                this.APC = cmd.AP
                break
            }
            case 4: {
                this.RV = (this.RV & 0x1f) | (this.K << 5)
                this.APC = cmd.AP | this.RV
                break
            }
            case 5: {
                this.APC = cmd.AP | this.RV
                break
            }
            case 6: {
                this.RV = cmd.AP
                this.APC = cmd.AP
                break
            }
            case 7: {
                this.APC = cmd.AP
                this.RV = (this.RV & 0x70) | this.R11
                break
            }
        }
        this.#k = 0
    }

    #regToStr(reg, name) {
        var i, phase
        var result = ''
        for (phase = 0; phase < SProgram.phases; ++phase) {
            result += (phase == 0 ? '' : ' ') + name + phase + ':'
            for(i = 0; i < Accumulator.cycles / SProgram.phases; ++i) {
                if (i == 3) 
                    result += '-'
                result += Hex.nibbleToStr(reg[Accumulator.cycles - SProgram.phases * (i+1) + phase])
            }
        }
        return result
    }

    rToStr() {
        return this.#regToStr(this.#r, 'R')
    }

    mToStr() {
        return this.#regToStr(this.#m, 'M')
    }

    toStr() {
        var result = "I" + this.#num + ":"

        result += " PC:" + Hex.byteToStr(this.#apc)
        result += " RV:" + Hex.byteToStr(this.#rv)
        result += " " + this.rToStr()
        result += " " + this.mToStr()

        return result
    }

    toIndexStr(ofs) {
        var result = ""
        var index = this.#index + ofs
        while (index < 0)
            index += Accumulator.cycles
        while (index >= Accumulator.cycles)
            index -= Accumulator.cycles

        result += index % SProgram.phases
        result += "." + Math.trunc(index / SProgram.phases)

        return result
    }
}


class UCommand extends BitLine {
    static size = 18

    #bits
    #val
    constructor(line) {
        if (line.length != UCommand.size) {
            throw new Error("Wrong microcommand line size: " + line.length)
        }
        super(line)
        this.#bits = []
        this.#val = 0
        var i, mask
        for (i = 0, mask = 1; i < UCommand.size; ++i) {
            const bit = this.ofsToBool(i)
            this.#bits[i] = bit
            this.#val |= bit ? mask : 0
            mask <<= 1
        }
        // инверсия обратных микроприказов
        this.#val ^= 0x36001
    }

    // выполнение микроприказов текущей микрокоманды
    process(acc, mod) {
        var alpha = 0
        var betta = 0
        var gamma = false

        // первый операнд сумматора
        if (this.#bits[9])  alpha |= acc.LV
        if (this.#bits[10]) alpha |= acc.M
        if (this.#bits[11]) alpha |= acc.R
        if (this.#bits[12]) alpha |= acc.NR

        // второй операнд сумматора
        if (this.#bits[5]) betta |= acc.R
        if (this.#bits[6]) betta |= 6
        if (this.#bits[7]) betta |= acc.NS
        if (this.#bits[8]) betta |= acc.S

        // третий операнд сумматора (флаг переноса)
        if (this.#bits[2]) gamma |= !acc.T
        if (this.#bits[3]) gamma |= acc.L
        if (this.#bits[4]) gamma = true

        // вычисление суммы
        var sum = alpha + betta + (gamma ? 1 : 0)
        // флаг переноса
        const l = sum > 15
        // результат суммирования
        sum &= 0xf

        // сохранение флага переноса (при необходимости)
        if (!this.#bits[0]) acc.L = l

        // обработка регистра R
        var r = 0
        if (mod) r |= acc.R
        else {
            if ( this.#bits[1])  acc.R1 = sum
            if (!this.#bits[15]) r |= acc.R
            if (!this.#bits[16]) r |= acc.S
            if (!this.#bits[17]) r |= acc.R33
        }
        acc.R = r

        // изменение регистра M
        if (!this.#bits[13]) acc.M = acc.S
        // изменение регистра S
        if (!this.#bits[14]) acc.S = sum
    }

    toStr() {
        return Hex.longToStr(this.#val, 5)
    }
}

class UCommands extends BitLine {
    static num = 32

    #table = []

    constructor(lines) {
        if (lines.length != UCommands.num * UCommand.size) {
            throw new Error("Wrong microcommans table size: " + lines.length)
        }
        super(lines)

        var auc
        for (auc = 0; auc < UCommands.num; ++auc) {
            var line = lines.substring(UCommand.size * auc, UCommand.size * (auc + 1))
            this.#table[auc] = new UCommand(line)
        }
    }

    getUCommand(auc) {
        return this.#table[auc]
    }
}

class Core {
    #num
    #name
    #commands
    #sprograms
    #ucommands
    #accumulator
    #mnemonics
    #comments
    #log
    #count
    #display
    #skip

    constructor(num, name, log, commands, sprogs, ucmds, segments, mnemonics, comments) {
        this.#num = num
        this.#name = name
        this.#commands = new Commands(commands)
        this.#sprograms = new SPrograms(sprogs)
        this.#ucommands = new UCommands(ucmds)
        this.#accumulator = new Accumulator(num)
        this.#mnemonics = mnemonics
        this.#comments = comments
        this.#log = log
        this.#count = 0
        this.#display = new Display(segments)
        this.#skip = 0
    }

    reset() {
        this.#accumulator.reset()
        this.#count = 0
        this.#skip = 0
    }

    #getMnemonic(auc, mod) {
        var str = this.#mnemonics[auc][mod]
        str = str.replaceAll("R[+0]", "R"+this.#accumulator.toIndexStr(0))
        str = str.replaceAll("R[-3]", "R"+this.#accumulator.toIndexStr(3))
        str = str.replaceAll("R[-1]", "R"+this.#accumulator.toIndexStr(-1))
        str = str.replaceAll("M[+0]", "M"+this.#accumulator.toIndexStr(0))
        return str
    }

    #skipLog(cmd) {
        // Если ожидается ввод с клавиатуры и не нажата никакая клавиша
        if ((cmd.CUS & 3) == 0 && !this.#accumulator.T)
            if (this.#skip > 0)
                this.#skip -= 1
            else
                this.#log.skip()
        else
           this.#skip = 7
    }

    // подготовка данных и выполнение микрокоманды
    #stepE() {
        var res = true

        // индекс цикла выполнения текущей комады
        const index = this.#accumulator.step()
        // текущая команда
        const cmd = this.#commands.getCommand(this.#accumulator.APC)
        // вначале проверяем статус модификации команды: он разрешает вывод на дисплей
        if (index == 0) this.#display.Enabled = cmd.MOD
        // текущая синхропрограмма
        const sp = this.#sprograms.getSP(cmd.ASP)
        // трассировка выполнения
        if (this.#log.enable) {
            if (index == 0) {
                var line = "C" + this.#num + ": "
                line += Hex.byteToStr(this.#accumulator.APC)
                line += ":" + cmd.toStr()
                line += " # " + this.#comments[this.#accumulator.APC]
                this.#log.add(line)
                line = "S" + this.#num + ":    "
                line += Hex.byteToStr(cmd.ASP)
                line += ":" + sp.toStr(7)
                line += " > " + Hex.nibbleToStr(cmd.COM)
                line += ":" + sp.toStr(cmd.COM)
                this.#log.add(line)
            }
        }
        // адрес микрокоманды в зависимости от поля КОМ текущей команды
        const auc = sp.getAUC(index, cmd.COM)
        // если микрокоманда разрешена - выполняем её
        if (auc >= 0) {
            // текущая микрокоманда
            const ucmd = this.#ucommands.getUCommand(auc)
            ucmd.process(this.#accumulator, cmd.MOD)
            // трассировка выполнения
            if (this.#log.enable) {
                // информация о текущей микрокоманде
                const mnemonic = this.#getMnemonic(auc, cmd.MOD?1:0)
                // трассировка только активных микрокоманд 
                if (mnemonic.length > 0) {
                    var line = "U" + this.#num + ":       "

                    line += Hex.byteToStr(auc)
                    line += ":" + ucmd.toStr() + "  "
                    
                    // индекс цикла команды
                    line += Hex.nibbleToStr(index / 10 | 0)
                    line += Hex.nibbleToStr(index % 10)
                    // индекс регистров R, M
                    line += ">" + Hex.nibbleToStr(this.#accumulator.Phase)
                    line += "." + Hex.nibbleToStr(this.#accumulator.Stage)
                    line += " S:" + Hex.nibbleToStr(this.#accumulator.S)
                    line += " L:" + Hex.nibbleToStr(this.#accumulator.L?1:0)
                    line += " T:" + Hex.nibbleToStr(this.#accumulator.T?1:0)
                    line += " K:" + Hex.nibbleToStr(this.#accumulator.K)

                    line += " # " + mnemonic
                    this.#log.add(line)
                }
            }
        }
        // обновление данных дисплея
        this.#display.update(this.#accumulator)
        // обработка нажатия клавиш
        this.#accumulator.keypad(cmd)
        // в последнем цикле команды
        if (index == Accumulator.cycles-1) {
            // трассировка расчёта адреса следующей команды
            if (this.#log.enable) {
                this.#log.add(this.#accumulator.formulaAPC(cmd))
            }
            // расчёт адреса следующей команды
            this.#accumulator.calcAPC(cmd)
            // обработка данных трассировки
            this.#skipLog(cmd)
            res = false
        }
        return res
    }

    // получить данные дисплея
    get Display() {
        return this.#display.Data
    }

    get D() {
        return this.#accumulator.D
    }
    set D(data) {
        this.#accumulator.D = data
    }

    mToStr() {
        return this.#accumulator.mToStr()
    }

    step(key) {
        // сохранение состояния клавиатуры
        this.#accumulator.Key = key
        // трассировка выполнения
        if (this.#log.enable) {
            const text = 
                "H" + this.#num + ": " + this.#name + ", " +
                "cycle: " + ++this.#count + ", " +
                "key: " + Hex.byteToStr(key)
            this.#log.add(text)
        }

        // выполнение циклов команды
        while(this.#stepE()) { }

        // трассировка выполнения
        if (this.#log.enable) {
            this.#log.add(this.#accumulator.toStr())
        }
    }

    list() {
        var i
        for (i = 0; i < Commands.num; ++i)
            console.log(Hex.byteToStr(i) + ": " + this.#commands.getCommand(i).toStr())
        for (i = 0; i < SPrograms.num; ++i)
            console.log(Hex.byteToStr(i) + ": " + this.#sprograms.getSP(i).toStr(7))
    }
}
