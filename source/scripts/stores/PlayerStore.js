var Player = require("<scripts>/classes/Player")

var GameStore = require("<scripts>/stores/GameStore")
var GameColors = require("<scripts>/data/GameColors")

var PlayerStore = Phlux.createStore({
    initiateStore: function() {
        for(var index = 0; index <= 1; index++) {
            this.data[index] = new Player({
                "colors": GameColors[index + 1],
                "name": "P" + (index + 1),
                "store": this
            })
        }
    },
    getPlayer: function(_id) {
        return this.data[_id]
    },
    getCurrentPlayer: function() {
        return this.data[GameStore.getCurrentPlayer()]
    }
})

module.exports = PlayerStore