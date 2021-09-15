class TetrisJ extends TetrisStone {
    constructor(width, height, res, margin) {
        super(width, height, res, margin);
        this.color = 'lightgreen';
        const state_one = [[0, -1], [0, 1], [0, 1], [-1, 0]];
        const state_two = [[-1, 0], [0, 1], [1, 0], [1, 0]];
        const state_three = [[-1, 1], [0, -1], [0, -1], [1, 0]];
        const state_four = [[-2, 0], [1, 0], [1, 0], [0, 1]];
        this.states = [state_one, state_two, state_three, state_four];
        this.state = Math.floor(Math.random() * 4);
        // this.state = 0
    }
}