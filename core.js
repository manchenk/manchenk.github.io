/*
 * Copyright (c) 2023 Dmitry Romanchenko.
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

class Hex {
    static hex = "0123456789ABCDEF";

    static byteToStr(val) {
        return Hex.hex[(val >> 4) & 0xf] + Hex.hex[val & 0xf];
    }
    static nibbleToStr(val) {
        return Hex.hex[val & 0xf];
    }
}

class BitLine {
    static oneChar = '+';
    static zeroChar = '-';
    line = "";
    inv = false;

    constructor(line, inv = false) {
        this.line = line;
        this.inv = inv;
    }

    ofsToBool(ofs) {
        var zeroChar = this.inv ? BitLine.oneChar : BitLine.zeroChar;
        return this.line[ofs] != zeroChar;
    }

    ofsToInt(ofs) {
        var i = 0;
        var result = 0;
        var zeroChar = this.inv ? BitLine.oneChar : BitLine.zeroChar;
        for (i = 0; i < ofs.length; ++i) {
            result <<= 1;
            if (ofs[i] < this.line.length) {
                result |= this.line[ofs[i]] != zeroChar ? 1 : 0;
            }
        }
        return result;
    }

    ofsToStr(ofs) {
        var i = 0;
        var result = "";
        for (i = 0; i < ofs.length; ++i) {
            if (ofs[i] < this.line.length) {
                result += this.line[ofs[i]];
            }
        }
        return result;
    }
}


class Command extends BitLine {
    static size = 19;
    #asp = 0;
    #mod = false;
    #com = 0;
    #cus = 0;
    #ap = 0;
    constructor(line) {
        if (line.length != Command.size) {
            throw new Error("Wrong command line size: " + line.length);
        }
        super(line, true);
        this.#asp = this.ofsToInt([0, 1, 2, 3, 4]);
        this.#mod = this.ofsToInt([5]) != 0;
        this.#com = this.ofsToInt([8, 7, 6]);
        this.#cus = this.ofsToInt([11, 10, 9]);
        this.#ap  = this.ofsToInt([18, 17, 16, 15, 14, 13, 12]);
    }

    get ASP() {
        return this.#asp;
    }

    get MOD() {
        return this.#mod;
    }

    get COM() {
        return this.#com;
    }

    get CUS() {
        return this.#cus;
    }

    get AP() {
        return this.#ap;
    }

    toStr() {
        var result = "";
        result += Hex.byteToStr(this.ASP);
        result += '.';
        result += this.MOD ? '1' : '0';
        result += '.';
        result += Hex.nibbleToStr(this.COM);
        result += '.';
        result += Hex.nibbleToStr(this.CUS);
        result += '.';
        result += Hex.byteToStr(this.AP);
        return result;
    }
}

class Commands extends BitLine {
    static num = 128;
    static cmdPerLine = 2;
    table = [];

    constructor(lines) {
        if (lines.length != Command.size * Commands.num) {
            throw new Error("Wrong commands table size");
        }
        super(lines, true);
        var cmd = 0;
        for (cmd = 0; cmd < Commands.num; ++cmd) {
            var line = this.ofsToStr(this.#getCommandOffsets(cmd));
            this.table[cmd] = new Command(line);
        }
    }

    // Расчёт смещения начала строки в диодной матрице по адресу команды
    #getTableLineOffset(cmd) {
        return Commands.cmdPerLine * Command.size * ((cmd & 0x20) != 0 ? cmd & 0x1f : ((cmd & 0x1f) ^ 0x1f) | 0x20);
    }

    #getCommandOffsets(cmd) {
        var offsets = [];
        var i = 0;
        var ofs = this.#getTableLineOffset(cmd) + ((cmd & 0x40) != 0 ? 1 : 0);
        for (i = 0; i < Command.size; ++i) {
            offsets[i] = ofs;
            ofs += Commands.cmdPerLine;
        }
        return offsets;
    }

    getCommand(acmd) {
        return this.table[acmd];
    }
}

class SProgram extends BitLine {
    static size = 30;
    static num = 6;
    static phases = 3;
    static bits = 5;
    static progOffsets = [4, 0, 2, 5, 1, 3];

    #sprog = [];

    constructor(line) {
        if (line.length != SProgram.phases * SProgram.size) {
            throw new Error("Wrong synchroprogram line size: " + line.length);
        }
        super(line);
        var prog;
        for (prog = 0; prog < SProgram.num; ++prog) {
            var phase;
            for (phase = 0; phase < SProgram.phases; ++phase) {
                var offs = [];
                var bit;
                for (bit = 0; bit < SProgram.bits; ++bit) {
                    var ofs = SProgram.progOffsets[prog];
                    if (bit == 0)
                        ofs = SProgram.num - 1 - ofs;
                    offs[bit] = ofs + SProgram.num * bit + SProgram.size * phase;
                }
                this.#sprog[SProgram.phases * prog + phase] = this.ofsToInt(offs);
            }
        }
    }

    getAUC(cycle, com) {
        const indexes = [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ 3,  4,  4,  4,  4,  4,  4,  4,  5, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1,  3,  4,  5],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  1,  2],
            [ 0,  1,  1,  1,  1,  1,  1,  1,  2, -1, -1, -1],
            [ 3,  4,  4,  4,  4,  4,  4,  4,  5,  0,  1,  2],
            [ 0,  1,  1,  1,  1,  1,  1,  1,  2,  3,  4,  5]
        ];
        var stage = Math.trunc(cycle / SProgram.phases);
        var phase = cycle % SProgram.phases;
        var index = indexes[com][stage];
        if (index < 0) 
            return -1;
        else 
            return this.#sprog[SProgram.phases * index + phase];
    }

    toStr(com) {
        var result = "";
        var prog;
        for (prog = 0; prog < SProgram.num; ++prog) {
            var phase;
            for (phase = 0; phase < SProgram.phases; ++phase) {
                var idx = prog * SProgram.phases + phase;
                if (idx != 0)
                    result += '.';
                var auc = this.getAUC(prog > 1 ? idx + (8 - 2) * SProgram.phases : idx, com);
                if (auc < 0)
                    result += "--";
                else
                    result += Hex.byteToStr(auc);
            }
        }
        return result;
    }
}

class SPrograms extends BitLine {
    static num = 32;
    #table = [];

    constructor(lines) {
        if (lines.length != SPrograms.num * SProgram.phases * SProgram.size) {
            throw new Error("Wrong synchroprograms table size");
        }
        super(lines);
        var sp;
        for (sp = 0; sp < SPrograms.num; ++sp) {
            var line = "";
            var phase;
            for (phase = 0; phase < SProgram.phases; ++phase) {
                var beg = this.#getTableLineOffset(sp, phase);
                line += lines.substring(beg, beg + SProgram.size);
            }
            this.#table[sp] = new SProgram(line);
        }
    }

    // Расчёт смещения начала строки в диодной матрице по адресу синхропрограммы
    #getTableLineOffset(sp, phase) {
        return SProgram.size * (SPrograms.num * (SProgram.phases - 1 - phase) + ((sp ^ 0x1e) ^ (phase != 2 ? 0x1f : 0x00)));
    }

    getSP(asp) {
        return this.#table[asp];
    }
}


class Accumulator {
    static cycles = 36;

    #index = 0;
    #r = [];
    #m = [];
    #s = 0;
    #l = false;
    #t = false;
    #apc = 0;
    #rv = 0;
    #k1 = false;
    #k2 = false;
    #key = 0;

    constructor() {
        this.#index = -1;
        var i;
        for (i = 0; i < Accumulator.cycles; ++i) {
            this.#r[i] = 0;
            this.#m[i] = 0;
        }
        this.#s = 0;
        this.#l = false;
        this.#t = false;

        this.#apc = 0x00;
        this.#rv = 0;
        this.#k1 = false;
        this.#k2 = false;
        this.#key = 0;
    }

    step() {
        this.#index += 1;
        if (this.#index >= Accumulator.cycles) {
            this.#index = 0;
        }
        return this.#index;
    }

    keypad(index, cmd) {
        if (index == 0) {
            this.#t = (cmd.CUS & 3) != 0;
            this.#k1 = false;
            this.#k2 = false;
        }

        if (this.#key != 0) {
            var code = this.#key & 0xf;
            if (code * SProgram.phases == this.#index) {
                var k = (this.#key >> 4) & 3;
                if (k > 0) {
                    if ((cmd.CUS & 3) == 0) {
                        this.#t = true;
                        this.#k1 = (k & 1) != 0;
                        this.#k2 = (k & 2) != 0;
                    }
                }
            }
        }
    }


    getR(index) {
        return this.#r[index];
    }
    get R() {
        return this.#r[this.#index];
    }
    set R(val) {
        this.#r[this.#index] = val & 0xf;
    }
    set R1(val) {
        var index = this.#index - 1;
        if (index < 0)
            index += Accumulator.cycles;
        this.#r[index] = val & 0xf;
    }
    get R33() {
        var index = this.#index + 3;
        if (index >= Accumulator.cycles)
            index -= Accumulator.cycles;
        return this.#r[index];
    }
    get R11() {
        return this.#r[30];
    }

    get M() {
        return this.#m[this.#index];
    }
    set M(val) {
        this.#m[this.#index] = val & 0xf;
    }

    get S() {
        return this.#s;
    }
    set S(val) {
        this.#s = val & 0xf;
    }

    get L() {
        return this.#l;
    }
    set L(val) {
        this.#l = val;
    }

    get T() {
        return this.#t;
    }

    get APC() {
        return this.#apc;
    }
    set APC(val) {
        this.#apc = val & 0x7f;
    }

    get RV() {
        return this.#rv;
    }
    set RV(val) {
        this.#rv = val & 0x7f;
    }

    get K1() {
        return this.#k1;
    }

    get K2() {
        return this.#k2;
    }

    set Key(val) {
        this.#key = val;
    }

    #shift(val) {
        return (val >> 1) | ((val & 2) == 0 ? 0x40 : 0x00)
    }

    calcAPC(cmd) {
        switch(cmd.CUS) {
            case 0: {
                if (this.T) {
                    this.RV = cmd.AP | (this.K1 ? 0x20 : 0) | (this.K2 ? 0x40 : 0);
                    this.APC = cmd.AP;
                }
                break;
            }
            case 1: {
                if (this.L)
                    this.APC = this.#shift(this.APC);
                else
                    this.APC = cmd.AP;
                break;
            }
            case 2: {
                if (this.L)
                    this.APC = cmd.AP;
                else
                    this.APC = this.#shift(this.APC);
                break;
            }
            case 3: {
                this.APC = cmd.AP;
                break;
            }
            case 4: {
                this.APC = cmd.AP | this.RV | (this.K1 ? 0x20 : 0) | (this.K2 ? 0x40 : 0);
                break;
            }
            case 5: {
                this.APC = cmd.AP | this.RV;
                break;
            }
            case 6: {
                this.RV = cmd.AP;
                this.APC = cmd.AP;
                break;
            }
            case 7: {
                this.APC = cmd.AP;
                this.RV = (this.RV & 0x70) | this.R11;
                break;
            }
        }
    }

    toStr() {
        var result = "";
        var i;

        result += "PC:" + Hex.byteToStr(this.#apc);
        result += ", RV:" + Hex.byteToStr(this.#rv);
        result += ", R0:";
        for(i = 0; i < Accumulator.cycles / SProgram.phases; ++i) {
            if (i == 3) 
                result += '-';
            result += Hex.nibbleToStr(this.#r[Accumulator.cycles - SProgram.phases * (i+1)]);
        }
        result += ", R1:";
        for(i = 0; i < Accumulator.cycles / SProgram.phases; ++i) {
            if (i == 3) 
                result += '-';
            result += Hex.nibbleToStr(this.#r[Accumulator.cycles - SProgram.phases * (i+1) + 1]);
        }
        result += ", R2:";
        for(i = 0; i < Accumulator.cycles / SProgram.phases; ++i) {
            if (i == 3) 
                result += '-';
            result += Hex.nibbleToStr(this.#r[Accumulator.cycles - SProgram.phases * (i+1) + 2]);
        }
        result += ", M0:"
        for(i = 0; i < Accumulator.cycles / SProgram.phases; ++i) {
            if (i == 3) 
                result += '-';
            result += Hex.nibbleToStr(this.#m[Accumulator.cycles - SProgram.phases * (i+1)]);
        }
        result += ", M1:";
        for(i = 0; i < Accumulator.cycles / SProgram.phases; ++i) {
            if (i == 3) 
                result += '-';
            result += Hex.nibbleToStr(this.#m[Accumulator.cycles - SProgram.phases * (i+1) + 1]);
        }
        result += ", M2:";
        for(i = 0; i < Accumulator.cycles / SProgram.phases; ++i) {
            if (i == 3) 
                result += '-';
            result += Hex.nibbleToStr(this.#m[Accumulator.cycles - SProgram.phases * (i+1) + 2]);
        }
        return result;
    }

    toIndexStr(ofs) {
        var result = "";
        var index = this.#index + ofs;
        while (index < 0)
            index += Accumulator.cycles;
        while (index >= Accumulator.cycles)
            index -= Accumulator.cycles;

        result += index % SProgram.phases;
        result += "." + Math.trunc(index / SProgram.phases);

        return result;
    }
}


class UCommand extends BitLine {
    static size = 18;

    constructor(line) {
        if (line.length != UCommand.size) {
            throw new Error("Wrong microcommand line size: " + line.length);
        }
        super(line);
    }

    process(acc, mod) {
        var alpha = 0;
        var betta = 0;
        var gamma = false;

        if (this.ofsToBool(2))
            gamma |= !acc.T;
        if (this.ofsToBool(3))
            gamma |= acc.L;
        if (this.ofsToBool(4))
            gamma = true;

        if (this.ofsToBool(5))
            betta |= acc.R;
        if (this.ofsToBool(6))
            betta |= 6;
        if (this.ofsToBool(7))
            betta |= (~acc.S) & 0xf;
        if (this.ofsToBool(8))
            betta |= acc.S;

        if (this.ofsToBool(9))
            alpha |= acc.L ? 0 : 10;
        if (this.ofsToBool(10))
            alpha |= acc.M;
        if (this.ofsToBool(11))
            alpha |= acc.R;
        if (this.ofsToBool(12))
            alpha |= (~acc.R) & 0xf;

        var sum = alpha + betta + (gamma ? 1 : 0);

        if (!this.ofsToBool(0))
            acc.L = sum > 0xf;

        var r = 0;
        if (!this.ofsToBool(15) || mod)
            r |= acc.R;
        if (!mod) {
            if (this.ofsToBool(1))
                acc.R1 = sum & 0xf;
            if (!this.ofsToBool(16))
                r |= acc.S;
            if (!this.ofsToBool(17))
                r |= acc.R33;
        }
        acc.R = r;

        if (!this.ofsToBool(13))
            acc.M = acc.S;
        if (!this.ofsToBool(14))
            acc.S = sum & 0xf;
    }
}

class UCommands extends BitLine {
    static num = 32;

    #table = [];

    constructor(lines) {
        if (lines.length != UCommands.num * UCommand.size) {
            throw new Error("Wrong microcommans table size: " + lines.length);
        }
        super(lines);

        var auc;
        for (auc = 0; auc < UCommands.num; ++auc) {
            var line = lines.substring(UCommand.size * auc, UCommand.size * (auc + 1));
            this.#table[auc] = new UCommand(line);
        }
    }

    getUCommand(auc) {
        return this.#table[auc];
    }
}

class Log {
    #list = [];
    #skip = false;

    constructor() {
        this.#list = [];
    }

    skip() {
        this.#skip = true;
    }

    add(line) {
        this.#list.push(line);
    }

    output() {
        if (!this.#skip) {
            this.#list.forEach(function(item) {
                console.log(item);
            });
        }
        this.#list = [];
        this.#skip = false;
    }
}


class Core {
    #commands = null;
    #sprograms = null;
    #ucommands = null;
    #accumulator = null;
    #mnemonics = [];
    #log = null;
    #count = 0;
    #displayEnable = false;

    constructor(commands, sprogs, ucmds, mnemonics) {
        this.#commands = new Commands(commands);
        this.#sprograms = new SPrograms(sprogs);
        this.#ucommands = new UCommands(ucmds);
        this.#accumulator = new Accumulator();
        this.#mnemonics = mnemonics;
        this.#log = new Log();
        this.#count = 0;
        this.#displayEnable = false;
    }

    #getMnemonic(auc, mod) {
        var str = this.#mnemonics[auc][mod];
        str = str.replace("R00", "R"+this.#accumulator.toIndexStr(0));
        str = str.replace("R00", "R"+this.#accumulator.toIndexStr(0));
        str = str.replace("R33", "R"+this.#accumulator.toIndexStr(3));
        str = str.replace("R-1", "R"+this.#accumulator.toIndexStr(-1));
        str = str.replace("M00", "M"+this.#accumulator.toIndexStr(0));
        str = str.replace("M00", "M"+this.#accumulator.toIndexStr(0));
        return str;
    }

    #stepE() {
        var res = true;
        var index = this.#accumulator.step();
        var cmd = this.#commands.getCommand(this.#accumulator.APC);
        var sp = this.#sprograms.getSP(cmd.ASP);
        if (index == 0) {
            var line = "";
            line += Hex.byteToStr(this.#accumulator.APC);
            line += ":" + cmd.toStr();
            this.#log.add(line);
            line = "  ";
            line += Hex.byteToStr(cmd.ASP);
            line += ":" + sp.toStr(7);
            line += " > " + Hex.nibbleToStr(cmd.COM);
            line += ":" + sp.toStr(cmd.COM);
            this.#log.add(line);
        }
        var auc = sp.getAUC(index, cmd.COM);
        this.#accumulator.keypad(index, cmd);
        if (auc > 0) {
            var ucmd = this.#ucommands.getUCommand(auc);
            ucmd.process(this.#accumulator, cmd.MOD);

            var line = "    ";
            line += Hex.nibbleToStr(Math.trunc(index / 10));
            line += Hex.nibbleToStr(index % 10);
            line += ":" + Hex.nibbleToStr(index % SProgram.phases);
            line += "." + Hex.nibbleToStr(Math.trunc(index / SProgram.phases));

            line += "> S:" + Hex.nibbleToStr(this.#accumulator.S);
            line += " L:" + Hex.nibbleToStr(this.#accumulator.L?1:0);
            line += " T:" + Hex.nibbleToStr(this.#accumulator.T?1:0);
            line += " K1:" + Hex.nibbleToStr(this.#accumulator.K1?1:0);
            line += " K2:" + Hex.nibbleToStr(this.#accumulator.K2?1:0);

            line += " > " + Hex.byteToStr(auc);

            line += " # " + this.#getMnemonic(auc, cmd.MOD?1:0);
            this.#log.add(line);
        }

        this.#displayEnable = cmd.MOD;

        if (index == Accumulator.cycles-1) {
            this.#accumulator.calcAPC(cmd);
            if (cmd.CUS == 0 && !this.#accumulator.T)
                this.#log.skip();
            res = false;
        }
        return res;
    }

    getDisplay() {
        var i;
        var display = [];
        for (i = 0; i < 9; ++i) {
            if (this.#displayEnable) {
                var val = this.#accumulator.getR(Accumulator.cycles - SProgram.phases * (i + 4));
                display[i] = val == 0xb ? { nibble: new Nibble(15), comma: true } : { nibble: new Nibble(val), comma: false };
            }
            else {
                display[i] = { nibble: new Nibble(15), comma: false };
            }
        }
        return display;
    }

    step(key) {
        this.#accumulator.Key = key;
        while(this.#stepE()) { }
        this.#log.add(this.#accumulator.toStr());
        this.#log.add(++this.#count + " ----------------------------------------------------");
        this.#log.output();
    }

    list() {
        var i;
        for (i = 0; i < Commands.num; ++i)
            console.log(Hex.byteToStr(i) + ": " + this.#commands.getCommand(i).toStr());
        for (i = 0; i < SPrograms.num; ++i)
            console.log(Hex.byteToStr(i) + ": " + this.#sprograms.getSP(i).toStr(7));
    }


}
