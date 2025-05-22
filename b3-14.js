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

const svgNS = 'http://www.w3.org/2000/svg';

const buttons = [
    { origin: new SVGPoint(310, 300), size: new SVGSize(55, 35), name: ["С"], key: 0x2A, sColor: "#000000", bColor: "#ff2020", fColor: "#ffffff" },

    { origin: new SVGPoint( 30, 375), size: new SVGSize(55, 35), name: ["7"], key: 0x17, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(100, 375), size: new SVGSize(55, 35), name: ["8"], key: 0x18, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(170, 375), size: new SVGSize(55, 35), name: ["9"], key: 0x19, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(240, 375), size: new SVGSize(55, 35), name: ["÷"], key: 0x26, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(310, 375), size: new SVGSize(55, 35), name: ["√"], key: 0x23, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },

    { origin: new SVGPoint( 30, 450), size: new SVGSize(55, 35), name: ["4"], key: 0x14, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(100, 450), size: new SVGSize(55, 35), name: ["5"], key: 0x15, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(170, 450), size: new SVGSize(55, 35), name: ["6"], key: 0x16, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(240, 450), size: new SVGSize(55, 35), name: ["х"], key: 0x27, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(310, 450), size: new SVGSize(55, 35), name: ["%"], key: 0x21, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },

    { origin: new SVGPoint( 30, 525), size: new SVGSize(55, 35), name: ["1"],   key: 0x11, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(100, 525), size: new SVGSize(55, 35), name: ["2"],   key: 0x12, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(170, 525), size: new SVGSize(55, 35), name: ["3"],   key: 0x13, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(240, 525), size: new SVGSize(55, 35), name: ["‒"],   key: 0x25, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(310, 525), size: new SVGSize(55, 35), name: ["1/x"], key: 0x22, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },

    { origin: new SVGPoint( 30, 600), size: new SVGSize(55, 35), name: ["0"],  key: 0x10, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(100, 600), size: new SVGSize(55, 35), name: ["."],  key: 0x28, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(170, 600), size: new SVGSize(55, 35), name: ["СК"], key: 0x29, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(240, 600), size: new SVGSize(55, 35), name: ["+"],  key: 0x24, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" },
    { origin: new SVGPoint(310, 600), size: new SVGSize(55, 35), name: ["="],  key: 0x20, sColor: "#000000", bColor: "#202020", fColor: "#ffffff" }
];

const labels = [
    { origin: new SVGPoint(45, 255), fontFamily: "Arial", fontStyle: "normal", text: "ЭЛЕКТРОНИКА", size: 32, color: "none", sColor: "#888811" },
];
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
        { element: 'circle', no: 7, pos: new SVGPoint(0.3*SVGDigit.dx+SVGDigit.sq, 1.7*SVGDigit.dy), r: 0.8 }
    ]
    static digSigs = [
        { element: 'circle', no: 0, pos: new SVGPoint(SVGDigit.dx/2, SVGDigit.dy/3), r: 3 },
        { element: 'line',   no: 3, beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { element: 'circle', no: 7, pos: new SVGPoint(0.3*SVGDigit.dx+SVGDigit.sq, 1.7*SVGDigit.dy), r: 2 }
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
    static size = 9;
    constructor(doc) {
        this.disp = doc.createElementNS(svgNS, "g");
        var rect = doc.createElementNS(svgNS, "rect");
        rect.setAttribute("x", 60);
        rect.setAttribute("y", 90);
        rect.setAttribute("width",  278);
        rect.setAttribute("height", 60);
        rect.setAttribute("fill", "#1a2c2d");
        this.disp.appendChild(rect);
        this.ranks = [];
        var i;
        for (i = 0; i < SVGDisplay.size; ++i) {
            var rank = new SVGDigit(doc, new SVGPoint(95 + 25*i, 105, false));
            rank.insertAt(this.disp);
            this.ranks[i] = rank;
        }
    }
    setValues(data) {
        var i;
        for (i = 0; i < SVGDisplay.size; ++i) {
            var pos = 8 - i;
            this.ranks[i].setValue(data[pos]);
        }

    }
    insertAt(parent) {
        parent.appendChild(this.disp);
    }
}

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
        rect.setAttribute("style", "stroke-width:1;stroke:" + this.#button.sColor)
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
    constructor(doc) {
        this.document = doc;
        this.board = this.document.createElementNS(svgNS, 'svg');
        this.board.setAttribute("width",  400);
        this.board.setAttribute("height", 670);

        var border = this.document.createElementNS(svgNS, 'rect');
        border.setAttribute("x", 2);
        border.setAttribute("y", 2);
        border.setAttribute("width",  396);
        border.setAttribute("height", 666);
        border.setAttribute("style", "fill:#e2d636;stroke:#d3c21e;stroke-width:4");
        this.board.appendChild(border);

        var disp = this.document.createElementNS(svgNS, 'rect');
        disp.setAttribute("x", 10);
        disp.setAttribute("y", 35);
        disp.setAttribute("width",  380);
        disp.setAttribute("height", 185);
        disp.setAttribute("style", "fill:#2c2a2f");
        this.board.appendChild(disp);

        var kbd = this.document.createElementNS(svgNS, 'rect');
        kbd.setAttribute("x", 10);
        kbd.setAttribute("y", 265);
        kbd.setAttribute("width",  380);
        kbd.setAttribute("height", 390);
        kbd.setAttribute("style", "fill:#e7e6e3");
        this.board.appendChild(kbd);

        this.display = new SVGDisplay(this.document);
        this.display.insertAt(this.board);

        var obj = null; 
        var i;

        for (i = 0; i < buttons.length; ++i) {
            obj = new SVGButton(this.document, buttons[i]);
            obj.insertAt(this.board);
        }
        for (i = 0; i < labels.length; ++i) {
            obj = new SVGLabel(this.document, labels[i]);
            obj.insertAt(this.board);
        }

        this.#log = new Logger();

        this.#core = new Core(0, "K145IK2P", this.#log, COMMANDS, SPROGS, UCMDS, SEGMENTS, MNEMONICS, COMMENTS);
        //this.#core.list();

        this.document.body.appendChild(this.board);
    }

    update(key) {
        this.#core.step(key);
        this.display.setValues(this.#core.Display);
        this.#log.output();
    }

    trace(ena) {
        if (this.#log.enable != ena) {
            if (ena) this.#core.reset()
            this.#log.enable = ena
        }
    }
}

var trace = null
var core = null
var calc = null
var count = 0
var key = 0

function buttonDown(event) {
    key = event.target.parentElement.id
    count = 7
    event.preventDefault()
}

function buttonUp(event) {
    //key = 0
    event.preventDefault()
}

window.onload = function() {
    trace = document.getElementById('trace-info')

    calc = new Calculator(document)

    //setInterval(onCoreStep, 1)
    setTimeout(onCoreStep, 10)
};

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
