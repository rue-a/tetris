class TetrisArray {
    constructor(width, height, res, margin) {
        this.width = width;
        this.height = height;
        this.res = res;
        this.margin = margin;
        this.col_count = (width - 2 * margin) / res;
        this.row_count = (height - 2 * margin) / res;
        this.rows = []
        for (let i = 0; i < this.row_count; i++) {
            this.rows.push(new TetrisRow(this.col_count))
        }
    }

    getRow(index) {
        return this.rows[index];
    }

    update() {
        for (let i in this.rows) {
            let row = this.rows[i];
            if (row.check()) {
                this.rows.splice(i, 1)
                this.rows.unshift(new TetrisRow(this.col_count))
            }
        }
    }

    checkEligibility(positions) {
        for (let pos of positions) {
            if (pos[1] >= 0 && pos[1] < this.row_count) {
                if (this.getRow(pos[1]).getCol(pos[0])) {
                    return false;
                }
            }
            if (pos[0] < 0 || pos[0] >= this.col_count) {
                return false;
            }
            if (pos[1] >= this.row_count) {
                return false;
            }

        }
        return true;
    }

    show() {
        push();
        noStroke();
        // fix first translate
        translate(this.col_count * this.res - this.res, -this.res);
        translate(this.margin, this.margin);

        for (let row of this.rows) {
            translate(-this.col_count * this.res, 0);
            translate(0, this.res);
            for (let cell of row.getRow()) {
                translate(this.res, 0);
                if (!cell) {
                    fill(50)
                }
                else {
                    fill(cell);
                }
                rect(0, 0, this.res, this.res);
            }
        }
        pop();
    }
}