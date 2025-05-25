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

// Этот файл представляет собой эмулятор ядра микрокомпьютера на базе БИС К145ИК13хх.
// Данные БИС применялись в различных советских калькуляторах серии МК и Б3.
// Создан на основе данных из книги "Программируемые калькуляторы. Устройство и использование"
// под редакцией Я.К. Трохименко, М.: Радио и связь, 1990, а также на основе анализа
// фотографий кристаллов этих БИС, опубликованных на сайте "Радиокартинки" https://radiopicture.listbb.ru 

class Command extends BitLine {
    // количество бит в команде
    static size = 23
    // количество синхропрограмм для обработки счётчика команд
    static spSize = 0x20
    // адрес синхропрограммы для обработки счётчика команд
    static pcSP = 0x5f
    // индекс цикла обработки мантиссы
    static ManIndex = 0
    // индекс цикла обработки экспоненты
    static ExpIndex = 27
    // индекс цикла обработки счётчика команд
    static ApcIndex = 36

    // массив адресов синхропрограмм комады
    #sps
    // флаг модификации регистра R
    #mod
    constructor(line) {
        if (line.length != Command.size) {
            throw new Error("Wrong command line size: " + line.length)
        }
        super(line, true)
        this.#sps = []
        this.#sps[0] = this.ofsToInt([0, 3, 6,  9, 12, 15, 18])
        this.#sps[1] = this.ofsToInt([1, 4, 7, 10, 13, 16, 19])
        this.#sps[2] = this.ofsToInt([2, 5, 8, 11, 14, 17, 20, 21])
        this.#mod = this.ofsToBool(22) != 0
    }

    // получить адрес синхропрограммы по индексу цикла
    getASP(index) {
       const stg = index < Command.ExpIndex ? 0 : index < Command.ApcIndex ? 1 : 2
       let asp = this.#sps[stg]
       if (stg == 2 && asp >= Command.spSize) asp = Command.pcSP
       return asp
    }

    // адрес синхропрограммы обработки мантиссы
    get MAN() {
        return this.#sps[0]
    }

    // адрес синхропрограммы обработки экспоненты
    get EXP() {
        return this.#sps[1]
    }

    // адрес синхропрограммы обработки счётчика команд
    get APC() {
        return this.#sps[2]
    }

    // флаг консольной команды
    get IsKeypad() {
        return this.APC < 4
    }

    // флаг модификации регистра R
    get MOD() {
        return this.#mod
    }

    // представление комады в виде текстовой строки
    toStr() {
        var result = ""
        result += Hex.byteToStr(this.#sps[0])
        result += '.'
        result += Hex.byteToStr(this.#sps[1])
        result += '.'
        result += Hex.byteToStr(this.#sps[2])
        result += '.'
        result += this.MOD ? 'M' : 'R'
        return result
    }
}

class Commands extends BitLine {
    // количество команд в диодной матрице
    static num = 256
    // количество команд в одной строке
    static cmdPerLine = 4
    // собственно таблица команд
    #table

    constructor(lines) {
        if (lines.length != Command.size * Commands.num) {
            throw new Error("Wrong commands table size")
        }
        super(lines, true)
        this.#table = []
        var cmd
        for (cmd = 0; cmd < Commands.num; ++cmd) {
            this.#table[cmd] = new Command(this.ofsToStr(this.#getCommandOffsets(cmd)))
        }
    }

    // Расчёт смещения начала строки в диодной матрице по адресу команды
    #getTableLineOffset(cmd) {
        var i, line
        const n = 6
        // старшие биты адреса смещаются вправо: A7:A6 -> A1:A0
        const lo = (cmd >> n) & 0x03
        // остальные биты переворачиваются и инвертируются A5:A0 -> ~A0:A5
        cmd ^= (cmd & 1) ? 0x01 : 0x3f
        for (i = 0, line = 0; i < n; ++i) {
            line <<= 1
            if (cmd & 1) line |= 1
            cmd >>= 1
        }
        return Commands.cmdPerLine * Command.size * line + lo
    }

    // расчёт смещений битов, определяющих команду
    #getCommandOffsets(cmd) {
        var offsets = []
        var i = 0
        var ofs = this.#getTableLineOffset(cmd)
        for (i = 0; i < Command.size; ++i, ofs += Commands.cmdPerLine) offsets[i] = ofs            
        return offsets
    }

    // получить команду по её адресу
    getCommand(acmd) {
        return this.#table[acmd]
    }
}

class SProgram extends BitLine {
    static stages = 3
    static phases = 3
    static bits = 6
    static size = SProgram.stages * SProgram.phases * SProgram.bits
    // порядок следования битов адреса микрокоманды
    static bitOrder = [4, 0, 1, 5, 3, 2]
    // порядок следования стадий синхропрограммы
    static stageOrder = [1, 0, 2]
    // адрес начала условных микрокоманд
    static ASPCond = 60

