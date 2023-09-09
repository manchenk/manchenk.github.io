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

const svgNS = 'http://www.w3.org/2000/svg';

class SVGPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const buttons = [
    { origin: new SVGPoint(310, 300), name: "С", key: 0x2B, bColor: "#ff0000", fColor: "#ffffff" },

    { origin: new SVGPoint( 30, 375), name: "7", key: 0x18, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(100, 375), name: "8", key: 0x19, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(170, 375), name: "9", key: 0x1A, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(240, 375), name: "÷", key: 0x27, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(310, 375), name: "√", key: 0x24, bColor: "#000000", fColor: "#ffffff" },

    { origin: new SVGPoint( 30, 450), name: "4", key: 0x15, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(100, 450), name: "5", key: 0x16, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(170, 450), name: "6", key: 0x17, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(240, 450), name: "х", key: 0x28, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(310, 450), name: "%", key: 0x22, bColor: "#000000", fColor: "#ffffff" },

    { origin: new SVGPoint( 30, 525), name: "1",   key: 0x12, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(100, 525), name: "2",   key: 0x13, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(170, 525), name: "3",   key: 0x14, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(240, 525), name: "‒",   key: 0x26, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(310, 525), name: "1/x", key: 0x23, bColor: "#000000", fColor: "#ffffff" },

    { origin: new SVGPoint( 30, 600), name: "0",  key: 0x11, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(100, 600), name: ".",  key: 0x29, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(170, 600), name: "СК", key: 0x2A, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(240, 600), name: "+",  key: 0x25, bColor: "#000000", fColor: "#ffffff" },
    { origin: new SVGPoint(310, 600), name: "=",  key: 0x21, bColor: "#000000", fColor: "#ffffff" }
];

const labels = [
    { origin: new SVGPoint( 45, 255), text: "ЭЛЕКТРОНИКА", size: 32, color: "rgb(255,255,255)" }
];

class Nibble {
    constructor(val) {
        this.value = val & 0x0f;
    }
    bit(n) {
        return (this.value & (1 << (n & 7))) != 0;
    }
}


class SVGDigit {
    static dx = 10;
    static dy = 12;
    static sq = -2;
    static pt = 3;
    static segments = [
        { beg: new SVGPoint(0, 0), end: new SVGPoint(SVGDigit.dx, 0) },
        { beg: new SVGPoint(SVGDigit.dx, 0), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { beg: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+2*SVGDigit.sq, 2*SVGDigit.dy) },
        { beg: new SVGPoint(SVGDigit.dx+2*SVGDigit.sq, 2*SVGDigit.dy), end: new SVGPoint(2*SVGDigit.sq,2*SVGDigit.dy) },
        { beg: new SVGPoint(2*SVGDigit.sq, 2*SVGDigit.dy), end: new SVGPoint(SVGDigit.sq, SVGDigit.dy) },
        { beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(0, 0) },
        { beg: new SVGPoint(SVGDigit.sq, SVGDigit.dy), end: new SVGPoint(SVGDigit.dx+SVGDigit.sq, SVGDigit.dy) },
        { beg: new SVGPoint(SVGDigit.dx/2+SVGDigit.sq, 1.5*SVGDigit.dy), end: new SVGPoint(SVGDigit.dx/2+SVGDigit.sq, 1.5*SVGDigit.dy+SVGDigit.pt) },
    ];
    constructor(doc, point) {
        this.point = point;
        this.segments = [];
        var i;
        for (i = 0; i < SVGDigit.segments.length; ++i) {
            var segment = doc.createElementNS(svgNS, "line");
            segment.setAttributeNS(null, "x1", this.point.x + SVGDigit.segments[i].beg.x);
            segment.setAttributeNS(null, "y1", this.point.y + SVGDigit.segments[i].beg.y);
            segment.setAttributeNS(null, "x2", this.point.x + SVGDigit.segments[i].end.x);
            segment.setAttributeNS(null, "y2", this.point.y + SVGDigit.segments[i].end.y);

            this.segments[i] = segment;
        }
    }
    insertAt(parent) {
        var i;
        for (i = 0; i < SVGDigit.segments.length; ++i) {
            parent.appendChild(this.segments[i]);
        }
    }
    setValue(rank) {
        //const segs = [ 0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f, 0x40, 0x38, 0x39, 0x31, 0x38, 0x00 ];
        const segs = [ 0x3f, 0x06, 0x5b, 0x4f, 0x66, 0x6d, 0x7d, 0x07, 0x7f, 0x6f, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00 ];
        var data = segs[rank.nibble.value] | (rank.comma ? 0x80 : 0);
        var i;
        for (i = 0; i < SVGDigit.segments.length; ++i) {
            if (data & (1 << i))
                this.segments[i].setAttributeNS(null, "style", "stroke:#73FBDE;stroke-width:2");
            else 
                this.segments[i].setAttributeNS(null, "style", "stroke:rgb(60,60,60);stroke-width:2");
        }
    }
}


class SVGDisplay {
    static size = 9;
    constructor(doc) {
        this.disp = doc.createElementNS(svgNS, "g");
        var rect = doc.createElementNS(svgNS, "rect");
        rect.setAttributeNS(null, "x", 60);
        rect.setAttributeNS(null, "y", 90);
        rect.setAttributeNS(null, "width",  278);
        rect.setAttributeNS(null, "height", 60);
        rect.setAttributeNS(null, "fill", "rgb(20,30,25)");
        this.disp.appendChild(rect);
        this.ranks = [];
        var i;
        for (i = 0; i < SVGDisplay.size; ++i) {
            var rank = new SVGDigit(doc, new SVGPoint(95 + 25*i, 105));
            rank.insertAt(this.disp);
            this.ranks[i] = rank;
        }
    }
    setValues(data) {
        var i;
        for (i = 0; i < SVGDisplay.size; ++i) {
            this.ranks[i].setValue(i < data.length ? data[i] : { nibble: new Nibble(15), comma: false });
        }

    }
    insertAt(parent) {
        parent.appendChild(this.disp);
    }
}

