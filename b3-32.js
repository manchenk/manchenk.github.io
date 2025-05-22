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

const switches = [
    { origin: new SVGPoint( 55, 285), modes: [0x0f, 0xff], bColor: "#cdc9a8", fColor: "#303030" }
]

const buttons = [
    { origin: new SVGPoint(112, 285), size: new SVGSize(50, 35), name: ["Cx"],  key: 0x91, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(174, 285), size: new SVGSize(50, 35), name: ["[("],  key: 0x11, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(236, 285), size: new SVGSize(50, 35), name: [")]"],  key: 0x1b, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(298, 285), size: new SVGSize(50, 35), name: ["F"],   key: 0x16, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },

    { origin: new SVGPoint( 50, 355), size: new SVGSize(50, 35), name: ["7"],   key: 0x88, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(112, 355), size: new SVGSize(50, 35), name: ["8"],   key: 0x89, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(174, 355), size: new SVGSize(50, 35), name: ["9"],   key: 0x8a, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(236, 355), size: new SVGSize(50, 35), name: ["÷"],   key: 0x98, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(298, 355), size: new SVGSize(50, 35), name: ["STO"], key: 0x9a, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },

    { origin: new SVGPoint( 50, 425), size: new SVGSize(50, 35), name: ["4"],   key: 0x85, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(112, 425), size: new SVGSize(50, 35), name: ["5"],   key: 0x86, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(174, 425), size: new SVGSize(50, 35), name: ["6"],   key: 0x87, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(236, 425), size: new SVGSize(50, 35), name: ["X"],   key: 0x97, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(298, 425), size: new SVGSize(50, 35), name: ["RCL"], key: 0x99, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },

    { origin: new SVGPoint( 50, 495), size: new SVGSize(50, 35), name: ["1"],   key: 0x82, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(112, 495), size: new SVGSize(50, 35), name: ["2"],   key: 0x83, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(174, 495), size: new SVGSize(50, 35), name: ["3"],   key: 0x84, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(236, 495), size: new SVGSize(50, 35), name: ["−"],   key: 0x96, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(298, 495), size: new SVGSize(50, 35), name: ["EEX"], key: 0x92, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },

    { origin: new SVGPoint( 50, 565), size: new SVGSize(50, 35), name: ["0"],   key: 0x81, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(112, 565), size: new SVGSize(50, 35), name: ["."],   key: 0x94, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(174, 565), size: new SVGSize(50, 35), name: ["/−/"], key: 0x93, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(236, 565), size: new SVGSize(50, 35), name: ["+"],   key: 0x95, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" },
    { origin: new SVGPoint(298, 565), size: new SVGSize(50, 35), name: ["="],   key: 0x9b, sColor: "#000000", bColor: "#404040", fColor: "#ffffff" }
]

const labels = [
//    { origin: new SVGPoint(45, 255), fontFamily: "Arial", fontStyle: "normal", text: "ЭЛЕКТРОНИКА", size: 32, color: "none", sColor: "#888811" },
    { origin: new SVGPoint( 45, 245), fontFamily: "Arial", fontStyle: "bold", text: "ЭЛЕКТРОНИКА", size: 32, color: "none", sColor: "#cdc9a8" },

    { origin: new SVGPoint(55, 275), fontFamily: "Arial", fontStyle: "bold",  text: "R", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(85, 275), fontFamily: "Arial", fontStyle: "bold",  text: "D", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(128, 275), fontFamily: "Arial", fontStyle: "bold", text: "CF", size: 14, color: "#000000", sColor: "none" },

    { origin: new SVGPoint( 60, 345), fontFamily: "Arial", fontStyle: "bold", text: "sin", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(125, 345), fontFamily: "Arial", fontStyle: "bold", text: "cos", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(190, 345), fontFamily: "Arial", fontStyle: "bold", text: "tg",  size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(253, 345), fontFamily: "Arial", fontStyle: "bold", text: "1/x", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(315, 345), fontFamily: "Arial", fontStyle: "bold", text: "det", size: 14, color: "#000000", sColor: "none" },

    { origin: new SVGPoint( 60, 415), fontFamily: "Arial", fontStyle: "bold", text: "sin", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint( 82, 412), fontFamily: "Arial", fontStyle: "bold", text: "-1", size: 10, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(125, 415), fontFamily: "Arial", fontStyle: "bold", text: "cos", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(152, 412), fontFamily: "Arial", fontStyle: "bold", text: "-1", size: 10, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(190, 415), fontFamily: "Arial", fontStyle: "bold", text: "tg",  size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(205, 412), fontFamily: "Arial", fontStyle: "bold", text: "-1",  size: 10, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(253, 415), fontFamily: "Arial", fontStyle: "bold", text: "X", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(263, 410), fontFamily: "Arial", fontStyle: "bold", text: "2", size: 10, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(315, 415), fontFamily: "Arial", fontStyle: "bold", text: "X", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(325, 417), fontFamily: "Arial", fontStyle: "bold", text: "1,2", size: 10, color: "#000000", sColor: "none" },

    { origin: new SVGPoint( 70, 485), fontFamily: "Arial", fontStyle: "bold", text: "ln", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(130, 485), fontFamily: "Arial", fontStyle: "bold", text: "lg", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(195, 485), fontFamily: "Arial", fontStyle: "bold", text: "π",  size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(243, 485), fontFamily: "Arial", fontStyle: "bold", text: "X↔M", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(315, 485), fontFamily: "Arial", fontStyle: "bold", text: "X", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(325, 478), fontFamily: "Arial", fontStyle: "bold", text: "y", size: 10, color: "#000000", sColor: "none" },

    { origin: new SVGPoint( 72, 555), fontFamily: "Arial", fontStyle: "bold", text: "e", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint( 80, 547), fontFamily: "Arial", fontStyle: "bold", text: "x", size: 10, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(127, 555), fontFamily: "Arial", fontStyle: "bold", text: "10", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(143, 547), fontFamily: "Arial", fontStyle: "bold", text: "x", size: 10, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(190, 555), fontFamily: "Arial", fontStyle: "bold", text: "CN",  size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(250, 555), fontFamily: "Arial", fontStyle: "bold", text: "M+", size: 14, color: "#000000", sColor: "none" },
    { origin: new SVGPoint(315, 555), fontFamily: "Arial", fontStyle: "bold", text: "√", size: 14, color: "#000000", sColor: "none" }

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
        { element: 'circle', no: 7, pos: new SVGPoint(1.5*SVGDigit.dx+1.5*SVGDigit.sq, 2*SVGDigit.dy), r: 0.8 }
    ]
    static digSigs = [
        { element: 'circle', no: 0, pos: new SVGPoint(SVGDigit.dx/2, SVGDigit.dy/3), r: 3 },
        { element: 'line',   no: 3, beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { element: 'circle', no: 7, pos: new SVGPoint(1.5*SVGDigit.dx+1.5*SVGDigit.sq, 2*SVGDigit.dy), r: 2 }
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
    static size = 9
    constructor(doc) {
        this.disp = doc.createElementNS(svgNS, "g")
        var rect = doc.createElementNS(svgNS, "rect")
        rect.setAttribute("x", 80)
        rect.setAttribute("y", 90)
        rect.setAttribute("width",  240)
        rect.setAttribute("height", 70)
        rect.setAttribute("fill", "#0f2e25")
        this.disp.appendChild(rect)
        this.ranks = []
        var i
        for (i = 0; i < SVGDisplay.size; ++i) {
            var rank = new SVGDigit(doc, new SVGPoint(95 + 25*i, 105), false)
            rank.insertAt(this.disp)
            this.ranks[i] = rank
        }
    }

    setValues(data) {
        const pos = [8, 7, 6, 5, 4, 3, 2, 1, 0]
        let sym = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        let i        
        for (i = 0; i < data.length; ++i) {
            sym[pos[i]] |= data[i]
        }
        for (i = 0; i < sym.length; ++i) {
            this.ranks[i].setValue(sym[i])
        }
    }
    insertAt(parent) {
        parent.appendChild(this.disp)
    }
}

// class SVGLabel {
//     constructor(doc, label) {
//         this.label = label
//         this.txt = doc.createElementNS(svgNS, "text")
//         this.txt.setAttribute("x", this.label.origin.x)
//         this.txt.setAttribute("y", this.label.origin.y)
//         this.txt.setAttribute("fill", this.label.color)
//         this.txt.setAttribute("font-family", "Arial")
//         this.txt.setAttribute("font-weight", "bold")
//         this.txt.setAttribute("font-size", this.label.size)
//         this.txt.setAttribute("pointer-events", "none")
//         this.txt.appendChild(doc.createTextNode(this.label.text))
//     }
//     insertAt(parent) {
//         parent.appendChild(this.txt)
//     }
// }

class SVGLabel {
    #label
    constructor(doc, label) {
        this.#label = label
        this.txt = doc.createElementNS(svgNS, "text")
        this.txt.setAttribute("x", this.#label.origin.x)
        this.txt.setAttribute("y", this.#label.origin.y)
        this.txt.setAttribute("fill", this.#label.color)
        this.txt.setAttribute("stroke", this.#label.sColor)
        this.txt.setAttribute("font-family", this.#label.fontFamily)
        this.txt.setAttribute("font-style", this.#label.fontStyle)
        this.txt.setAttribute("font-weight", "bold")
        this.txt.setAttribute("font-size", this.#label.size)
        this.txt.setAttribute("pointer-events", "none")
        this.txt.appendChild(doc.createTextNode(this.#label.text))
    }
    insertAt(parent) {
        parent.appendChild(this.txt)
    }
}

class SVGSwitch {
    constructor(doc, sw) {
        const width = 20
        const height = 35
        this.switch = sw
        const modes = sw.modes
        var i
        this.svg = doc.createElementNS(svgNS, 'g')
        this.svg.setAttribute("stroke", this.switch.fColor)
        this.svg.setAttribute("fill", this.switch.bColor)
        for (i = 0; i < modes.length; ++i) {

            var rect = doc.createElementNS(svgNS, 'rect')
            rect.setAttribute("cursor", "pointer")
            rect.setAttribute("id", modes[i])
            rect.addEventListener("mousedown", switchDown, false)
            rect.addEventListener("mouseup", switchUp, false)
            rect.addEventListener("touchstart", switchDown, false)
            rect.addEventListener("touchend", switchUp, false)
            rect.setAttribute("x", this.switch.origin.x + i * width)
            rect.setAttribute("y", this.switch.origin.y)
            rect.setAttribute("width",  width)
            rect.setAttribute("height", height)
            rect.setAttribute("fill", i == 0 ? this.switch.fColor : this.switch.bColor)
            this.svg.appendChild(rect)
        }
    }
    insertAt(parent) {
        parent.appendChild(this.svg)
    }
}

// class SVGButton {
//     constructor(doc, button) {
//         const width = 50
//         const height = 35
//         this.button = button
//         this.svg = doc.createElementNS(svgNS, 'g')
//         this.svg.setAttribute("cursor", "pointer")
//         this.svg.setAttribute("id", this.button.key)
//         this.svg.addEventListener("mousedown", buttonDown, false)
//         this.svg.addEventListener("mouseup", buttonUp, false)
//         this.svg.addEventListener("touchstart", buttonDown, false)
//         this.svg.addEventListener("touchend", buttonUp, false)

//         var rect = doc.createElementNS(svgNS, 'rect')
//         rect.setAttribute("x", this.button.origin.x)
//         rect.setAttribute("y", this.button.origin.y)
//         rect.setAttribute("width",  width)
//         rect.setAttribute("height", height)
//         rect.setAttribute("fill", this.button.bColor)
//         this.svg.appendChild(rect)

//         var txt = doc.createElementNS(svgNS, "text")
//         txt.setAttribute("x", this.button.origin.x + width/2)
//         txt.setAttribute("y", this.button.origin.y + height/2)
//         txt.setAttribute("fill", this.button.fColor)
//         txt.setAttribute("font-family", "Arial")
//         txt.setAttribute("text-anchor", "middle")
//         txt.setAttribute("dominant-baseline", "central")
//         txt.setAttribute("font-weight", "bold")
//         txt.setAttribute("font-size", 24)
//         txt.setAttribute("pointer-events", "none")
//         txt.appendChild(doc.createTextNode(this.button.name))
//         this.svg.appendChild(txt)
//     }
//     insertAt(parent) {
//         parent.appendChild(this.svg)
//     }
// }
class SVGButton {
    #button
    constructor(doc, button) {
        this.#button = button
        const r = 6
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
        rect.setAttribute("rx", 3)
        rect.setAttribute("ry", 3)
        rect.setAttribute("width",  this.#button.size.width)
        rect.setAttribute("height", this.#button.size.height)
        rect.setAttribute("style", "stroke-width:2;stroke:" + this.#button.sColor)
        rect.setAttribute("fill", this.#button.bColor)
        this.svg.appendChild(rect)

        var i
        const size = 24
        const step = 24
        for (i = 0; i < this.#button.name.length; ++i) {
            const txt = doc.createElementNS(svgNS, "text")
            txt.setAttribute("x", this.#button.origin.x + this.#button.size.width/2)
            txt.setAttribute("y", this.#button.origin.y + (this.#button.size.height - (this.#button.name.length-1)*size)/2 + i*step)
            txt.setAttribute("fill", this.#button.fColor)
            txt.setAttribute("font-family", "Arial")
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
    #log
    #core
    #display
    constructor(doc) {
        this.document = doc
        this.board = this.document.createElementNS(svgNS, 'svg')
        this.board.setAttribute("width",  400)
        this.board.setAttribute("height", 645)

        var border = this.document.createElementNS(svgNS, 'rect')
        border.setAttribute("x", 2)
        border.setAttribute("y", 2)
        border.setAttribute("width",  396)
        border.setAttribute("height", 641)
        border.setAttribute("style", "fill:#ede9c8;stroke:#d7ccad;stroke-width:4")
        this.board.appendChild(border)


        var disp = this.document.createElementNS(svgNS, 'rect')
        disp.setAttribute("x", 25)
        disp.setAttribute("y", 40)
        disp.setAttribute("width",  350)
        disp.setAttribute("height", 170)
        disp.setAttribute("style", "fill:#144a37;stroke:#111111;stroke-width:10")
        this.board.appendChild(disp)

        var kbd = this.document.createElementNS(svgNS, 'rect')
        kbd.setAttribute("x", 25)
        kbd.setAttribute("y", 255)
        kbd.setAttribute("width",  350)
        kbd.setAttribute("height", 360)
        kbd.setAttribute("style", "fill:#dddddd;stroke:#000000;stroke-width:2")
        this.board.appendChild(kbd)

        this.#display = new SVGDisplay(this.document)
        this.#display.insertAt(this.board)

        var obj = null 
        var i

        for (i = 0; i < buttons.length; ++i) {
            obj = new SVGButton(this.document, buttons[i])
            obj.insertAt(this.board)
        }
        for (i = 0; i < switches.length; ++i) {
            obj = new SVGSwitch(this.document, switches[i])
            obj.insertAt(this.board)
        }
        for (i = 0; i < labels.length; ++i) {
            obj = new SVGLabel(this.document, labels[i])
            obj.insertAt(this.board)
        }

        this.#log = new Logger()

        this.#core = new Core(0, "K145IK2P", this.#log, COMMANDS, SPROGS, UCMDS, SEGMENTS, MNEMONICS, COMMENTS)
        //this.#core.list()

        this.document.body.appendChild(this.board)
    }

    update(key, mode) {
        this.#core.step(key, [mode])
        this.#display.setValues(this.#core.Display)
        this.#log.output()
    }

    trace(ena) {
        if (this.#log.enable != ena) {
            if (ena) {
                this.#core.reset()
            }
            this.#log.enable = ena
        }
    }
}

var trace = null
var calc = null
var key = 0
var mode = switches[0].modes[0]
var count = 0

function buttonDown(event) {
    key = event.target.parentElement.id
    count = 7
    event.preventDefault()
}

function buttonUp(event) {
    //key = 0
    event.preventDefault()
}

function switchDown(event) {
    const parent = event.target.parentElement
    var i
    for (i = 0; i < parent.children.length; ++i) {
        parent.children[i].setAttribute("fill", parent.getAttribute('fill'))
    }
    event.target.setAttribute("fill", parent.getAttribute('stroke'))
    mode = event.target.id
    event.preventDefault()
}

function switchUp(event) {
    event.preventDefault()
}

window.onload = function() {
    trace = document.getElementById('trace-info')
    calc = new Calculator(document)

    setInterval(onCoreStep, 1)
//    onCoreStep()
}

function onCoreStep() {
    calc.trace(trace.checked)

    calc.update(key, mode)

    if (count > 0) --count
    else key = 0
}
