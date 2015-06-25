var GameStore = require("<scripts>/stores/GameStore")

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
    } else {
        this.isWallable = true
    }
    if(x == 4 && y == 0) {
        this.player = 0
        this.isKing = true
        this.isClaimed = true
    } else if(x == 0 && y == 4) {
        this.player = 1
        this.isKing = true
        this.isClaimed = true
    } else {
        this.player = -1
        this.isClaimed = false
    }
}

Cell.prototype.onClick = function() {
    if(this.isClaimed == false) {
        var player = GameStore.getPlayer()
        GameStore.decreaseClaims()
        this.isClaimed = true
        this.player = player
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
        border: !this.isWallable ? "0.1em dashed #EEE" : null,
        cursor: !this.isClaimed ? "pointer" : null,
        backgroundColor: this.getColor()
    }
}

Cell.prototype.getColor = function() {
    if(this.isClaimed == false
    && this.isHovered == true) {
        if(GameStore.getPlayer() == 0) {
            return "#800" //dark red
        } else if(GameStore.getPlayer() == 1) {
            return "#008" //dark blue
        }
    } else {
        if(this.player == 0) {
            return "#C00" //red
        } else if(this.player == 1) {
            return "#00C" //blue
        } else {
            return "#222" //black
        }
    }
}

module.exports = Cell