    // массив адресов микрокоманд (9 адресов микрокоманд)
    #sprog

    constructor(line) {
        if (line.length != SProgram.size) {
            throw new Error("Wrong synchroprogram line size: " + line.length)
        }
        super(line, true)
        this.#sprog = []
        var phase, stage, bit, n = 0
        for (stage = 0; stage < SProgram.stages; ++stage) {
            const stageIdx = SProgram.stageOrder[stage]
            for (phase = 0; phase < SProgram.phases; ++phase) {
                var offs = []
                for (bit = 0; bit < SProgram.bits; ++bit) {
                    offs[bit] = SProgram.stages * (SProgram.bits * phase + SProgram.bitOrder[bit]) + stageIdx
                }
                this.#sprog[n++] = this.ofsToInt(offs)
            }
        }
    }

    // расчёт индекса микрокоманды по индексу цикла
    getIndex(index) {
        const stages = [0, 1, 1, 1, 1, 1, 1, 1, 2, 0, 1, 2, 0, 1]
        const stage = index / SProgram.phases | 0
        return index % SProgram.phases + SProgram.phases * stages[stage]
    }

    // расчёт адреса микропрограммы по её индексу и флагу переноса
    getAUC(index, l) {
        const auc = this.#sprog[this.getIndex(index)]
        return auc >= SProgram.ASPCond ? 2*auc - (l ? SProgram.ASPCond - 1 : SProgram.ASPCond) : auc 
    }

    // представление синхропрограммы в виде текстовой строки
    toStr() {
        var result = ""
        var stage
        for (stage = 0; stage < SProgram.stages; ++stage) {
            var phase
            for (phase = 0; phase < SProgram.phases; ++phase) {
                var idx = stage * SProgram.phases + phase
                if (idx != 0) result += '.'
                result += Hex.byteToStr(this.#sprog[idx])
            }
        }
        return result
    }
}

class SPrograms extends BitLine {
    // количество синхропрограмм в строке диодной матрицы
    static spPerLine = 4
    // общее количество синхропрограмм
    static num = 128
    // массив синхропрограмм
    #table

    // Расчёт смещения начала строки в диодной матрице по адресу синхропрограммы
    #getTableLineOffset(sp, phase) {
        // количество строк блока битов для одной фазы синхропрограммы
        const n = 5
        const lines = 1 << n
        const mask = (lines - 1)
        // направление нумерации строк для стадии (false - возростание, true - убывание)
        const inv = [false, true, true]
        // старшие биты адреса смещаются вправо: A7:A6 -> A1:A0 и инвертируется младший бит
        const lo = ((sp >> n) ^ 0x01) & 0x03
        // остальные биты переворачиваются A5:A0 -> A0:A5
        var line = (sp & mask)
        if (inv[phase]) line ^= mask
        line += phase * lines
        return SPrograms.spPerLine * SProgram.stages * SProgram.bits * line + lo
    }

    // расчёт смещений битов определяющих синхропрограмму
    #getSPOffsets(sp) {
        var offsets = []
        var i, ofs, n = 0
        var phase
        for (phase = 0; phase < SProgram.phases; ++phase) {
            for (i = 0, ofs = this.#getTableLineOffset(sp, phase); i < SProgram.stages * SProgram.bits; ++i, ofs += SPrograms.spPerLine) offsets[n++] = ofs
        }
        return offsets
    }

