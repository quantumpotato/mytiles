var GameColors = require("<scripts>/data/GameColors")
var PlayerStore = require("<scripts>/stores/PlayerStore")

var CELL_PADDING = 0.2
var CELL_ROUNDING = 0.05

var Cell = function(protocell) {
    this.x = protocell.x || 0
    this.y = protocell.y || 0
    
    if(protocell.store != undefined) {
        this.store = protocell.store
    }
    
    if(protocell.value == "X") {
        this.isUnwallable = true
        this.isTrenches = true
    } else if(protocell.value == "1") {
        this.player = PlayerStore.getPlayer(0)
        this.isUnwallable = true
        this.isClaimed = true
        this.isKing = true
    } else if(protocell.value == "2") {
        this.player = PlayerStore.getPlayer(1)
        this.isUnwallable = true
        this.isClaimed = true
        this.isKing = true
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
        top: this.y + (CELL_PADDING / 2) + "em",
        left: this.x + (CELL_PADDING / 2) + "em",
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
    var cells = []
    if(this.store.data[this.x + "x" + (this.y - 1)]) {
        cells.push(this.store.data[this.x + "x" + (this.y - 1)])
    } if(this.store.data[this.x + "x" + (this.y + 1)]) {
        cells.push(this.store.data[this.x + "x" + (this.y + 1)])
    } if(this.store.data[(this.x - 1) + "x" + this.y]) {
        cells.push(this.store.data[(this.x - 1) + "x" + this.y])
    } if(this.store.data[(this.x + 1) + "x" + this.y]) {
        cells.push(this.store.data[(this.x + 1) + "x" + this.y])
    }
    return cells
}

module.exports = Cell
