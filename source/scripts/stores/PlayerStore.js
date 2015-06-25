var GameStore = require("<scripts>/stores/GameStore")
var Player = require("<scripts>/classes/Player")

var PlayerStore = Phlux.createStore({
    initiateStore: function() {
        for(var index = 0; index <= 1; index++) {
            this.data[index] = new Player(index)
            this.data[index].trigger = this.trigger.bind(this)
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