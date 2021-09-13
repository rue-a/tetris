class Row {
    constructor(col_count) {
        this.filled = false;
        this.row = new Array(col_count).fill(0);
    }

    getRow() {
        return this.row;
    }

    getCell(index) {
        return this.row[index];
    }

    setCell(index, value) {
        this.row[index] = value;
    }

    check() {
        // return false if at least one cell holds a '0'
        // else return true
        // 0 evals to false, every number != 0 evals to true
        for (let cell of this.row) {
            if (!cell) {
                return false;
            }
        }
        return true;
    }
}