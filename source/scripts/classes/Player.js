var GameStore = require("<scripts>/stores/GameStore")
var GameColors = require("<scripts>/data/GameColors")

var Player = function(_id) {
    this.name = "P" + (_id + 1)
    this.colors = GameColors[this.name]
    this.claims = 2
}

Player.prototype.canClaim = function(cell) {
    return true
}

Player.prototype.claim = function(cell) {
    cell.isClaimed = true
    
    this.claims -= 1
    if(this.claims <= 0) {
        this.claims = 2
        GameStore.togglePlayer()
    }
    this.trigger()
}

module.exports = Player
