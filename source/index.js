window.React = require("react")
window.Phlux = require("phlux")

var GameFrame = require("<scripts>/components/GameFrame")

var Cell = function(x, y) {
	this.position = {
		"x": x, "y": y
	}

	if(x == 1 && y == 1
	|| x == 2 && y == 2
	|| x == 3 && y == 3) {
		this.wallable = false
	} else {
		this.wallable = true
	}

	if(x == 4 && y == 0) {
		this.claim = 1
	} else if(x == 0 && y == 4) {
		this.claim = 2
	} else {
		this.claim = 0
	}
}

Cell.prototype.onClick = function() {
	console.log(this.position)
}

var CellStore = Phlux.createStore({
	initiateStore: function() {
		for(var x = 0; x < 5; x++) {
			for(var y = 0; y < 5; y++) {
				var cell = new Cell(x, y)
				this.data[x + "x" + y] = cell
			}
		}
	}
})

var CellRender = React.createClass({
    render: function() {
        return (
			<div className={"cell" + " claim-" + this.props.data.claim}
				style={this.renderStyle()}
				onClick={this.onClick}>
            	{this.props.value}
			</div>
        )
    },
	renderStyle: function() {
		return {
			width: 1 - 0.1 + "em",
			height: 1 - 0.1 + "em",
			top: this.props.data.position.y + 0.05 + "em",
			left: this.props.data.position.x + 0.05 + "em",
			border: this.props.data.wallable ? null : "0.1em dashed #EEE",
		}
	},
	onClick: function() {
		console.log(this.props.data.position)
	}
})

var Game = React.createClass({
	mixins: [
		Phlux.connectStore(CellStore, "cells")
	],
    render: function() {
        return (
            <GameFrame aspect-ratio="5x5">
                {this.renderGrid()}
            </GameFrame>
        )
    },
    renderGrid: function() {
		var renderings = []
		for(var coords in this.state.cells) {
			var cell = this.state.cells[coords]
			renderings.push(
				<CellRender key={coords} data={cell}/>
			)
		}
		return renderings
    }
})

React.render(<Game/>, document.body)
