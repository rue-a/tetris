class TetrisI extends TetrisStone {
    constructor(width, height, res, margin) {
        super(width, height, res, margin);
        this.color = 'yellow';
        const state_one = [[0, -2], [0, 1], [0, 1], [0, 1]];
        const state_two = [[-1, 0], [1, 0], [1, 0], [1, 0]];
        const state_three = [[0, -1], [0, 1], [0, 1], [0, 1]];
        const state_four = [[-2, 0], [1, 0], [1, 0], [1, 0]]
        this.states = [state_one, state_two];
        // this.state = 0;
        this.state = Math.floor(Math.random() * 2);
    }
}