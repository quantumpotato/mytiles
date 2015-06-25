var GameStore = require("<scripts>/stores/GameStore")
var PlayerStore = require("<scripts>/stores/PlayerStore")

var CELL_PADDING = 0.2
var CELL_ROUNDING = 0.05

var Cell = function(x, y) {
    this.position = {
        "x": x, "y": y
    }
    if(x == 1 && y == 1
    || x == 2 && y == 2
    || x == 3 && y == 3) {
        this.isWallable = false
        this.isTrenches = true
    } else {
        this.isWallable = true
    }
    if(x == 4 && y == 0) {
        this.isKing = true
        this.isClaimed = true
        this.isWallable = false
        this.player = PlayerStore.getPlayer(0)
    } else if(x == 0 && y == 4) {
        this.isKing = true
        this.isClaimed = true
        this.isWallable = false
        this.player = PlayerStore.getPlayer(1)
    }
}

Cell.prototype.onClick = function() {
    if(!this.isClaimed) {
        var _id = GameStore.getCurrentPlayer()
        this.isClaimed = true
        this.player = PlayerStore.getPlayer(_id)
        this.trigger()
    }
}

Cell.prototype.onMouseOver = function() {
    this.isHovered = true
    this.trigger()
}

Cell.prototype.onMouseOut = function() {
    this.isHovered = false
    this.trigger()
}

Cell.prototype.getStyle = function() {
    return {
        position: "absolute",
        width: 1 - CELL_PADDING + "em",
        height: 1 - CELL_PADDING + "em",
        borderRadius: CELL_ROUNDING + "em",
        top: this.position.y + (CELL_PADDING / 2) + "em",
        left: this.position.x + (CELL_PADDING / 2) + "em",
        border: this.isTrenches ? "0.1em dashed #EEE" : null,
        cursor: !this.isClaimed ? "pointer" : null,
        backgroundColor: this.getColor()
    }
}

Cell.prototype.getColor = function() {
    if(this.isClaimed) {
        return this.player.color
    } else if(this.isHovered) {
        return PlayerStore.getCurrentPlayer().hovercolor
    } else {
        return "#888"
    }
}

module.exports = Cell
