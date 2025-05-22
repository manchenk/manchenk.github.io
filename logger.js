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

class Logger {
    #list = []
    #skip = false
    #enable = false

    constructor() {
        this.#list = []
    }

    skip() {
        this.#skip = true
    }

    add(line) {
        this.#list.push(line)
    }

    get enable() {
        return this.#enable
    }
    set enable(val) {
        this.#enable = val
    }

    static #fmt(str, right) {
        var len = str.length
        var sp = ""
        if (len < right) {
            for (var i = len; i < right; ++i) 
                sp = sp + " "
        }
        return str + sp
    }

    output() {
        if (!this.#skip) {
            this.#list.forEach(function(item) {
                var line = Logger.#fmt(item, 1)
                console.log(line)
            })
        }
        this.#list = []
        this.#skip = false
    }
}
