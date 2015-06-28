var GameColors = require("<scripts>/data/GameColors")
var PlayerStore = require("<scripts>/stores/PlayerStore")

var CELL_PADDING = 0.2
var CELL_ROUNDING = 0.05

var Cell = function(protocell) {
    this.x = protocell.x || 0
    this.y = protocell.y || 0
    
    if(!!protocell.store) {
        this.store = protocell.store
    }
    
    if(protocell.value == "X") {
        this.isTrenches = true
    } else if(protocell.value == "a") {
        this.player = PlayerStore.getPlayer(0)
    } else if(protocell.value == "A") {
        this.player = PlayerStore.getPlayer(0)
        this.kingplayer = PlayerStore.getPlayer(0)
    } else if(protocell.value == "b") {
        this.player = PlayerStore.getPlayer(1)
    } else if(protocell.value == "B") {
        this.player = PlayerStore.getPlayer(1)
        this.kingplayer = PlayerStore.getPlayer(1)
    }
}

Cell.prototype.onClick = function() {
    var player = PlayerStore.getCurrentPlayer()
    if(player.canClaim(this)) {
        player.claim(this)
        this.store.trigger()
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
    var currentPlayer = PlayerStore.getCurrentPlayer()
    
    var cursor = "auto"
    var color = GameColors["-1"].light
    
    if(this.isHovered) {
        color = currentPlayer.colors.dark
        cursor = "pointer"
    } else if(!!this.player) {
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
        backgroundImage: !!this.kingplayer ? "url(assets/images/king.png)" : null,
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
