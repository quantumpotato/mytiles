var GameColors = require("<scripts>/data/GameColors")
var PlayerStore = require("<scripts>/stores/PlayerStore")

var CELL_PADDING = 0.2
var CELL_ROUNDING = 0.05

var Cell = function(x, y) {
    this.position = {
        "x": x, "y": y
    }
    this._id = x + "x" + y
    if(x == 1 && y == 1
    || x == 2 && y == 2
    || x == 3 && y == 3) {
        this.isTrenches = true
        this.isUnwallable = true
    }
    if(x == 0 && y == 4) {
        this.isKing = true
        this.isClaimed = true
        this.isUnwallable = true
        this.player = PlayerStore.getPlayer(0)
    } else if(x == 4 && y == 0) {
        this.isKing = true
        this.isClaimed = true
        this.isUnwallable = true
        this.player = PlayerStore.getPlayer(1)
    }
}

Cell.prototype.onClick = function() {
    this.player = PlayerStore.getCurrentPlayer()
    if(this.player.canClaim(this)) {
        this.player.claim(this)
    }
}

Cell.prototype.onMouseOver = function() {
    this.isHovered = true
    this.store.trigger()
}

Cell.prototype.onMouseOut = function() {
    this.isHovered = false
    this.store.trigger()
}

Cell.prototype.renderStyle = function() {
    var current_player = PlayerStore.getCurrentPlayer()
    var cursor = "auto"
    var color = GameColors["-1"]
    if(this.isHovered && this.player != current_player) {
        color = current_player.colors.dark
        cursor = "pointer"
    } else if(this.isClaimed) {
        color = this.player.colors.light
    }
    
    return {
        position: "absolute",
        width: 1 - CELL_PADDING + "em",
        height: 1 - CELL_PADDING + "em",
        borderRadius: CELL_ROUNDING + "em",
        top: this.position.y + (CELL_PADDING / 2) + "em",
        left: this.position.x + (CELL_PADDING / 2) + "em",
        border: this.isTrenches ? "0.1em dashed #EEE" : null,
        backgroundImage: this.isKing ? "url(assets/images/king.png)" : null,
        backgroundSize: "75%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: color,
        cursor: cursor,
    }
}

Cell.prototype.getNeighborCells = function() {
    var x = this.position.x
    var y = this.position.y
    var cells = []
    if(this.store.data[x + "x" + (y - 1)]) {
        cells.push(this.store.data[(x-1) + "x" + y])
    } if(this.store.data[x + "x" + (y + 1)]) {
        cells.push(this.store.data[(x-1) + "x" + y])
    } if(this.store.data[(x - 1) + "x" + y]) {
        cells.push(this.store.data[(x-1) + "x" + y])
    } if(this.store.data[(x + 1) + "x" + y]) {
        cells.push(this.store.data[(x-1) + "x" + y])
    }
    return cells
}

module.exports = Cell
