((state, timeLeftFn) => {
    var persist = basePersist(state);
    const turnDirections = ['right', 'left', 'about-face'];
    const turnDirection = turnDirections[Math.floor(Math.random() * 3)];

    const smokeDirections = ['forward', 'backward', 'left', 'right', 'drop'];
    const smokeDirection = smokeDirections[Math.floor(Math.random() * 5)];

    const index = Math.floor(Math.random() * 17);
    const command = index < 10 ?
        { action: 'move', metadata: {} } :
        index < 12 ?
            { action: 'turn', metadata: { direction: turnDirection } } :
            index < 16 ?
                { action: 'shoot', metadata: {} } :
                { action: 'smoke', metadata: { direction: smokeDirection } };

    return {
        command,
        state: persist
    };
});

/***** BASE CODE ******/

var basePersist = (state) => {
    var persist = state["saved-state"];
    state["saved-state"] = null;
    if (persist == null) persist = {};
    persist.arena = prettyArena(state.arena);
    persist.myself = getMyState(state.arena);
    persist.faceX = faceX(persist.myself.contents.orientation);
    persist.faceY = faceY(persist.myself.contents.orientation);
    return persist;
}

var faceX = (orientation) => {
    if (orientation == "w") return -1;
    if (orientation == "e") return 1;
    return 0;
}

var faceY = (orientation) => {
    if (orientation == "n") return -1;
    if (orientation == "s") return 1;
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