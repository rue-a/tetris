class TetrisS extends TetrisStone {
    constructor(width, height, res, margin) {
        super(width, height, res, margin);
        this.color = 'lightcoral';
        const state_one = [[-1, 1], [1, 0], [0, -1], [1, 0]];
        const state_two = [[-1, -1], [0, 1], [1, 0], [0, 1]];
        this.states = [state_one, state_two];
        this.state = Math.floor(Math.random() * 2);
        // this.state = 0
    }
}