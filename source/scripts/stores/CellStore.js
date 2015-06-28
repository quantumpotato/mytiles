var Cell = require("<scripts>/classes/Cell")

// Legend:
// . = Empty Square
// 1 = Player One King
// 2 = Player Two King
// X = Unwallable Square
var cells = [
    "....2",
    ".X...",
    "..X..",
    "...X.",
    "1....",
]

var CellStore = Phlux.createStore({
    initiateStore: function() {
        for(var y = 0; y < cells.length; y++) {
            for(var x = 0; x < cells[y].length; x++) {
                this.data[x + "x" + y] = new Cell({
                    "x": x, "y": y,
                    "value": cells[y][x],
                    "store": this,
                })
            }
        }
    }
})

module.exports = CellStore
