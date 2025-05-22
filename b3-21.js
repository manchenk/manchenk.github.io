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
    { origin: new SVGPoint(65, 260), name: "on",  bColor: "#404040", fColor: "#000000", modes: [0x00, 0x00] }
]

const buttons = [
    { origin: new SVGPoint(113, 385), size: new SVGSize(45, 40), key: 0x3a, name: ["→","ШГ"],   sColor: "#000000", bColor: "#cbcac8", fColor: "#ffffff" },
    { origin: new SVGPoint(178, 385), size: new SVGSize(45, 40), key: 0x39, name: ["←","ШГ"],   sColor: "#000000", bColor: "#cbcac8", fColor: "#ffffff" },
    { origin: new SVGPoint(243, 385), size: new SVGSize(45, 40), key: 0x35, name: ["В/О"],   sColor: "#000000", bColor: "#cbcac8", fColor: "#ffffff" },
    { origin: new SVGPoint(308, 385), size: new SVGSize(45, 40), key: 0x38, name: ["С/П"],   sColor: "#000000", bColor: "#cbcac8", fColor: "#ffffff" },

    { origin: new SVGPoint( 48, 450), size: new SVGSize(45, 40), key: 0x28, name: ["Сх"],   sColor: "#000000", bColor: "#bd412f", fColor: "#ffffff" },
    { origin: new SVGPoint(113, 450), size: new SVGSize(45, 40), key: 0x32, name: ["Р"],   sColor: "#000000", bColor: "#e8d502", fColor: "#bd412f" },
    { origin: new SVGPoint(178, 450), size: new SVGSize(45, 40), key: 0x34, name: ["xʸ"],   sColor: "#000000", bColor: "#cbcac8", fColor: "#ffffff" },
    { origin: new SVGPoint(243, 450), size: new SVGSize(45, 40), key: 0x36, name: ["БП"],   sColor: "#000000", bColor: "#cbcac8", fColor: "#ffffff" },
    { origin: new SVGPoint(308, 450), size: new SVGSize(45, 40), key: 0x37, name: ["ПП"],   sColor: "#000000", bColor: "#cbcac8", fColor: "#ffffff" },

    { origin: new SVGPoint( 48, 515), size: new SVGSize(45, 40), key: 0x18, name: ["7"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(113, 515), size: new SVGSize(45, 40), key: 0x19, name: ["8"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(178, 515), size: new SVGSize(45, 40), key: 0x1a, name: ["9"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(243, 515), size: new SVGSize(45, 40), key: 0x22, name: ["↔","XY"],   sColor: "#000000", bColor: "#5669d0", fColor: "#ffffff" },
    { origin: new SVGPoint(308, 515), size: new SVGSize(45, 40), key: 0x21, name: ["↑"],   sColor: "#000000", bColor: "#5669d0", fColor: "#ffffff" },

    { origin: new SVGPoint( 48, 580), size: new SVGSize(45, 40), key: 0x15, name: ["4"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(113, 580), size: new SVGSize(45, 40), key: 0x16, name: ["5"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(178, 580), size: new SVGSize(45, 40), key: 0x17, name: ["6"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(243, 580), size: new SVGSize(45, 40), key: 0x23, name: ["х"],   sColor: "#000000", bColor: "#5669d0", fColor: "#ffffff" },
    { origin: new SVGPoint(308, 580), size: new SVGSize(45, 40), key: 0x2a, name: ["+"],   sColor: "#000000", bColor: "#5669d0", fColor: "#ffffff" },

    { origin: new SVGPoint( 48, 645), size: new SVGSize(45, 40), key: 0x12, name: ["1"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(113, 645), size: new SVGSize(45, 40), key: 0x13, name: ["2"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(178, 645), size: new SVGSize(45, 40), key: 0x14, name: ["3"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(243, 645), size: new SVGSize(45, 40), key: 0x24, name: ["÷"],   sColor: "#000000", bColor: "#5669d0", fColor: "#ffffff" },
    { origin: new SVGPoint(308, 645), size: new SVGSize(45, 40), key: 0x29, name: ["−"],   sColor: "#000000", bColor: "#5669d0", fColor: "#ffffff" },

    { origin: new SVGPoint( 48, 710), size: new SVGSize(45, 40), key: 0x11, name: ["0"],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(113, 710), size: new SVGSize(45, 40), key: 0x25, name: [","],   sColor: "#000000", bColor: "#231d1d", fColor: "#ffffff" },
    { origin: new SVGPoint(178, 710), size: new SVGSize(45, 40), key: 0x26, name: ["/−/"],   sColor: "#000000", bColor: "#5669d0", fColor: "#ffffff" },
    { origin: new SVGPoint(243, 710), size: new SVGSize(45, 40), key: 0x27, name: ["ВП"],   sColor: "#000000", bColor: "#5669d0", fColor: "#ffffff" },
    { origin: new SVGPoint(308, 710), size: new SVGSize(45, 40), key: 0x33, name: ["F"],   sColor: "#000000", bColor: "#624728", fColor: "#ffffff" }
]

const labels = [
    { origin: new SVGPoint(170, 285), fontFamily: "Arial", fontStyle: "normal", text: "ЭЛЕКТРОНИКА", size: 24, color: "none", sColor: "#968e86" },
    { origin: new SVGPoint(280, 355), fontFamily: "Arial", fontStyle: "normal", text: "Б3·21", size: 24, color: "none", sColor: "#968e86" },

    { origin: new SVGPoint(127, 380), fontFamily: "Arial", fontStyle: "normal", text: "РР", size: 14, color: "#e1272c", sColor: "none" },
    { origin: new SVGPoint(192, 380), fontFamily: "Arial", fontStyle: "normal", text: "РП", size: 14, color: "#e1272c", sColor: "none" },
    { origin: new SVGPoint(257, 380), fontFamily: "Arial", fontStyle: "normal", text: "x≥0", size: 14, color: "#e1272c", sColor: "none" },
    { origin: new SVGPoint(320, 380), fontFamily: "Arial", fontStyle: "normal", text: "x≠0", size: 14, color: "#e1272c", sColor: "none" },

    { origin: new SVGPoint(190, 445), fontFamily: "Arial", fontStyle: "normal", text: "НОП", size: 14, color: "#e1272c", sColor: "none" },
    { origin: new SVGPoint(257, 445), fontFamily: "Arial", fontStyle: "normal", text: "x=0", size: 14, color: "#e1272c", sColor: "none" },
    { origin: new SVGPoint(320, 445), fontFamily: "Arial", fontStyle: "normal", text: "x<0", size: 14, color: "#e1272c", sColor: "none" },

    { origin: new SVGPoint(262, 510), fontFamily: "Arial", fontStyle: "normal", text: "ln", size: 14, color: "#e1272c", sColor: "none" },
    { origin: new SVGPoint(325, 510), fontFamily: "Arial", fontStyle: "normal", text: "eˣ", size: 14, color: "#e1272c", sColor: "none" },

    { origin: new SVGPoint(262, 575), fontFamily: "Arial", fontStyle: "normal", text: "π", size: 14, color: "#e1272c", sColor: "none" },
    { origin: new SVGPoint(320, 575), fontFamily: "Arial", fontStyle: "normal", text: "sin", size: 14, color: "#e1272c", sColor: "none" },

    { origin: new SVGPoint(262, 640), fontFamily: "Arial", fontStyle: "normal", text: "eˣ", size: 14, color: "#e1272c", sColor: "none" },
    { origin: new SVGPoint(320, 640), fontFamily: "Arial", fontStyle: "normal", text: "cos", size: 14, color: "#e1272c", sColor: "none" },

    { origin: new SVGPoint(127, 705), fontFamily: "Arial", fontStyle: "normal", text: "1/x", size: 14, color: "#624728", sColor: "none" },
    { origin: new SVGPoint(192, 705), fontFamily: "Arial", fontStyle: "normal", text: "x²", size: 14, color: "#624728", sColor: "none" },
    { origin: new SVGPoint(262, 705), fontFamily: "Arial", fontStyle: "normal", text: "√", size: 14, color: "#624728", sColor: "none" }
]

class SVGDigit {
    static dx = 10
    static dy = 12
    static sq = -1.5
    static pt = 3
    static digSegs = [
        { element: 'line',   no: 0, beg: new SVGPoint(0, 0), end: new SVGPoint(SVGDigit.dx, 0) },
        { element: 'line',   no: 1, beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(0, 0) },
        { element: 'line',   no: 2, beg: new SVGPoint(SVGDigit.dx, 0), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { element: 'line',   no: 3, beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { element: 'line',   no: 4, beg: new SVGPoint(2*SVGDigit.sq, 2*SVGDigit.dy), end: new SVGPoint(SVGDigit.sq, SVGDigit.dy) },
        { element: 'line',   no: 5, beg: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+2*SVGDigit.sq, 2*SVGDigit.dy) },
        { element: 'line',   no: 6, beg: new SVGPoint(SVGDigit.dx+2*SVGDigit.sq, 2*SVGDigit.dy), end: new SVGPoint(2*SVGDigit.sq,2*SVGDigit.dy) },
        { element: 'circle', no: 7, pos: new SVGPoint(0.35*SVGDigit.dx+0.4*SVGDigit.sq, 1.6*SVGDigit.dy), r: 1 }
    ]
    static digSigs = [
        { element: 'circle', no: 0, pos: new SVGPoint(0.4*SVGDigit.dx, SVGDigit.dy/3), r: 2 },
        { element: 'line',   no: 3, beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { element: 'circle', no: 7, pos: new SVGPoint(0.35*SVGDigit.dx+0.4*SVGDigit.sq, 1.6*SVGDigit.dy), r: 1 }
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
                    segment.segment.setAttribute("style", "fill:#014532;stroke:#014532;stroke-width:2")
            }
        }
    }
}


class SVGDisplay {
    static size = 12
    constructor(doc) {
        this.disp = doc.createElementNS(svgNS, "g")
        var rect = doc.createElementNS(svgNS, "rect")
        rect.setAttribute("x", 70)
        rect.setAttribute("y", 110)
        rect.setAttribute("width",  250)
        rect.setAttribute("height", 60)
        rect.setAttribute("fill", "rgb(20,30,25)")
        this.disp.appendChild(rect)
        this.ranks = []
        var i
        for (i = 0; i < SVGDisplay.size; ++i) {
            var rank = new SVGDigit(doc, new SVGPoint(90 + 19*i, 125), i == 9)
            rank.insertAt(this.disp)
            this.ranks[i] = rank
        }
    }

    setValues(data) {
        const pos = [8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9]
        let sym = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
        const width = 15
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
        rect.setAttribute("rx", 3)
        rect.setAttribute("ry", 3)
        rect.setAttribute("width",  this.#button.size.width)
        rect.setAttribute("height", this.#button.size.height)
        rect.setAttribute("style", "stroke-width:1;stroke:" + this.#button.sColor)
        rect.setAttribute("fill", this.#button.bColor)
        this.svg.appendChild(rect)

        var i
        const size = 22
        const step = 18
        for (i = 0; i < this.#button.name.length; ++i) {
            const txt = doc.createElementNS(svgNS, "text")
            txt.setAttribute("x", this.#button.origin.x + this.#button.size.width/2)
            txt.setAttribute("y", this.#button.origin.y + (this.#button.size.height - (this.#button.name.length-1)*size)/2 + i*step)
            txt.setAttribute("fill", this.#button.fColor)
            txt.setAttribute("font-family", "Arial")
            txt.setAttribute("text-anchor", "middle")
            txt.setAttribute("dominant-baseline", "central")
            txt.setAttribute("font-weight", "regular")
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
    #core0
    #core1
    #core2
    #mem
    #display
    constructor(doc) {
        
        var board = doc.createElementNS(svgNS, 'svg');
        board.setAttribute("width",  400);
        board.setAttribute("height", 800);
        board.setAttribute("transform", "scale(0.75 0.75) translate(-67 -133)")

        var bkg = document.createElementNS(svgNS, 'rect');
        bkg.setAttribute("x", 2);
        bkg.setAttribute("y", 2);
        bkg.setAttribute("rx", 10);
        bkg.setAttribute("ry", 10);
        bkg.setAttribute("width",  396);
        bkg.setAttribute("height", 796);
        bkg.setAttribute("style", "fill:#c2beb3;stroke:#4055a7;stroke-width:6");
        board.appendChild(bkg);

        var border = document.createElementNS(svgNS, 'rect');
        border.setAttribute("x", 17);
        border.setAttribute("y", 87);
        border.setAttribute("rx", 10);
        border.setAttribute("ry", 10);
        border.setAttribute("width",  366);
        border.setAttribute("height", 225);
        border.setAttribute("style", "fill:#c2beb3;stroke:#968e86;stroke-width:4");
        board.appendChild(border);

        var border1 = document.createElementNS(svgNS, 'rect');
        border1.setAttribute("x", 17);
        border1.setAttribute("y", 312);
        border1.setAttribute("rx", 10);
        border1.setAttribute("ry", 10);
        border1.setAttribute("width",  366);
        border1.setAttribute("height", 470);
        border1.setAttribute("style", "fill:#c2beb3;stroke:#968e86;stroke-width:4");
        board.appendChild(border1);

        var disp = doc.createElementNS(svgNS, 'rect');
        disp.setAttribute("x", 20);
        disp.setAttribute("y", 90);
        disp.setAttribute("rx", 5);
        disp.setAttribute("ry", 5);
        disp.setAttribute("width",  360);
        disp.setAttribute("height", 115);
        disp.setAttribute("style", "fill:#032d22");
        board.appendChild(disp);

        var pan = doc.createElementNS(svgNS, 'rect');
        pan.setAttribute("x", 20);
        pan.setAttribute("y", 200);
        pan.setAttribute("width",  360);
        pan.setAttribute("height", 105);
        pan.setAttribute("style", "fill:#c2beb3");
        board.appendChild(pan);

        var sw = doc.createElementNS(svgNS, 'rect');
        sw.setAttribute("x", 40);
        sw.setAttribute("y", 235);
        sw.setAttribute("rx", 10);
        sw.setAttribute("ry", 10);
        sw.setAttribute("width",  85);
        sw.setAttribute("height", 65);
        sw.setAttribute("style", "fill:#c2beb3;stroke:#968e86;stroke-width:4");
        board.appendChild(sw);

        var pnt = doc.createElementNS(svgNS, 'circle');
        pnt.setAttribute("cx", 110);
        pnt.setAttribute("cy", 267);
        pnt.setAttribute("r", 5);
        pnt.setAttribute("style", "fill:#ee2c31");
        board.appendChild(pnt);

        var path = doc.createElementNS(svgNS, 'path');
        const p = 
            "M243 665 A10 10 0 0 1 233 655 L233 510 A10 10 0 0 0 223 500 L113 500 A10 10 0 0 1 103 490 " +
            "L103 385 A10 10 0 0 1 113 375 L123 375 M150 375 L190 375 M215 375 L255 375 M285 375 L315 375 " +
            "M345 375 L353 375 A10 10 0 0 1 363 385 L363 655 A10 10 0 0 1 353 665 M306 665 L290 665"
        path.setAttribute("d", p);
        path.setAttribute("style", "fill:none;stroke:#ee2c31;stroke-width:2");
        board.appendChild(path);

        var path1 = doc.createElementNS(svgNS, 'path');
        const p1 = 
            "M148 700 L190 700 M207 700 L260 700 M275 700 L353 700 A10 10 0 0 1 363 710 L363 720 A10 10 0 0 1 353 730 " +
            "M307 730 L289 730 M242 730 L224 730 M177 730 L159 730 M112 730 A10 10 0 0 1 102 720 L102 710 A10 10 0 0 1 112 700 L125 700"
        path1.setAttribute("d", p1);
        path1.setAttribute("style", "fill:none;stroke:#624728;stroke-width:2");
        board.appendChild(path1);

        var path2 = doc.createElementNS(svgNS, 'path');
        const p2 = 
            "M177 737 L159 737 M224 737 A10 10 0 0 1 234 747 L234 753 A10 10 0 0 1 224 763 L210 763" +
            "A10 10 0 0 1 190 763 A10 10 0 0 1 210 763 M190 763 L145 763" + 
            "A10 10 0 0 1 125 763 A10 10 0 0 1 145 763 M125 763 L112 763" +
            "A10 10 0 0 1 102 753 L102 747 A10 10 0 0 1 112 737" 
        path2.setAttribute("d", p2);
        path2.setAttribute("style", "fill:none;stroke:#ee2c31;stroke-width:2");
        board.appendChild(path2);
        
        this.#display = new SVGDisplay(doc);
        this.#display.insertAt(board);

        var obj = null 
        var i

        for (i = 0; i < buttons.length; ++i) {
            obj = new SVGButton(doc, buttons[i])
            obj.insertAt(board)
        }
        for (i = 0; i < switches.length; ++i) {
            obj = new SVGSwitch(doc, switches[i])
            obj.insertAt(board)
        }
        for (i = 0; i < labels.length; ++i) {
            obj = new SVGLabel(doc, labels[i])
            obj.insertAt(board)
        }

        this.#log = new Logger()
        this.#mem = new K145IR1()

        this.#core0 = new Core(0, "K145IK501P", this.#log, COMMANDS_IK501P, SPROGS_IK501P, UCMDS_IK501P, SEGMENTS_IK501P, MNEMONICS_IK501P, COMMENTS_IK501P)
        this.#core0.list()
        this.#core1 = new Core(1, "K145IK502P", this.#log, COMMANDS_IK502P, SPROGS_IK502P, UCMDS_IK502P, SEGMENTS_IK502P, MNEMONICS_IK502P, COMMENTS_IK502P)
        this.#core1.list()
        this.#core2 = new Core(2, "K145IK503P", this.#log, COMMANDS_IK503P, SPROGS_IK503P, UCMDS_IK503P, SEGMENTS_IK503P, MNEMONICS_IK503P, COMMENTS_IK503P)
        this.#core2.list()

        doc.body.appendChild(board)
    }

    update(key) {
        this.#mem.step()

        this.#core0.step(0)
        this.#core1.step(key)
        this.#core2.step(0)

        var m = this.#core2.D
        this.#core2.D = this.#core1.D
        this.#core1.D = this.#core0.D
        this.#core0.D = this.#mem.D
        this.#mem.D = m

        this.#display.setValues(this.#core1.Display)
        this.#log.output()
    }

    trace(ena) {
        if (this.#log.enable != ena) {
            if (ena) {
                this.#mem.reset()
                this.#core0.reset()
                this.#core1.reset()
                this.#core2.reset()
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
    //key = 0
    event.preventDefault()
}

window.onload = function() {
    trace = document.getElementById('trace-info')
    calc = new Calculator(document)

    setInterval(onCoreStep, 1)
}

function onCoreStep() {
    calc.trace(trace.checked)

    calc.update(key)

    if (count > 0) --count
    else key = 0
}
