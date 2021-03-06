((state, timeLeftFn) => {
    baseBot(state);

    const command = randomCommand();

    return {
        command,
        state: persist
    };
});

/***** BASE CODE ******/

const turnDirections = ['right', 'left', 'about-face'];
const smokeDirections = ['forward', 'backward', 'left', 'right', 'drop'];
const NORTH = "n", SOUTH = "s", EAST = "e", WEST = "w";
const MOVE = "move", TURN = "turn", SHOOT = "shoot", SMOKE = "smoke";

var persist;
var faceX, faceY;
var arena;

var baseBot = (state) => {
    persist = state["saved-state"];
    if (persist == null) persist = {};
    arena = state.arena;
    persist.arena = prettyArena(arena);
    persist.myself = getMyState(arena);
    faceX = faceX(persist.myself.contents.orientation);
    faceY = faceY(persist.myself.contents.orientation);
}

var randomCommand = () => {
    const turnDirection = turnDirections[Math.floor(Math.random() * 3)];
    const smokeDirection = smokeDirections[Math.floor(Math.random() * 5)];
    const index = Math.floor(Math.random() * 17);
    const command = index < 10 ?
        { action: MOVE, metadata: {} } :
        index < 12 ?
            { action: TURN, metadata: { direction: turnDirection } } :
            index < 16 ?
                { action: SHOOT, metadata: {} } :
                { action: SMOKE, metadata: { direction: smokeDirection } };
    return command;
}

var faceX = (orientation) => {
    if (orientation == WEST) return -1;
    if (orientation == EAST) return 1;
    return 0;
}

var faceY = (orientation) => {
    if (orientation == NORTH) return -1;
    if (orientation == SOUTH) return 1;
    return 0;
}

var getMyState = (grid) => {
    var row = Math.floor(grid.length / 2);
    var col = Math.floor(grid[row].length / 2);
    return grid[row][col];
}

var prettyArena = (grid) => {
    var rows = [];
    for (var i = 0; i < grid.length; i++) {
        rows[i] = "|";
        for (var j = 0; j < grid[i].length; j++) {
            rows[i] += wrapWhiteSpace(grid[i][j].contents.type) + "|";
        }
    }
    return rows;
}

var wrapWhiteSpace = (s) => {
    if (s == null) s = "";
    if (s.length % 2 > 0) s += " ";
    while (s.length < 12) {
        s = " " + s + " ";
    }
    return s;
}

