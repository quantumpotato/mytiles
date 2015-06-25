var GameStore = require("<scripts>/stores/GameStore")

var Player = function(_id) {
    this.name = "P" + _id
    this.claims = 2
    if(_id == 0) {
        this.color = "#C00"
        this.hovercolor = "#800"
    } else if(_id == 1) {
        this.color = "#00C"
        this.hovercolor = "#008"
    }
}

Player.prototype.decreaseClaims = function() {
    this.claims -= 1
    if(this.claims <= 0) {
        this.claims = 2
        GameStore.togglePlayer()
        this.trigger()
    }
}

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