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
    { origin: new SVGPoint(45, 325), name: "on",  bColor: "#404040", fColor: "#000000", modes: [0x00, 0x00] },
    { origin: new SVGPoint(205, 325), name: "rgd", bColor: "#404040", fColor: "#000000", modes: [0x09, 0x0b, 0x0a] }
]

const buttons = [
    { origin: new SVGPoint( 40, 375), size: new SVGSize(35, 25), key: 0x9a, name: ["F"],   sColor: "#000000", bColor: "rgb(230,230,50)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint( 85, 375), size: new SVGSize(35, 25), key: 0x96, name: ["←","ШГ"], sColor: "#000000", bColor: "rgb(50,50,50)", fColor: "rgb(255,255,255)" },
    { origin: new SVGPoint(130, 375), size: new SVGSize(35, 25), key: 0x98, name: ["→","ШГ"], sColor: "#000000", bColor: "rgb(50,50,50)", fColor: "rgb(255,255,255)" },
    { origin: new SVGPoint(175, 375), size: new SVGSize(35, 25), key: 0x93, name: ["В/О"], sColor: "#000000", bColor: "rgb(50,50,50)", fColor: "rgb(255,255,255)" },
    { origin: new SVGPoint(220, 375), size: new SVGSize(35, 25), key: 0x91, name: ["С/П"], sColor: "#000000", bColor: "rgb(50,50,50)", fColor: "rgb(255,255,255)" },

    { origin: new SVGPoint( 40, 430), size: new SVGSize(35, 25), key: 0x99, name: ["K"],   sColor: "#000000", bColor: "rgb(70,140,255)", fColor: "rgb(255,255,255)" },
    { origin: new SVGPoint( 85, 430), size: new SVGSize(35, 25), key: 0x97, name: ["П￫X"], sColor: "#000000", bColor: "rgb(50,50,50)", fColor: "rgb(255,255,255)" },
    { origin: new SVGPoint(130, 430), size: new SVGSize(35, 25), key: 0x95, name: ["X￫П"], sColor: "#000000", bColor: "rgb(50,50,50)", fColor: "rgb(255,255,255)" },
    { origin: new SVGPoint(175, 430), size: new SVGSize(35, 25), key: 0x92, name: ["БП"],  sColor: "#000000", bColor: "rgb(50,50,50)", fColor: "rgb(255,255,255)" },
    { origin: new SVGPoint(220, 430), size: new SVGSize(35, 25), key: 0x94, name: ["ПП"],  sColor: "#000000", bColor: "rgb(50,50,50)", fColor: "rgb(255,255,255)" },

    { origin: new SVGPoint( 40, 485), size: new SVGSize(35, 25), key: 0x18, name: ["7"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint( 85, 485), size: new SVGSize(35, 25), key: 0x19, name: ["8"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(130, 485), size: new SVGSize(35, 25), key: 0x1a, name: ["9"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(175, 485), size: new SVGSize(35, 25), key: 0x82, name: ["−"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(220, 485), size: new SVGSize(35, 25), key: 0x84, name: ["÷"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },

    { origin: new SVGPoint( 40, 540), size: new SVGSize(35, 25), key: 0x15, name: ["4"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint( 85, 540), size: new SVGSize(35, 25), key: 0x16, name: ["5"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(130, 540), size: new SVGSize(35, 25), key: 0x17, name: ["6"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(175, 540), size: new SVGSize(35, 25), key: 0x81, name: ["+"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(220, 540), size: new SVGSize(35, 25), key: 0x83, name: ["х"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },

    { origin: new SVGPoint( 40, 595), size: new SVGSize(35, 25), key: 0x12, name: ["1"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint( 85, 595), size: new SVGSize(35, 25), key: 0x13, name: ["2"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(130, 595), size: new SVGSize(35, 25), key: 0x14, name: ["3"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(175, 595), size: new SVGSize(35, 25), key: 0x85, name: ["↔"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(220, 595), size: new SVGSize(35, 25), key: 0x8a, name: ["B↑"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },

    { origin: new SVGPoint( 40, 650), size: new SVGSize(35, 25), key: 0x11, name: ["0"],   sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint( 85, 650), size: new SVGSize(35, 25), key: 0x86, name: ["."],   sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(130, 650), size: new SVGSize(35, 25), key: 0x87, name: ["/−/"], sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(175, 650), size: new SVGSize(35, 25), key: 0x88, name: ["ВП"],  sColor: "#000000", bColor: "rgb(200,200,200)", fColor: "rgb(0,0,0)" },
    { origin: new SVGPoint(220, 650), size: new SVGSize(35, 25), key: 0x89, name: ["Сх"],  sColor: "#000000", bColor: "rgb(220,80,60)", fColor: "rgb(255,255,255)" }
]

const labels = [
    { origin: new SVGPoint( 55, 295), text: "ЭЛЕКТРОНИКА", size: 16, color: "rgb(255,255,255)" },
    { origin: new SVGPoint(195, 295), text: "МК", size: 16, color: "rgb(255,255,255)" },
    { origin: new SVGPoint(230, 295), text: "61", size: 16, color: "rgb(255,255,255)" },
    { origin: new SVGPoint( 85, 335), text: "Вкл", size: 12, color: "rgb(255,255,255)" },
    { origin: new SVGPoint(190, 335), text: "Р", size: 12, color: "rgb(255,255,255)" },
    { origin: new SVGPoint(255, 335), text: "Г", size: 12, color: "rgb(255,255,255)" },
    { origin: new SVGPoint(215, 315), text: "ГРД", size: 12, color: "rgb(255,255,255)" },

    { origin: new SVGPoint( 92, 367), text: "x<0", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(137, 367), text: "x=0", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(180, 367), text: "x≥0", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(225, 367), text: "x≠0", size: 12, color: "rgb(230,230,50)" },

    { origin: new SVGPoint( 95, 422), text: "L0", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(140, 422), text: "L1", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(185, 422), text: "L2", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(230, 422), text: "L3", size: 12, color: "rgb(230,230,50)" },

    { origin: new SVGPoint( 40, 477), text: "sin", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint( 60, 477), text: "[x]", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint( 83, 477), text: "cos", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(107, 477), text: "{x}", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(130, 477), text: "tg",  size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(145, 477), text: "max", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(185, 477), text: "√",  size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(230, 477), text: "1/x",  size: 12, color: "rgb(230,230,50)" },

    { origin: new SVGPoint( 37, 532), text: "sin⁻¹", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint( 63, 532), text: "|x|", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint( 80, 532), text: "cos⁻¹", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(110, 532), text: "ЗН", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(130, 532), text: "tg⁻¹",  size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(155, 532), text: "° ′", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(180, 532), text: "π",  size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(200, 532), text: "°′", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(235, 532), text: "x²",  size: 12, color: "rgb(230,230,50)" },

    { origin: new SVGPoint( 50, 587), text: "eˣ", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint( 95, 587), text: "lg", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(130, 587), text: "ln", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(150, 587), text: "°′″", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(175, 587), text: "xʸ", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(195, 587), text: "°′″", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(220, 587), text: "Вx",  size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(240, 587), text: "Сч",  size: 12, color: "rgb(70,140,255)" },

    { origin: new SVGPoint( 35, 642), text: "10ˣ", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint( 55, 642), text: "НОП", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint( 90, 642), text: "⊙", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(110, 642), text: "⋀", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(130, 642), text: "АВТ", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(155, 642), text: "⋁", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(175, 642), text: "ПРГ", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(200, 642), text: "⊕", size: 12, color: "rgb(70,140,255)" },
    { origin: new SVGPoint(215, 642), text: "CF", size: 12, color: "rgb(230,230,50)" },
    { origin: new SVGPoint(235, 642), text: "ИНВ", size: 12, color: "rgb(70,140,255)" },

]

class SVGDigit {
    static dx = 8
    static dy = 10
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
        var upd = false
        if (data != this.#prev_data) {
            this.#prev_data = data
            var i
            for (i = 0; i < this.segments.length; ++i) {
                let segment = this.segments[i]
                if (data & (1 << segment.no))
                    segment.segment.setAttribute("style", "fill:#73FBDE;stroke:#73FBDE;stroke-width:2")
                else 
                    segment.segment.setAttribute("style", "fill:#2c2c2c;stroke:#2c2c2c;stroke-width:2")
            }
            upd = true
        }
        return upd
    }
}


class SVGDisplay {
    static size = 12
    constructor(doc) {
        this.disp = doc.createElementNS(svgNS, "g")
        var rect = doc.createElementNS(svgNS, "rect")
        rect.setAttribute("x", 25)
        rect.setAttribute("y", 90)
        rect.setAttribute("width",  250)
        rect.setAttribute("height", 60)
        rect.setAttribute("fill", "rgb(20,30,25)")
        this.disp.appendChild(rect)
        this.ranks = []
        var i
        for (i = 0; i < SVGDisplay.size; ++i) {
            var rank = new SVGDigit(doc, new SVGPoint(40 + 19*i, 105), false)
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
        var upd = false
        for (i = 0; i < sym.length; ++i) {
            upd |= this.ranks[i].setValue(sym[i])
        }
        return upd
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
        //this.txt.setAttribute("text-anchor", "middle")
        //this.txt.setAttribute("dominant-baseline", "central")
        this.txt.setAttribute("font-weight", "bold")
        this.txt.setAttribute("font-size", this.label.size)
        this.txt.setAttribute("pointer-events", "none")
        this.txt.appendChild(doc.createTextNode(this.label.text))
        //this.svg.appendChild(txt)
    }
    insertAt(parent) {
        parent.appendChild(this.txt)
    }
}

class SVGSwitch {
    constructor(doc, sw) {
        const width = 15
        const height = 10
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
        rect.setAttribute("rx", 3)
        rect.setAttribute("ry", 3)
        rect.setAttribute("width",  this.#button.size.width)
        rect.setAttribute("height", this.#button.size.height)
        rect.setAttribute("style", "stroke-width:1;stroke:" + this.#button.sColor)
        rect.setAttribute("fill", this.#button.bColor)
        this.svg.appendChild(rect)

        var i
        const size = 14
        const step = 10
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
    #core0
    #core1
    #core2
    #mem0
    #mem1
    #display
    constructor(doc) {
        
        var board = doc.createElementNS(svgNS, 'svg');
        board.setAttribute("width",  300);
        board.setAttribute("height", 700);

        var border = document.createElementNS(svgNS, 'rect');
        border.setAttribute("x", 2);
        border.setAttribute("y", 2);
        border.setAttribute("rx", 10);
        border.setAttribute("ry", 10);
        border.setAttribute("width",  296);
        border.setAttribute("height", 696);
        border.setAttribute("style", "fill:rgb(40,40,40);stroke:rgb(160,160,160);stroke-width:4");
        board.appendChild(border);

        var disp = doc.createElementNS(svgNS, 'rect');
        disp.setAttribute("x", 20);
        disp.setAttribute("y", 60);
        disp.setAttribute("width",  260);
        disp.setAttribute("height", 210);
        disp.setAttribute("style", "fill:rgb(35,60,45)");
        board.appendChild(disp);

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

        this.#mem0 = new K145IR2()
        this.#mem1 = new K145IR2()

        this.#core0 = new Core(0, "K145IK1302", this.#log, COMMANDS_IK1302, SPROGS_IK1302, UCMDS_IK1302, SEGMENTS_IK1302, MNEMONICS_IK1302, COMMENTS_IK1302)
        //this.#core0.list()
        this.#core1 = new Core(1, "K145IK1303", this.#log, COMMANDS_IK1303, SPROGS_IK1303, UCMDS_IK1303, SEGMENTS_IK1303, MNEMONICS_IK1303, COMMENTS_IK1303)
        //this.#core1.list()
        this.#core2 = new Core(2, "K145IK1306", this.#log, COMMANDS_IK1306, SPROGS_IK1306, UCMDS_IK1306, SEGMENTS_IK1306, MNEMONICS_IK1306, COMMENTS_IK1306)
        //this.#core2.list()

        doc.body.appendChild(board)
    }

    update(key, mode) {
        this.#mem0.step()
        this.#mem1.step()

        this.#core0.step(key, [])
        this.#core1.step(0, [mode])
        this.#core2.step(0, [])

        var m = this.#core2.D
        this.#core2.D = this.#core1.D
        this.#core1.D = this.#core0.D
        this.#core0.D = this.#mem1.D
        this.#mem1.D = this.#mem0.D
        this.#mem0.D = m

        const upd = this.#display.setValues(this.#core0.Display)
        this.#log.output()
        return upd
    }

    trace(ena) {
        if (this.#log.enable != ena) {
            if (ena) {
                this.#mem0.reset()
                this.#mem1.reset()
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
var mode = switches[1].modes[0]
var count = 0

function buttonDown(event) {
    key = event.target.parentElement.id
    //count = 7
    event.preventDefault()
}

function buttonUp(event) {
    key = 0
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
    if (fields[0] == "rgd") mode = parseInt(fields[1])
    event.preventDefault()
}

function switchUp(event) {
    event.preventDefault()
}

window.onload = function() {
    trace = document.getElementById('trace-info')
    calc = new Calculator(document)

    calc.trace(true)

    //setInterval(onCoreStep, 1)
    setTimeout(onCoreStep, 10)
}

function onCoreStep() {
    const trace = document.getElementById('trace-info')
    calc.trace(trace.checked)

    var i
    for (i = 0; i < 25; ++i) {
        if (calc.update(key, mode)) break;
        //if (count > 0) --count
        //else key = 0
    }
    setTimeout(onCoreStep, 1)
}
