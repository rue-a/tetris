class I {
    constructor(width, height, res, margin, array) {
        this.width = width;
        this.height = height;
        this.res = res;
        this.margin = margin;
        this.array = array;
        this.color = 'yellow';
        const state_three = [[0, -1], [0, 1], [0, 1], [0, 1]];
        const state_two = [[-1, 0], [1, 0], [1, 0], [1, 0]];
        const state_one = [[0, -2], [0, 1], [0, 1], [0, 1]];
        const state_four = [[-2, 0], [1, 0], [1, 0], [1, 0]]
        this.states = [state_one, state_two, state_three, state_four];
        this.state = 0;
        this.col = int(((width - 2 * margin) / res) / 2);
        this.row = 4;
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
            fill(255, 0, 0, 50);
            translate(pos[0] * this.res, pos[1] * this.res);
            rect(0, 0, this.res, this.res);
        }
        pop();
    }
}