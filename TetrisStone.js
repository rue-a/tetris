class TetrisStone {
    constructor(width, height, res, margin, array) {
        this.width = width;
        this.height = height;
        this.res = res;
        this.margin = margin;
        this.array = array;
        this.col = int(((width - 2 * margin) / res) / 2);
        this.row = 4;
        this.color = 'white';
    }

    rotate() {
        this.state += 1;
        if (this.state > this.states.length - 1) {
            this.state = 0;
        }
    }
    show() {
        push();
        noStroke();
        translate(this.col * this.res + this.margin, this.row * this.res + this.margin)

        console.log(this.state)
        for (let pos of this.states[this.state]) {
            fill(this.color);
            translate(pos[0] * this.res, pos[1] * this.res);
            rect(0, 0, this.res, this.res);
        }
        pop();
    }
}