class SVGLabel {
    constructor(doc, label) {
        this.label = label;
        this.txt = doc.createElementNS(svgNS, "text");
        this.txt.setAttributeNS(null, "x", this.label.origin.x);
        this.txt.setAttributeNS(null, "y", this.label.origin.y);
        this.txt.setAttributeNS(null, "fill", this.label.color);
        this.txt.setAttributeNS(null, "font-family", "Arial");
        //this.txt.setAttributeNS(null, "text-anchor", "middle");
        //this.txt.setAttributeNS(null, "dominant-baseline", "central");
        this.txt.setAttributeNS(null, "font-weight", "bold");
        this.txt.setAttributeNS(null, "font-size", this.label.size);
        this.txt.setAttribute("pointer-events", "none");
        this.txt.appendChild(doc.createTextNode(this.label.text));
        //this.svg.appendChild(txt);
    }
    insertAt(parent) {
        parent.appendChild(this.txt);
    }
}

class SVGButton {
    constructor(doc, button) {
        const width = 55;
        const height = 35;
        this.button = button;
        this.svg = doc.createElementNS(svgNS, 'g');
        this.svg.setAttributeNS(null, "cursor", "pointer");
        this.svg.setAttributeNS(null, "id", this.button.key);
        this.svg.addEventListener("mousedown", buttonDown, false);
        this.svg.addEventListener("mouseup", buttonUp, false);

        var rect = doc.createElementNS(svgNS, 'rect');
        rect.setAttributeNS(null, "x", this.button.origin.x);
        rect.setAttributeNS(null, "y", this.button.origin.y);
        rect.setAttributeNS(null, "width",  width);
        rect.setAttributeNS(null, "height", height);
        rect.setAttributeNS(null, "fill", this.button.bColor);
        this.svg.appendChild(rect);

        var txt = doc.createElementNS(svgNS, "text");
        txt.setAttributeNS(null, "x", this.button.origin.x + width/2);
        txt.setAttributeNS(null, "y", this.button.origin.y + height/2);
        txt.setAttributeNS(null, "fill", this.button.fColor);
        txt.setAttributeNS(null, "font-family", "Arial");
        txt.setAttributeNS(null, "text-anchor", "middle");
        txt.setAttributeNS(null, "dominant-baseline", "central");
        txt.setAttributeNS(null, "font-weight", "bold");
        txt.setAttributeNS(null, "font-size", 24);
        txt.setAttribute("pointer-events", "none");
        txt.appendChild(doc.createTextNode(this.button.name));
        this.svg.appendChild(txt);
    }
    insertAt(parent) {
        parent.appendChild(this.svg);
    }
}

class Calculator {
    constructor(doc) {
        this.document = doc;
        this.board = this.document.createElementNS(svgNS, 'svg');
        this.board.setAttributeNS(null, "width",  400);
        this.board.setAttributeNS(null, "height", 670);
//        this.board.setAttributeNS(null, "style", "background-color:#a8e0f0");

        var border = this.document.createElementNS(svgNS, 'rect');
        border.setAttributeNS(null, "x", 2);
        border.setAttributeNS(null, "y", 2);
        border.setAttributeNS(null, "width",  396);
        border.setAttributeNS(null, "height", 666);
        border.setAttributeNS(null, "style", "fill:#a8e0f0;stroke:#cdfafa;stroke-width:4");
        this.board.appendChild(border);


        var disp = this.document.createElementNS(svgNS, 'rect');
        disp.setAttributeNS(null, "x", 10);
        disp.setAttributeNS(null, "y", 35);
        disp.setAttributeNS(null, "width",  380);
        disp.setAttributeNS(null, "height", 185);
        disp.setAttributeNS(null, "style", "fill:rgb(35,60,45)");
        this.board.appendChild(disp);

        var kbd = this.document.createElementNS(svgNS, 'rect');
        kbd.setAttributeNS(null, "x", 10);
        kbd.setAttributeNS(null, "y", 265);
        kbd.setAttributeNS(null, "width",  380);
        kbd.setAttributeNS(null, "height", 390);
        kbd.setAttributeNS(null, "style", "fill:#7fbdcd");
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

        //this.displayData = [];
        //for (i = 0; i < 12; ++i) {
        //    this.displayData[i] = { nibble: new Nibble(15), comma: false };
        //}

    }

    update(core) {
        this.display.setValues(core.getDisplay());
    }

    show() {
        this.document.body.appendChild(this.board);
    }
}


var core = null;
var calc = null;
var key = 0;

function buttonDown(event) {
    key = event.target.parentElement.id;
    event.preventDefault();
}

function buttonUp(event) {
    key = 0;
    event.preventDefault();
}

window.onload = function() {
    calc = new Calculator(document);
    calc.show();

    core = new Core(COMMANDS, SPROGS, UCMDS, MNEMONICS);
    core.list();

    setTimeout(onCoreStep, 1);
};

function onCoreStep() {
    core.step(key);
    calc.update(core);

    setTimeout(onCoreStep, 1);
}
