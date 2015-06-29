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
    }
})

module.exports = CellStore
