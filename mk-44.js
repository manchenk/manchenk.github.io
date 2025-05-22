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
    { origin: new SVGPoint( 287, 340), name: "ap", modes: [0xff, 0xf8], bColor: "#606060", fColor: "#000000" },
    { origin: new SVGPoint( 350, 340), name: "fix", modes: [0xff, 0xf9, 0xfb], bColor: "#606060", fColor: "#000000" }
]

const buttons = [
    { origin: new SVGPoint(50, 310), size: new SVGSize(45, 45), name: "↔",    key: 0x99, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(95, 310), size: new SVGSize(45, 45), name: "%",    key: 0x1b, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(140, 310), size: new SVGSize(45, 45), name: "√",   key: 0x8b, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(185, 310), size: new SVGSize(45, 45), name: "1/x", key: 0x9b, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },

    { origin: new SVGPoint(50, 370), size: new SVGSize(45, 45), name: "СП1", key: 0x92, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(95, 370), size: new SVGSize(45, 45), name: "СП2", key: 0x91, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(50, 415), size: new SVGSize(45, 45), name: "П1−", key: 0x96, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(95, 415), size: new SVGSize(45, 45), name: "П2−", key: 0x95, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(50, 460), size: new SVGSize(45, 45), name: "П1+", key: 0x94, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(95, 460), size: new SVGSize(45, 45), name: "П2+", key: 0x93, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(50, 505), size: new SVGSize(45, 45), name: "Х→П", key: 0x98, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(95, 505), size: new SVGSize(45, 45), name: "П→Х", key: 0x97, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },

    { origin: new SVGPoint(155, 370), size: new SVGSize(45, 45), name: "7",   key: 0x88, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(200, 370), size: new SVGSize(45, 45), name: "8",   key: 0x89, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(245, 370), size: new SVGSize(45, 45), name: "9",   key: 0x8a, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(155, 415), size: new SVGSize(45, 45), name: "4",   key: 0x85, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(200, 415), size: new SVGSize(45, 45), name: "5",   key: 0x86, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(245, 415), size: new SVGSize(45, 45), name: "6",   key: 0x87, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(155, 460), size: new SVGSize(45, 45), name: "1",   key: 0x82, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(200, 460), size: new SVGSize(45, 45), name: "2",   key: 0x83, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(245, 460), size: new SVGSize(45, 45), name: "3",   key: 0x84, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(155, 505), size: new SVGSize(45, 45), name: "0",   key: 0x81, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(200, 505), size: new SVGSize(45, 45), name: ",",   key: 0x1a, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(245, 505), size: new SVGSize(45, 45), name: "/−/", key: 0x12, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },

    { origin: new SVGPoint(300, 370), size: new SVGSize(45, 45), name: "С",  key: 0x14, sColor: "#CE6050", bColor: "#DE6655", fColor: "#FFFFFF" },
    { origin: new SVGPoint(345, 370), size: new SVGSize(45, 45), name: "СК", key: 0x18, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(300, 415), size: new SVGSize(45, 45), name: "−",  key: 0x11, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(345, 415), size: new SVGSize(45, 45), name: "÷",  key: 0x17, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(300, 460), size: new SVGSize(45, 45), name: "+",  key: 0x13, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(345, 460), size: new SVGSize(45, 45), name: "x",  key: 0x15, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
    { origin: new SVGPoint(300, 505), size: new SVGSize(90, 45), name: "=",  key: 0x19, sColor: "#CECECE", bColor: "#DEDEDE", fColor: "#000000" },
]

const labels = [
    { origin: new SVGPoint( 295, 311), text: "ЭЛЕКТРОНИКА МК-44", size: 9, color: "#000000" },
    { origin: new SVGPoint( 295, 335), text: "АП", size: 9, color: "#46352C" },
    { origin: new SVGPoint( 345, 335), text: "ПЛ", size: 9, color: "#46352C" },
    { origin: new SVGPoint( 363, 335), text: "2", size: 9, color: "#46352C" },
    { origin: new SVGPoint( 375, 335), text: "4", size: 9, color: "#46352C" },

]

class SVGDigit {
    static dx = 13
    static dy = 14
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
        { element: 'circle', no: 7, pos: new SVGPoint(0.5*SVGDigit.dx+1.5*SVGDigit.sq, 1.7*SVGDigit.dy), r: 2 }
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
                    segment.segment.setAttribute("style", "fill:#73FBDE;stroke:#73FBDE;stroke-width:3")
                else 
                    segment.segment.setAttribute("style", "fill:#3c3c3c;stroke:#3c3c3c;stroke-width:3")
            }
        }
    }
}


