window.React = require("react")
window.Phlux = require("phlux")

var GameFrame = require("<scripts>/components/GameFrame")

var grid = [
	[1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 2]
]

var Cell = React.createClass({
    render: function() {
        return (
			<div style={this.renderStyle()}
				onClick={this.onClick}>
            	{this.props.value}
			</div>
        )
    },
	renderStyle: function() {
		return {
			width: "1em",
			height: "1em",
			position: "absolute",
			top: this.props.data.position.y + "em",
			left: this.props.data.position.x + "em",
			backgroundColor: "red"
		}
	},
	onClick: function() {
		console.log(this.props.data.position)
	}
})

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame aspect-ratio="5x5">
                {this.renderGrid()}
            </GameFrame>
        )
    },
    renderGrid: function() {
		var renderings = []
		for(var y in grid) {
			for(var x in grid[y]) {
				var data = {
					position: {
						"x": x,
						"y": y
					},
					value: grid[x][y]
				}
				renderings.push(
					<Cell key={x + "x" + y}
						data={data}/>
				)
			}
		}
		return renderings
    }
})

React.render(<Game/>, document.body)
