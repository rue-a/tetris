// 'abstract' class
class TetrisStone {
    constructor(width, height, res, margin) {
        this.width = width;
        this.height = height;
        this.res = res;
        this.margin = margin;
        this.col = int(((width - 2 * margin) / res) / 2);
        this.row = 0;
        // this.state = null;
        // this.states = null;
        // this.color = null;
    }

    getPositions(state = this.states[this.state]) {
        const one = [this.col + state[0][0], this.row + state[0][1]];
        const two = [one[0] + state[1][0], one[1] + state[1][1]];
        const three = [two[0] + state[2][0], two[1] + state[2][1]];
        const four = [three[0] + state[3][0], three[1] + state[3][1]];
        return [one, two, three, four];
    }

    incrementRow() {
        this.row += 1;
    }

    incrementCol() {
        this.col += 1;
    }

    decrementCol() {
        this.col -= 1;
    }

    getColor() {
        return this.color;
    }


    getNextPositions(direction = 'down') {
        const nextPositions = [];
        if (direction == 'rotate') {
            let state = this.state + 1;
            if (state > this.states.length - 1) {
                state = 0;
            }
            for (let pos of this.getPositions(this.states[state])) {
                nextPositions.push([pos[0], pos[1]])
            }
            return nextPositions;
        }

        for (let pos of this.getPositions()) {
            if (direction == 'left') {
                nextPositions.push([pos[0] - 1, pos[1]])
            }
            if (direction == 'right') {
                nextPositions.push([pos[0] + 1, pos[1]])
            }
            if (direction == 'down') {
                nextPositions.push([pos[0], pos[1] + 1])
            }
        }
        return nextPositions;

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

        for (let pos of this.states[this.state]) {
            fill(this.color);
            translate(pos[0] * this.res, pos[1] * this.res);
            rect(0, 0, this.res, this.res);
        }
        pop();
    }
}