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

class Hex {
    static hex = "0123456789ABCDEF"

    static longToStr(val, n = 0) {
        var result = ''
        while (true) {
            result = Hex.nibbleToStr(val) + result
            val >>= 4
            n -= 1
            if (val == 0) {
                if (n < 0) break;                
            }
        }
        return result
    }

    static byteToStr(val) {
        return Hex.hex[(val >> 4) & 0xf] + Hex.hex[val & 0xf]
    }
    static nibbleToStr(val) {
        return Hex.hex[val & 0xf]
    }
}

class BitLine {
    static oneChar = '+'
    static zeroChar = '-'
    line = ""
    inv = false

    constructor(line, inv = false) {
        this.line = line
        this.inv = inv
    }

    ofsToBool(ofs) {
        var zeroChar = this.inv ? BitLine.oneChar : BitLine.zeroChar
        return this.line[ofs] != zeroChar
    }

    ofsToInt(ofs) {
        var i = 0
        var result = 0
        var bit = 1
        const zeroChar = this.inv ? BitLine.oneChar : BitLine.zeroChar
        for (i = 0; i < ofs.length; ++i) {
            if (ofs[i] < this.line.length) {
                result |= this.line[ofs[i]] != zeroChar ? bit : 0
            }
            bit <<= 1
        }
        return result
    }

    ofsToStr(ofs) {
        var i = 0
        var result = ""
        for (i = 0; i < ofs.length; ++i) {
            if (ofs[i] < this.line.length) {
                result += this.line[ofs[i]]
            }
        }
        return result
    }
}

class SerialMemory {
    #size
    #step
    #data
    constructor(size, step) {
        this.#size = size
        this.#step = step
        this.#data = new Array(size)
        this.reset()
    }

    reset() {
        this.#data.fill(0)
    }

    step() {
        var p0 = this.#data.slice(0, this.#step)
        var p1 = this.#data.slice(this.#step, this.#size)
        this.#data = p1.concat(p0)
    }

    get D() { 
        return this.#data.slice(0, this.#step)
    }

    set D(val) { 
        var p1 = this.#data.slice(this.#step, this.#size)
        this.#data = val.concat(p1)
    }

}

class SVGPoint {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class SVGSize {
    constructor(w, h) {
        this.width = w
        this.height = h
    }
}