class SVGDisplay {
    static size = 14
    constructor(doc) {
        this.disp = doc.createElementNS(svgNS, "g")
        var rect = doc.createElementNS(svgNS, "rect")
        rect.setAttribute("x", 30)
        rect.setAttribute("y", 180)
        rect.setAttribute("width",  380)
        rect.setAttribute("height", 70)
        rect.setAttribute("fill", "#0f2e25")
        this.disp.appendChild(rect)
        this.ranks = []
        var i
        for (i = 0; i < SVGDisplay.size; ++i) {
            var rank = new SVGDigit(doc, new SVGPoint(45 + 25*i, 205), i == 0)
            rank.insertAt(this.disp)
            this.ranks[i] = rank
        }
    }

    setValues(data) {
        const pos = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1]
        let sym = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let i        
        for (i = 0; i < data.length; ++i) {
            if (pos[i] >= 0) sym[pos[i]] |= data[i]
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
        this.txt.setAttribute("font-family", "Arial")
        this.txt.setAttribute("font-weight", "bold")
        this.txt.setAttribute("font-size", this.label.size)
        this.txt.setAttribute("pointer-events", "none")
        this.txt.appendChild(doc.createTextNode(this.label.text))
    }
    insertAt(parent) {
        parent.appendChild(this.txt)
    }
}

