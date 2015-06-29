var Cell = require("<scripts>/classes/Cell")

var GameStore = require("<scripts>/stores/GameStore")
var GameLevels = require("<scripts>/data/GameLevels")

var CellStore = Phlux.createStore({
    initiateStore: function() {
        var level = GameLevels["original"]
        
        for(var y = 0; y < level.length; y++) {
            for(var x = 0; x < level[0].length; x++) {
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
    getCutoffCells: function(player) {
        var cells = new Array()
        var grid = new Pather.Grid(5, 5)
        var pather = new Pather.AStarFinder()
        for(var x = 0; x < grid.width; x++) {
            for(var y = 0; y < grid.height; y++) {
                var cell = this.data[x + "x" + y]
                if(cell.player == player
                || cell.player == undefined) {
                    grid.setWalkableAt(x, y, false)
                }
            }
        }
        for(var key in this.data) {
            var cell = this.data[key]
            if(cell.player != player
            && cell.player != undefined) {
                var king = {
                    "x": player.name != "P2" ? 4 : 0,
                    "y": player.name != "P1" ? 4 : 0
                }
                var path = pather.findPath(cell.x, cell.y,
                    king.x, king.y, grid.clone())
                if(path.length == 0) {
                    cells.push(cell)
                }
            }
        }
        return cells
    }
})

module.exports = CellStore
