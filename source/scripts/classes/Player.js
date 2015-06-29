var GameStore = require("<scripts>/stores/GameStore")

/*new Player({
    // name <String>
    // Should be no more than three
    // characters. Defaults to "%&$".
    "name": "red",
    // colors <Object>
    // Should include both lighter and
    // darker shades of a color. Can be
    // formatted as rgb or hex. Defaults
    // to dark gray and light gray.
    "colors": {
        "light": "#C00",
        "dark": "#800"
    },
    // store <PhluxStore>
    // Optional. Will trigger the store
    // whenever the data has changed.
    "store": this
})*/

var Player = function(protoplayer) {
    this.name = protoplayer.name.substring(0, 3) || "%&$"
    
    this.colors = protoplayer.colors || {
        "light": "#444",
        "dark": "#222"
    }
    
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
    
    // this code is for checking for
    // being cut off. it's very hacky
    // because it's all hardcoded.
    var cells = cell.store.getCells()
    for(var key in cells) {
        var cell = cells[key]
        if(cell.player != this
        && cell.player != undefined) {
            var cx = cell.x
            var cy = cell.y
            var kx = this.name != "P2" ? 4 : 0
            var ky = this.name != "P1" ? 4 : 0
            var pather = new Pather.AStarFinder()
            var grid = cell.store.getPatherGrid(this)
            var path = pather.findPath(cx, cy, kx, ky, grid)
            if(path.length == 0) {
                cell.player = this
            }
        }
    }
    
    
    
    if(!!this.store) {
        this.store.trigger()
    }
}

module.exports = Player