class SVGSwitch {
    constructor(doc, sw) {
        const width = 10
        const height = 15
        this.switch = sw
        const modes = sw.modes
        var i
        this.svg = doc.createElementNS(svgNS, 'g')
        this.svg.setAttribute("stroke", this.switch.fColor)
        this.svg.setAttribute("fill", this.switch.bColor)
        for (i = 0; i < modes.length; ++i) {

            var rect = doc.createElementNS(svgNS, 'rect')
            rect.setAttribute("cursor", "pointer")
            rect.setAttribute("id", sw.name+"-"+modes[i])
            rect.addEventListener("mousedown", switchDown, false)
            rect.addEventListener("mouseup", switchUp, false)
            rect.addEventListener("touchstart", switchDown, false)
            rect.addEventListener("touchend", switchUp, false)
            rect.setAttribute("x", this.switch.origin.x + i * width)
            rect.setAttribute("y", this.switch.origin.y)
            rect.setAttribute("width",  width)
            rect.setAttribute("height", height)
            rect.setAttribute("style", "stroke-width:0.2")
            rect.setAttribute("fill", i == 0 ? this.switch.fColor : this.switch.bColor)
            this.svg.appendChild(rect)
        }
    }
    insertAt(parent) {
        parent.appendChild(this.svg)
    }
}

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

        var txt = doc.createElementNS(svgNS, "text")
        txt.setAttribute("x", this.#button.origin.x + this.#button.size.width/2)
        txt.setAttribute("y", this.#button.origin.y + this.#button.size.height/2)
        txt.setAttribute("fill", this.#button.fColor)
        txt.setAttribute("font-family", "Arial")
        txt.setAttribute("text-anchor", "middle")
        txt.setAttribute("dominant-baseline", "central")
        txt.setAttribute("font-weight", "bold")
        txt.setAttribute("font-size", 13)
        txt.setAttribute("pointer-events", "none")
        txt.appendChild(doc.createTextNode(this.#button.name))
        this.svg.appendChild(txt)
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
        this.board.setAttribute("width",  460)
        this.board.setAttribute("height", 595)

        var border = this.document.createElementNS(svgNS, 'rect')
        border.setAttribute("x", 2)
        border.setAttribute("y", 2)
        border.setAttribute("width",  440)
        border.setAttribute("height", 585)
        border.setAttribute("rx", 10)
        border.setAttribute("ry", 10)
        border.setAttribute("style", "fill:#D7D8DC;stroke:#E0E0E2;stroke-width:5")
        this.board.appendChild(border)

        var kbd = this.document.createElementNS(svgNS, 'rect')
        kbd.setAttribute("x", 29)
        kbd.setAttribute("y", 285)
        kbd.setAttribute("width",  385)
        kbd.setAttribute("height", 285)
        kbd.setAttribute("rx", 5)
        kbd.setAttribute("ry", 5)
        kbd.setAttribute("style", "fill:#78605B;stroke:#B0B0B2;stroke-width:2")
        this.board.appendChild(kbd)

        var sw1 = this.document.createElementNS(svgNS, 'rect')
        sw1.setAttribute("x", 270)
        sw1.setAttribute("y", 325)
        sw1.setAttribute("width",  53)
        sw1.setAttribute("height", 34)
        sw1.setAttribute("style", "fill:#796562;stroke:#46352C;stroke-width:1")
        this.board.appendChild(sw1)

        var sw2 = this.document.createElementNS(svgNS, 'rect')
        sw2.setAttribute("x", 340)
        sw2.setAttribute("y", 325)
        sw2.setAttribute("width",  53)
        sw2.setAttribute("height", 34)
        sw2.setAttribute("style", "fill:#796562;stroke:#46352C;stroke-width:1")
        this.board.appendChild(sw2)

        var lab = this.document.createElementNS(svgNS, 'rect')
        lab.setAttribute("x", 293)
        lab.setAttribute("y", 300)
        lab.setAttribute("width",  100)
        lab.setAttribute("height", 15)
        lab.setAttribute("style", "fill:#FFFFFF")
        this.board.appendChild(lab)

        var dsp = this.document.createElementNS(svgNS, 'rect')
        dsp.setAttribute("x", 7)
        dsp.setAttribute("y", 75)
        dsp.setAttribute("width",  430)
        dsp.setAttribute("height", 210)
        dsp.setAttribute("rx", 5)
        dsp.setAttribute("ry", 5)
        dsp.setAttribute("style", "fill:#78605B;stroke:#B0B0B2;stroke-width:2")
        this.board.appendChild(dsp)

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

        this.#core = new Core(0, "K145VH205", this.#log, COMMANDS, SPROGS, UCMDS, SEGMENTS, MNEMONICS, COMMENTS)
        //this.#core.list()

        this.document.body.appendChild(this.board)
    }

    update(key, modes) {
        this.#core.step(key, modes)
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
var modeAp = switches[0].modes[0]
var modeFix = switches[1].modes[0]
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
    const target = event.target
    const parent = target.parentElement
    var i
    for (i = 0; i < parent.children.length; ++i) {
        parent.children[i].setAttribute("fill", parent.getAttribute('fill'))
    }
    target.setAttribute("fill", parent.getAttribute('stroke'))
    const fields = target.id.split("-")
    if (fields[0] == "ap") modeAp = parseInt(fields[1])
    if (fields[0] == "fix") modeFix = parseInt(fields[1])
    event.preventDefault()
}

function switchUp(event) {
    event.preventDefault()
}

window.onload = function() {
    trace = document.getElementById('trace-info')
    calc = new Calculator(document)

    setTimeout(onCoreStep, 10)
}

function onCoreStep() {
    calc.trace(trace.checked)

    var i
    for (i = 0; i < 25; ++i) {
        calc.update(key, [modeAp, modeFix])

        if (count > 0) --count
        else key = 0
    }
    setTimeout(onCoreStep, 1)

}