    constructor(lines) {
        if (lines.length != SPrograms.num * SProgram.size) {
            throw new Error("Wrong synchroprograms table size")
        }
        super(lines)
        this.#table = []
        var sp
        for (sp = 0; sp < SPrograms.num; ++sp) {
            this.#table[sp] = new SProgram(this.ofsToStr(this.#getSPOffsets(sp)))
        }
    }

    // получить синхропрограмму по её адресу
    getSP(asp) {
        return this.#table[asp]
    }
}

class UCommand extends BitLine {
    // количество бит микрокоманды
    static size = 28

    // массив микроприказов микрокоманды
    #bits
    // числовое представление микрокоманды
    #val
    constructor(line) {
        if (line.length != UCommand.size) {
            throw new Error("Wrong microcommand line size: " + line.length)
        }
        super(line)
        this.#bits = []
        this.#val = ""
        var i, mask
        for (i = 0, mask = 1; i < UCommand.size; ++i) {
            var bit = this.ofsToBool(i)
            this.#bits[i] = bit
            this.#val |= bit ? mask : 0
            mask <<= 1
        }
        // инверсия обратных микроприказов
        this.#val ^= 0xf0b9001
    }

    // обработка данных по активным микроприказам микрокоманды
    process(acc, mod) {
        var alpha = 0
        var betta = 0
        var gamma = false

        // обработка микроприказов операндов сумматора
        if (this.#bits[9])  gamma |= acc.L
        if (this.#bits[10]) gamma |= !acc.L
        if (this.#bits[11]) gamma |= !acc.T

        if (this.#bits[4]) betta |= 6
        if (this.#bits[5]) betta |= acc.S
        if (this.#bits[6]) betta |= acc.NS
        if (this.#bits[7]) betta |= acc.Q
        if (this.#bits[8]) betta |= 1

        if (this.#bits[1])  alpha |= acc.L ? 0 : 10
        if (this.#bits[2])  alpha |= 4
        if (this.#bits[3])  alpha |= acc.S
        if (this.#bits[18]) alpha |= acc.ST0
        if (this.#bits[20]) alpha |= acc.M
        if (this.#bits[21]) alpha |= acc.NR
        if (this.#bits[22]) alpha |= acc.R
        
        // выполнение суммирования
        var sum = alpha + betta + (gamma ? 1 : 0)
        // бит переноса сумматора
        const l = sum > 15
        // результат суммирования
        sum &= 0xf

        // обработка микроприказа регистра L
        if (!this.#bits[0]) acc.L = l

        // обработка микроприказов регистра R
        if (!mod) {
            if (this.#bits[12]) acc.R2 = sum
            if (this.#bits[14]) acc.R1 = sum
            var r = 0
            if (this.#bits[23] && this.#bits[24] && this.#bits[25]) r |= acc.R3
            else {
                if (!this.#bits[23]) r |= acc.R
                if (!this.#bits[24]) r |= sum
                if (!this.#bits[25]) r |= acc.S
            }
            acc.R = r
        }
        
        // обработка микроприказа регистра M
        if (!this.#bits[26]) acc.M = acc.S

        // обработка микроприказов регистра S
        var s = 0
        if (this.#bits[15] && this.#bits[16]) s |= acc.S
        else {
            if (!this.#bits[15]) s |= acc.Q
            if (!this.#bits[16]) s |= sum
        }
        acc.S = s

        // обработка микроприказа регистра Q
        if (!this.#bits[17]) acc.Q = sum

        // обработка микроприказов регистра стека ST
        if (!this.#bits[13]) { // выгрузка из стека (вращение)
            const t = acc.ST0
            acc.ST0 = acc.ST1
            acc.ST1 = acc.ST2
            acc.ST2 = t
        }
        if (!this.#bits[19]) { // загрузка в стек (PUSH)
            acc.ST2 = acc.ST1
            acc.ST1 = acc.ST0
            acc.ST0 = sum
        }
    }

    // флаг опроса внешнего входа
    get Mode() {
        return !this.#bits[27]
    }

    // представление микрокоманды в виде текстовой строки
    toStr() {
        return Hex.longToStr(this.#val, 7)
    }

}

class UCommands extends BitLine {
    // количество микрокоманд в таблице (количество строк)
    static num = 68

    // массив микрокоманд
    #table

    // Расчёт смещения начала строки в диодной матрице по адресу команды
    #getTableLineOffset(auc) {
        const lines = [
            67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
            50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 20, 21,
            22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 12, 13, 14,
            15, 16, 17, 18, 19,  8,  9, 10, 11,  0,  1,  2,  3,  4,  5,  6,  7
        ]
        return UCommand.size * lines[auc]
    }

    constructor(lines) {
        if (lines.length != UCommands.num * UCommand.size) {
            throw new Error("Wrong microcommans table size: " + lines.length)
        }
        super(lines)
        this.#table = []
        var auc
        for (auc = 0; auc < UCommands.num; ++auc) {
            const ofs = this.#getTableLineOffset(auc)
            const line = lines.substring(ofs, ofs + UCommand.size)
            this.#table[auc] = new UCommand(line)
        }
    }

    // получить микрокоманду по её адресу
    getUCommand(auc) {        
        return this.#table[auc]
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
            const ofs = (this.#enabled ? 0x0 : 0xf) | acc.R
            
            this.#display[acc.Stage] &= 0x80
            this.#display[acc.Stage] |= this.#table[ofs]
        }        
        if (acc.Phase == 2) {
            this.#display[acc.Stage] &= 0x7f 
            this.#display[acc.Stage] |= (this.#enabled && acc.L ? 0x80 : 0x00)
        }    
    }

    #getTableLineOffset(digit) {
        return (digit ^ 0xf) * Display.segments
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
        const segs = [4, 3, 1, 0, 2, 7, 6, 5]
        var i, res = []
        for (i = 0; i < segs.length; ++i) res[i] = segs[i] + ofs
        return res
    }
}

class Accumulator {
    // количество циклов для обработки команды
    static cycles = 42
    // индекс младшей тетрады счётчика команд
    static APCL = 36
    // индекс старшей тетрады счётчика команд
    static APCH = 39

    // номер микросхемы в кольце данных
    #num
    // текущий индекс цикла (от 0 до cycles-1)
    #index
    // массив тетрад реристра R (от 0 до cycles-1)
    #r
    // массив тетрад реристра M (от 0 до cycles-1)
    #m
    // массив тетрад реристра ST (от 0 до cycles-1)
    #st
    // регистр S (размер 4 бита или 1 тетрада)
    #s
    // регистр Q (размер 4 бита или 1 тетрада)
    #q
    // регистр L (размер 1 бит). Хранит состояния бита переноса 
    #l
    // регистр T (размер 1 бит). Устанавливается и сбрасывается при обработке команд опроса клавиатуры
    #t
    // регстр APC (размер 1 байт или 2 тетрады). Хранит адрес текущей команды
    #apc
    // код нажатой клавиши: биты 0-3 - номер цикла Дх, биты 4 и 7 - состояние входов К1 и К2 соответственно
    #key
    // массив состояний переключателей режимов
    #modes

    constructor(num) {
        this.#num = num
        this.reset()
    }

    reset() {
        this.#index = -1
        this.#r = []
        this.#m = []
        this.#st = []
        var i
        for (i = 0; i < Accumulator.cycles; ++i) {
            this.#r[i] = 0
            this.#m[i] = 0
            this.#st[i] = 0
        }
        this.#s = 0
        this.#q = 0
        this.#l = false
        this.#t = true

        this.#apc = 0
        this.#key = 0
        this.#modes = []
    }

    step() {
        this.#index += 1
        if (this.#index >= Accumulator.cycles) {
            this.#index = 0
            this.#apc = (this.#r[Accumulator.APCH] << 4) | this.#r[Accumulator.APCL] 
        }
        return this.#index
    }

    // обработка клавиатуры
    keypad(cmd) {
        // Номер текущего цикла Д
        var di = this.#index / SProgram.phases | 0
        // Номер цикла Д соответствующего нажатой клавише
        var dk = this.#key & 0xf
        // Состояние линий К1 и К2 (биты 0 и 1 соответственно)
        var k = di == dk ? (this.#key >> 4) & 0x9 : 0
        // состояние регистров T и Q изменяется только 
        // в консольных командах (поле APC команды < 4), а также
        // в первом цикле Д или активном сигнале на входах К
        if ((di == 0 || k != 0) && cmd.IsKeypad) {
            this.#t = k != 0
            this.#q = k
        }
        // на последнем цикле Д, если не установлен флаг Т происходит очистка регистра Q
        // этому коду нужно уделить больше внимания
        //if (di == Accumulator.cycles / SProgram.phases - 1 && !this.#t) {
        //    this.#q = 0
        //}
    }

    // обработка входа установки режима
    // возвращает значение для логического суммирования с регистром Q
    mode(ucmd) {
        var q = 0
        // если микроприказ опроса внешнего входа режима активен,
        // то состояние внешнего входа просто логически суммируется с регистром Q.
        // На внешний вход можно подать фиксированное напряжение и 
        // в любом цикле команды считать уровень напряжения на внешнем входе.
        // Так реализован переключатель Р-Г в калькуляторе Б3-32
        // Также на внешний вход можно подавать сигналы разрядов Д2-Д12 и
        // считывать уровень напряжения в определённых циклах. Это позволяет организовать
        // многопозиционный переключатель, как переключатель Р-ГРД-Г в калькуляторе МК-61.
        // Также можно подать через сумматор несколько сигналов Д2-Д12 и организовать 
        // одновременно несколько переключателей режимов как в калькуляторе МК-44 
        if (ucmd.Mode) {
            q = 0xf
            var inv = false
            // Номер текущего цикла Д
            const di = this.#index / SProgram.phases | 0
            var i
            for (i = 0; i < this.#modes.length; ++i) {
                const mode = this.#modes[i]
                const m = mode & 0xf
                inv |= ((mode >> 4) & 1) == 1
                q &= di == m ? 0x0 : 0xf
            }
            q ^= inv ? 0xf : 0x0
        }
        return q
    }

    #updateIndex(index) {
        while(index < 0) index += Accumulator.cycles
        while(index >= Accumulator.cycles) index -= Accumulator.cycles
        return index
    }
    #offsetIndex(offset) {
        return this.#updateIndex(this.#index + offset)
    }

    get Phase() { return this.#index % SProgram.phases }
    get Stage() { return this.#index / SProgram.phases | 0 }
    getR(index) {return this.#r[index] }
    get R() { return this.#r[this.#index] }
    get NR() { return ~this.#r[this.#index] & 0xf }
    set R(val) { this.#r[this.#index] = val & 0xf }
    set R1(val) { this.#r[this.#offsetIndex(-1)] = val & 0xf }
    set R2(val) { this.#r[this.#offsetIndex(-2)] = val & 0xf }
    get R3() { return this.#r[this.#offsetIndex(3)] }
    get PC() { return this.#apc }
    set PC(val) {
        this.#r[Accumulator.APCH + 1] = (val >> 4) & 0xf
        this.#r[Accumulator.APCL + 1] = val & 0xf
    }
    
    get ST0() { return this.#st[this.#index] }
    set ST0(val) { this.#st[this.#index] = val & 0xf }
    get ST1() { return this.#st[this.#offsetIndex(1)] }
    set ST1(val) { return this.#st[this.#offsetIndex(1)] = val & 0xf }
    get ST2() { return this.#st[this.#offsetIndex(2)] }
    set ST2(val) { return this.#st[this.#offsetIndex(2)] = val & 0xf }

    get M() { return this.#m[this.#index] }
    set M(val) { this.#m[this.#index] = val & 0xf }

    get D() { return this.#m }
    set D(val) { this.#m = val }

    get S() { return this.#s }
    get NS() { return ~this.#s & 0xf }
    set S(val) { this.#s = val & 0xf }

    get Q() { return this.#q }
    set Q(val) { this.#q = val & 0xf }

    get L() { return this.#l }
    set L(val) { this.#l = val }

    get T() { return this.#t }

    set Key(val) { this.#key = val }
    get Key() { return this.#key }

    set Modes(val) { this.#modes = val }
    get Modes() { return this.#modes }

    #regToStr(reg, name) {
        var i, phase
        var result = ''
        for (phase = 0; phase < SProgram.phases; ++phase) {
            result += (phase == 0 ? '' : ' ') + name + phase + ':'
            for(i = 0; i < Accumulator.cycles / SProgram.phases; ++i) {
                if (i == 2) result += ':'
                if (i == 5) result += '-'
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

    stToStr() {
        return this.#regToStr(this.#st, 'ST')
    }

    toStr() {
        var result = "I" + this.#num + ":"

        result += " PC:" + Hex.byteToStr(this.PC)
        result += " " + this.rToStr()
        result += " " + this.mToStr()
        result += " " + this.stToStr()

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

    // получить мнемонику микрокоманды
    #getMnemonic(auc, mod) {
        var str = this.#mnemonics[auc][mod?1:0]
        str = str.replaceAll("[-2]", this.#accumulator.toIndexStr(-2))
        str = str.replaceAll("[-1]", this.#accumulator.toIndexStr(-1))
        str = str.replaceAll("[+0]", this.#accumulator.toIndexStr(0))
        str = str.replaceAll("[+1]", this.#accumulator.toIndexStr(1))
        str = str.replaceAll("[+2]", this.#accumulator.toIndexStr(2))
        str = str.replaceAll("[+3]", this.#accumulator.toIndexStr(3))
        return str
    }

    // отключение трассировки при ожидании нажатия клавиши
    #skipLog(cmd, key) {
        // Если ожидается ввод с клавиатуры и не нажата никакая клавиша
        if (cmd.IsKeypad && key == 0)
            if (this.#skip > 0)
                this.#skip -= 1
            else
                this.#log.skip()
        else
           this.#skip = 7
    }

    // цикл обработки одной тетрады
    #stepE(key) {
        var res = true
        // индекс текущего цикла
        const index = this.#accumulator.step()
        // адрес текущей команды
        const apc = this.#accumulator.PC
        // текущая команда
        const cmd = this.#commands.getCommand(apc)
        // обработчик клавиатуры
        this.#accumulator.keypad(cmd)

        // в начале цикла определяем статус дисплея
        if (index == 0) this.#display.Enabled = cmd.IsKeypad

        // адрес текущей синхропрограммы
        const asp = cmd.getASP(index)
        // текущая синхропрограмма
        const sp = this.#sprograms.getSP(asp)
        // адрес текущей микрокоманды
        const auc = sp.getAUC(index, this.#accumulator.L)
        // текущая микрокоманда
        const ucmd = this.#ucommands.getUCommand(auc)
        // копирование данных из команды в регистр R для вычисления адреса перехода
        if (index == Command.ApcIndex && asp == Command.pcSP) this.#accumulator.PC = cmd.APC
        // обработка состояния внешнего входа
        const h = this.#accumulator.mode(ucmd)
        this.#accumulator.Q |= h
        // флаг модификации регистра R при выполнении микрокоманды
        const mod = cmd.MOD && index < Command.ApcIndex
        // собственно выполнение микрокоманды
        ucmd.process(this.#accumulator, mod)
        // подготовка данных для вывода на дисплей
        this.#display.update(this.#accumulator)

        // вывод отладочной информации в консоль браузера
        if (this.#log.enable) {
            // информация о текущей команде
            if (index == 0) {
                var line = "C" + this.#num + ": "
                line += Hex.byteToStr(this.#accumulator.PC)
                line += ":" + cmd.toStr()
                line += " # " + this.#comments[this.#accumulator.PC]
                this.#log.add(line)
            }
            // информация о текущей синхропрограмме
            if (index == Command.ManIndex || index == Command.ExpIndex || index == Command.ApcIndex) {
                var line = "S" + this.#num + ":    "
                line += Hex.byteToStr(cmd.getASP(index))
                line += ":" + sp.toStr()
                this.#log.add(line)
            }
            // информация о текущей микрокоманде
            var mnemonic = this.#getMnemonic(auc, mod)
            // трассировка только активных микрокоманд 
            if (mnemonic.length > 0) {
                var line = "U" + this.#num + ":       "
                // адрес микрокоманды
                line += auc >= 60 ? Hex.byteToStr(30 + (auc>>1)) + "." +  Hex.nibbleToStr(auc&1) : Hex.byteToStr(auc) + ".X"
                // двоичное значение микрокоманды
                line += ":" + ucmd.toStr() + "  "
                // индекс цикла команды
                line += Hex.nibbleToStr(index / 10 | 0)
                line += Hex.nibbleToStr(index % 10)
                // индекс регистров R, M, ST
                line += ">" + Hex.nibbleToStr(this.#accumulator.Phase)
                line += "." + Hex.nibbleToStr(this.#accumulator.Stage)
                // индекс синхропрограммы
                line += "(" + Hex.nibbleToStr(sp.getIndex(index)) + ")"
                // текущие значения регистров
                line += " S:" + Hex.nibbleToStr(this.#accumulator.S)
                line += " Q:" + Hex.nibbleToStr(this.#accumulator.Q)
                line += " L:" + Hex.nibbleToStr(this.#accumulator.L?1:0)
                line += " T:" + Hex.nibbleToStr(this.#accumulator.T?1:0)
                // мнемоника микрокоманды
                line += " # "
                // если текущая микрокоманда обрабатывает состояние внешнего входа
                line += h != 0 ? "Q|="+Hex.nibbleToStr(h)+"; " : ""
                // собственно мнемоника
                line += mnemonic
                this.#log.add(line)
            }
        }
    
        if (index == Accumulator.cycles-1) {
            this.#skipLog(cmd, key)
            res = false
        }
        return res
    }

    // получить данные дисплея
    get Display() {
        return this.#display.Data
    }

    // вывод данных в кольцо (расширение регистра M)
    get D() {
        return this.#accumulator.D
    }
    // ввод данных из кольца (расширение регистра M)
    set D(data) {
        this.#accumulator.D = data
    }

    // отладочная информация ядра регистров микроконтроллера
    mToStr() {
        return this.#accumulator.mToStr()
    }

    // цикл выполнения команды микроконтроллера
    step(key, modes) {
        // установка состояния клавиатуры
        this.#accumulator.Key = key
        // установка состояния внешнего входа
        this.#accumulator.Modes = modes
        // вывод отладочной информации
        if (this.#log.enable) {
            const text = 
                "H" + this.#num + ": " + this.#name + ", " +
                "cycle: " + ++this.#count + ", " +
                "key: " + Hex.byteToStr(key) + ", " +
                "modes: " + modes.map(m => Hex.byteToStr(m)).join(", ")
            this.#log.add(text)
        }
        // собственно выполнение команды микроконтроллера
        while(this.#stepE(key)) { }
        // вывод отладочной информации
        if (this.#log.enable) {
            this.#log.add(this.#accumulator.toStr())
        }
    }

    // вывод таблиц в консоль браузера
    list() {
        var i
        for (i = 0; i < Commands.num; ++i)
            console.log(Hex.byteToStr(i) + ": " + this.#commands.getCommand(i).toStr())
        for (i = 0; i < SPrograms.num; ++i)
            console.log(Hex.byteToStr(i) + ": " + this.#sprograms.getSP(i).toStr())
        for (i = 0; i < UCommands.num; ++i)
            console.log(Hex.byteToStr(i) + ": " + this.#ucommands.getUCommand(i).toStr())
    }
}
