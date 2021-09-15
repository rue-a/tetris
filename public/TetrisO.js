class TetrisO extends TetrisStone {
    constructor(width, height, res, margin) {
        super(width, height, res, margin);
        this.color = 'cornsilk';
        const state_one = [[-1, -1], [1, 0], [0, 1], [-1, 0]];
        this.states = [state_one];
        this.state = 0
    }
}