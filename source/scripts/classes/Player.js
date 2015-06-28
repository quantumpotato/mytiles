var GameStore = require("<scripts>/stores/GameStore")

var Player = function(protoplayer) {
    this.name = protoplayer.name
    this.colors = protoplayer.colors
    
    if(!!protoplayer.store) {
        this.store = protoplayer.store
    }
    
    this.claims = 2
}

Player.prototype.canClaim = function(cell) {
    if(cell.player == this) {
        return false
    }
    
    var cells = cell.getNeighborCells()
    for(var index in cells) {
        if(cells[index].player == this) {
            return true
        }
    }
    
    return false
}

Player.prototype.claim = function(cell) {
    cell.player = this
    
    if(!!cell.kingplayer) {
        GameStore.declareWinningPlayer(this)
        cell.store.initiateStore() //should not go here
    }
    
    this.claims -= 1
    if(this.claims <= 0) {
        this.claims = 2
        GameStore.togglePlayer()
    }
    
    this.store.trigger()
}

module.exports = Player
