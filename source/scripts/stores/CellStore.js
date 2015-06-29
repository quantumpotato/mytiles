var Cell = require("<scripts>/classes/Cell")

var GameStore = require("<scripts>/stores/GameStore")
var GameLevels = require("<scripts>/data/GameLevels")

var CellStore = Phlux.createStore({
    initiateStore: function() {
        var level = GameLevels["original"]
        for(var y = 0; y < level.length; y++) {
            for(var x = 0; x < level[y].length; x++) {
                this.data[x + "x" + y] = new Cell({
                    "value": level[y][x],
                    "store": this,
                    "x": x, "y": y
                })
            }
        }
    },
    getCell: function(x, y) {
        return this.data[x + "x" + y]
    },
    getCells: function() {
        return this.data
    },
    getPatherGrid: function(player) {
        var grid = new Pather.Grid(5, 5)
        for(var x = 0; x < grid.width; x++) {
            for(var y = 0; y < grid.height; y++) {
                var cell = this.getCell(x, y)
                if(cell.player == player
                || cell.player == undefined) {
                    grid.setWalkableAt(x, y, false)
                }
            }
        }
        return grid
    }
})

module.exports = CellStore
