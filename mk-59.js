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

const svgNS = 'http://www.w3.org/2000/svg'

const buttons = [
    { origin: new SVGPoint(105, 325), size: new SVGSize(50,100), name: ["Р","Ф","Е"], key: 0x39, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(105, 425), size: new SVGSize(50,100), name: ["Р","Е","Ж"], key: 0x38, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(155, 325), size: new SVGSize(50, 50), name: ["СП"],  key: 0x31, sColor: "#0000c0", bColor: "#2020ff", fColor: "#ffffff" },
    { origin: new SVGPoint(155, 375), size: new SVGSize(50, 50), name: ["П￫X"], key: 0x30, sColor: "#0000c0", bColor: "#2020ff", fColor: "#ffffff" },
    { origin: new SVGPoint(155, 425), size: new SVGSize(50, 50), name: ["П−"],  key: 0x33, sColor: "#0000c0", bColor: "#2020ff", fColor: "#ffffff" },
    { origin: new SVGPoint(155, 475), size: new SVGSize(50, 50), name: ["П+"],  key: 0x32, sColor: "#0000c0", bColor: "#2020ff", fColor: "#ffffff" },

    { origin: new SVGPoint(225, 325), size: new SVGSize(50, 50), name: ["7"], key: 0x17, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(275, 325), size: new SVGSize(50, 50), name: ["8"], key: 0x18, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(325, 325), size: new SVGSize(50, 50), name: ["9"], key: 0x19, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(225, 375), size: new SVGSize(50, 50), name: ["4"], key: 0x14, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(275, 375), size: new SVGSize(50, 50), name: ["5"], key: 0x15, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(325, 375), size: new SVGSize(50, 50), name: ["6"], key: 0x16, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(225, 425), size: new SVGSize(50, 50), name: ["1"], key: 0x11, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(275, 425), size: new SVGSize(50, 50), name: ["2"], key: 0x12, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(325, 425), size: new SVGSize(50, 50), name: ["3"], key: 0x13, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(225, 475), size: new SVGSize(100,50), name: ["0"], key: 0x10, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(325, 475), size: new SVGSize(50, 50), name: [","], key: 0x1B, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },

    { origin: new SVGPoint(395, 325), size: new SVGSize(50, 50), name: ["СХ"],  key: 0x2A, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(445, 325), size: new SVGSize(50, 50), name: ["С"],   key: 0x2B, sColor: "#c00000", bColor: "#ff2020", fColor: "#ffffff" },
    { origin: new SVGPoint(495, 325), size: new SVGSize(50, 50), name: ["↔"],   key: 0x37, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(395, 375), size: new SVGSize(50, 50), name: ["−"],   key: 0x23, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(445, 375), size: new SVGSize(50, 50), name: ["÷"],   key: 0x21, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(495, 375), size: new SVGSize(50, 50), name: ["/−/"], key: 0x1A, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(395, 425), size: new SVGSize(50, 50), name: ["+"],   key: 0x22, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(445, 425), size: new SVGSize(50, 50), name: ["x"],   key: 0x20, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(495, 425), size: new SVGSize(50, 50), name: ["%"],   key: 0x27, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(395, 475), size: new SVGSize(100,50), name: ["="],   key: 0x24, sColor: "#202020", bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(495, 475), size: new SVGSize(50, 50), name: ["∑+"],  key: 0x25, sColor: "#0000c0", bColor: "#2020ff", fColor: "#ffffff" },

]

const labels = [
    { origin: new SVGPoint( 66,  66), text: "ЭЛЕКТРОНИКА", size: 18, color: "#ffffff", font: "Arial Narrow" },
    { origin: new SVGPoint( 70,  95), text: "MK-59", size: 32, color: "#ffffff", font: "Arial" },
    { origin: new SVGPoint(497,  263), text: "1", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(477,  263), text: "2", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(457,  263), text: "3", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(437,  263), text: "4", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(417,  263), text: "5", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(397,  263), text: "6", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(377,  263), text: "7", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(357,  263), text: "8", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(337,  263), text: "9", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(312,  263), text: "10", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(292,  263), text: "11", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(272,  263), text: "12", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(252,  263), text: "13", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(232,  263), text: "14", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(212,  263), text: "15", size: 12, color: "#808080", font: "Arial" },
    { origin: new SVGPoint(192,  263), text: "16", size: 12, color: "#808080", font: "Arial" },
]

