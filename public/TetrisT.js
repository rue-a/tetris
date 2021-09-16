class TetrisT extends TetrisStone {
    constructor(width, height, res, margin) {
        super(width, height, res, margin);
        this.color = 'violet';
        const state_one = [[0, -1], [0, 1], [-1, 0], [2, 0]];
        const state_two = [[0, -1], [0, 1], [0, 1], [1, -1]];
        const state_three = [[-1, 0], [1, 0], [1, 0], [-1, 1]];
        const state_four = [[-1, 0], [1, 0], [0, 1], [0, -2]];
        this.states = [state_one, state_two, state_three, state_four];
        this.state = Math.floor(Math.random() * 4);
        // this.state = 0
    }
}