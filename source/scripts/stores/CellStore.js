var Cell = require("<scripts>/classes/Cell")

// Cells Legend:
// . = Empty Cell
// A = Player One King
// B = Player Two King
// a = Player One Cell
// b = Player Two Cell
// X = Unwallable Cell

var cells = [
    "...bB",
    ".X..b",
    "..X..",
    "a..X.",
    "Aa...",
]

var CellStore = Phlux.createStore({
    initiateStore: function() {
        for(var y = 0; y < cells.length; y++) {
            for(var x = 0; x < cells[y].length; x++) {
                this.data[x + "x" + y] = new Cell({
                    "value": cells[y][x],
                    "store": this,
                    "x": x, "y": y
                })
            }
        }
    }
})

module.exports = CellStore