class SVGDigit {
    static dx = 10
    static dy = 12
    static sq = -2
    static pt = 3
    static digSegs = [
        { element: 'line',   no: 0, beg: new SVGPoint(0, 0), end: new SVGPoint(SVGDigit.dx, 0) },
        { element: 'line',   no: 1, beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(0, 0) },
        { element: 'line',   no: 2, beg: new SVGPoint(SVGDigit.dx, 0), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { element: 'line',   no: 3, beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { element: 'line',   no: 4, beg: new SVGPoint(2*SVGDigit.sq, 2*SVGDigit.dy), end: new SVGPoint(SVGDigit.sq, SVGDigit.dy) },
        { element: 'line',   no: 5, beg: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+2*SVGDigit.sq, 2*SVGDigit.dy) },
        { element: 'line',   no: 6, beg: new SVGPoint(SVGDigit.dx+2*SVGDigit.sq, 2*SVGDigit.dy), end: new SVGPoint(2*SVGDigit.sq,2*SVGDigit.dy) },
        { element: 'circle', no: 7, pos: new SVGPoint(SVGDigit.dx/2+1.5*SVGDigit.sq, 1.6*SVGDigit.dy), r: 0.8 }
    ]
    static digSigs = [
        { element: 'circle', no: 0, pos: new SVGPoint(SVGDigit.dx/2, SVGDigit.dy/3), r: 3 },
        { element: 'line',   no: 3, beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { element: 'circle', no: 7, pos: new SVGPoint(SVGDigit.dx/2+1.5*SVGDigit.sq, 1.6*SVGDigit.dy), r: 2 }
    ]
    #prev_data = 0x100
    constructor(doc, point, isSig) {
        this.point = point
        this.segments = []
        var segs = []
        if (isSig) segs = SVGDigit.digSigs
        else segs = SVGDigit.digSegs
        var i
        for (i = 0; i < segs.length; ++i) {
            var segment = doc.createElementNS(svgNS, segs[i].element)
            if (segs[i].element == 'line') {
                segment.setAttribute("x1", this.point.x + segs[i].beg.x)
                segment.setAttribute("y1", this.point.y + segs[i].beg.y)
                segment.setAttribute("x2", this.point.x + segs[i].end.x)
                segment.setAttribute("y2", this.point.y + segs[i].end.y)
            }
            if (segs[i].element == 'circle') {
                segment.setAttribute("cx", this.point.x + segs[i].pos.x)
                segment.setAttribute("cy", this.point.y + segs[i].pos.y)
                segment.setAttribute("r", segs[i].r)
            }
            this.segments[i] = {segment: segment, no: segs[i].no}
        }
    }
    insertAt(parent) {
        var i
        for (i = 0; i < this.segments.length; ++i) {
            parent.appendChild(this.segments[i].segment)
        }
    }
    setValue(data) {
        if (data != this.#prev_data) {
            this.#prev_data = data
            var i
            for (i = 0; i < this.segments.length; ++i) {
                let segment = this.segments[i]
                if (data & (1 << segment.no))
                    segment.segment.setAttribute("style", "fill:#73FBDE;stroke:#73FBDE;stroke-width:2")
                else 
                    segment.segment.setAttribute("style", "fill:#3c3c3c;stroke:#3c3c3c;stroke-width:2")
            }
        }
    }
}


class SVGDisplay {
    static size = 18
    constructor(doc) {
        this.disp = doc.createElementNS(svgNS, "g")
        var rect = doc.createElementNS(svgNS, "rect")
        rect.setAttribute("x", 100)
        rect.setAttribute("y", 210)
        rect.setAttribute("width",  420)
        rect.setAttribute("height", 60)
        rect.setAttribute("fill", "rgb(20,30,25)")
        this.disp.appendChild(rect)
        this.ranks = []
        var i
        for (i = 0; i < SVGDisplay.size; ++i) {
            var pos = i > 0 ? i + 2 : i
            var rank = new SVGDigit(doc, new SVGPoint(120 + 20*pos, 220), i == 1)
            rank.insertAt(this.disp)
            this.ranks[i] = rank
        }
    }
    setValues(data) {
        //             0     1     2     3     4     5     6     7     8     9    10    11    12    13    14    15    16    17
        //           FIX   SGN    16    15    14    13    12    11    10    09    08    07    06    05    04    03    02    01
        //            --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    -- 
        //           |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
        //            --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    -- 
        //           |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
        //            --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    --    -- 
        //         0R0.11 1R0.8 1R0.7 1R0.6 1R0.5 1R0.4 1R0.3 1R0.2 1R0.1 1R0.0 0R0.7 0R0.6 0R0.5 0R0.4 0R0.3 0R0.2 0R0.1 0R0.0
        const pos = [[17, 16, 15, 14, 13, 12, 11, 10, -1, -1, -1,  0], [9,  8,  7,  6,  5,  4,  3,  2,  1,  1, -1, -1]]
        let sym = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let i, j        
        for (j = 0; j < 2; ++j) {
            for (i = 0; i < data[j].length; ++i) {
                sym[pos[j][i]] |= data[j][i]
            }
        }
        for (i = 0; i < sym.length; ++i) {
            this.ranks[i].setValue(sym[i])
        }
    }
    insertAt(parent) {
        parent.appendChild(this.disp)
    }
}

class SVGLabel {
    constructor(doc, label) {
        this.label = label
        this.txt = doc.createElementNS(svgNS, "text")
        this.txt.setAttribute("x", this.label.origin.x)
        this.txt.setAttribute("y", this.label.origin.y)
        this.txt.setAttribute("fill", this.label.color)
        this.txt.setAttribute("font-family", this.label.font)
        this.txt.setAttribute("font-weight", "regular")
        this.txt.setAttribute("font-size", this.label.size)
        this.txt.setAttribute("pointer-events", "none")
        this.txt.appendChild(doc.createTextNode(this.label.text))
    }
    insertAt(parent) {
        parent.appendChild(this.txt)
    }
}

class SVGButton {
    #button
    constructor(doc, button) {
        this.#button = button
        const r = 5

        this.svg = doc.createElementNS(svgNS, 'g')
        this.svg.setAttribute("cursor", "pointer")
        this.svg.setAttribute("id", this.#button.key)
        this.svg.addEventListener("mousedown", buttonDown, false)
        this.svg.addEventListener("mouseup", buttonUp, false)
        this.svg.addEventListener("touchstart", buttonDown, false)
        this.svg.addEventListener("touchend", buttonUp, false)

        var rect = doc.createElementNS(svgNS, 'rect')
        rect.setAttribute("x", this.#button.origin.x)
        rect.setAttribute("y", this.#button.origin.y)
        rect.setAttribute("width",  this.#button.size.width)
        rect.setAttribute("height", this.#button.size.height)
        rect.setAttribute("fill", this.#button.sColor)
        rect.setAttribute("style", "stroke:#000000")
        this.svg.appendChild(rect)

        var round = doc.createElementNS(svgNS, 'rect')
        round.setAttribute("x", this.#button.origin.x + r)
        round.setAttribute("y", this.#button.origin.y + r)
        round.setAttribute("rx", 10)
        round.setAttribute("ry", 10)
        round.setAttribute("width",  this.#button.size.width - 2*r)
        round.setAttribute("height", this.#button.size.height - 2*r)
        round.setAttribute("fill", this.#button.bColor)
        //round.setAttribute("style", "stroke:" + this.#button.sColor)
        this.svg.appendChild(round)

        var i
        const size = 20
        for (i = 0; i < this.#button.name.length; ++i) {
            const txt = doc.createElementNS(svgNS, "text")
            txt.setAttribute("x", this.#button.origin.x + this.#button.size.width/2)
            txt.setAttribute("y", this.#button.origin.y + (this.#button.size.height - (this.#button.name.length-1)*size)/2 + i*size)
            txt.setAttribute("fill", this.#button.fColor)
            txt.setAttribute("font-family", "Arial Narrow")
            txt.setAttribute("text-anchor", "middle")
            txt.setAttribute("dominant-baseline", "central")
            txt.setAttribute("font-weight", "bold")
            txt.setAttribute("font-size", size)
            txt.setAttribute("pointer-events", "none")
            txt.appendChild(doc.createTextNode(this.#button.name[i]))
            this.svg.appendChild(txt)
        }
    }
    insertAt(parent) {
        parent.appendChild(this.svg)
    }
}

class Calculator {
    #rot = false
    #log 
    #core0
    #core1
    #display
    constructor(doc) {
        this.document = doc
        this.board = this.document.createElementNS(svgNS, 'svg')
        this.board.setAttribute("width",  600)
        this.board.setAttribute("height", 560)

        var border = this.document.createElementNS(svgNS, 'rect')
        border.setAttribute("x", 2)
        border.setAttribute("y", 2)
        border.setAttribute("width",  596)
        border.setAttribute("height", 556)
        border.setAttribute("style", "fill:#e8e8e8;stroke:#d0d0d0;stroke-width:4")
        this.board.appendChild(border)

        var disp = this.document.createElementNS(svgNS, 'rect')
        disp.setAttribute("x", 25)
        disp.setAttribute("y", 200)
        disp.setAttribute("width",  550)
        disp.setAttribute("height", 85)
        disp.setAttribute("style", "fill:#383838")
        this.board.appendChild(disp)

        var kbd = this.document.createElementNS(svgNS, 'rect')
        kbd.setAttribute("x", 25)
        kbd.setAttribute("y", 285)
        kbd.setAttribute("width",  550)
        kbd.setAttribute("height", 260)
        kbd.setAttribute("style", "fill:#404040")
        this.board.appendChild(kbd)

        this.#display = new SVGDisplay(this.document)
        this.#display.insertAt(this.board)

        var obj = null 
        var i

        for (i = 0; i < buttons.length; ++i) {
            obj = new SVGButton(this.document, buttons[i])
            obj.insertAt(this.board)
        }
        for (i = 0; i < labels.length; ++i) {
            obj = new SVGLabel(this.document, labels[i])
            obj.insertAt(this.board)
        }
        this.#log = new Logger()

        this.#core0 = new Core(0, "K145VV7P", this.#log, COMMANDS_VV7P, SPROGS_VV7P, UCMDS_VV7P, SEGMENTS_VV7P, MNEMONICS_VV7P, COMMENTS_VV7P)
        //this.#core0.list()
    
        this.#core1 = new Core(1, "K145VV8P", this.#log, COMMANDS_VV8P, SPROGS_VV8P, UCMDS_VV8P, SEGMENTS_VV8P, MNEMONICS_VV8P, COMMENTS_VV8P)
        //this.#core1.list()
    
        this.document.body.appendChild(this.board)
    }

    update(key) {
        this.#core0.step(key)
        this.#core1.step(0)

        var m = this.#core0.D
        this.#core0.D = this.#core1.D
        this.#core1.D = m
        
        const data = [this.#core0.Display, this.#core1.Display]
        this.#display.setValues(data)

        if (this.#log.enable) {
            //      |   11   |   10   |   09   |   08   |   07   |   06   |   05   |   04   |   03   |   02   |   01   |   00   |
            // 0 M0 |        | X pnt  |        |  X 15  |  X 14  |  X 13  |  X 12  |  X 11  |  X 10  |  X 09  |  X 08  |        |
            // 0 M1 | MsgMrk |        | Y pnt  |        |  Y 15  |  Y 14  |  Y 13  |  Y 12  |  Y 11  |  Y 10  |  Y 09  |  Y 08  |
            // 0 M2 | RngMrk |        |        |        |        |        |        |        |        |        |        |        |
            // 1 M0 |        |        |        |        |        |        |        |        |        |        |        |        |
            // 1 M1 | SncMrk | CurOp  |        |        |  X 07  |  X 06  |  X 05  |  X 04  |  X 03  |  X 02  |  X 01  |  X 00  |
            // 1 M2 |        |        |        |        |  Y 07  |  Y 06  |  Y 05  |  Y 04  |  Y 03  |  Y 02  |  Y 01  |  Y 00  |
            //
            // RngMrk - метка кольца
            // SncMrk - метка синхронизации
            // MsgMrk - метка сообщения
            // CurOp - текущая операция (1 - "/", 2 - "+")
            let c0 = this.#rot ? this.#core0 : this.#core1 
            let c1 = this.#rot ? this.#core1 : this.#core0 
            this.#log.add("MM: " + c0.mToStr() + " " + c1.mToStr())
        }
        this.#log.output()

        this.#rot = !this.#rot
    }

    trace(ena) {
        if (this.#log.enable != ena) {
            if (ena) {
                this.#core0.reset()
                this.#core1.reset()
            }
            this.#log.enable = ena
        }
    }
}

var trace = null
var calc = null
var key = 0
var count = 0

function buttonDown(event) {
    key = event.target.parentElement.id
    count = 7
    event.preventDefault()
}

function buttonUp(event) {
//    key = 0
    event.preventDefault()
}

window.onload = function() {
    trace = document.getElementById('trace-info')
    calc = new Calculator(document)

    setTimeout(onCoreStep, 10)
    //setInterval(onCoreStep, 1);
}

function onCoreStep() {
    calc.trace(trace.checked)

    var i
    for (i = 0; i < 25; ++i) {
        calc.update(key)
        if (count > 0) --count
        else key = 0
    }
    setTimeout(onCoreStep, 1)
}
