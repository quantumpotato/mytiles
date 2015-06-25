window.React = require("react")
window.Phlux = require("phlux")
window.Classnames = require("classnames")

var GameFrame = require("<scripts>/views/GameFrame")

var Cell = require("<scripts>/classes/Cell")
var CellView = require("<scripts>/views/CellView")
var CellStore = require("<scripts>/stores/CellStore")

var GameBoard = React.createClass({
    mixins: [
        Phlux.connectStore(CellStore, "cells")
    ],
    render: function() {
        return (
            <div style={this.styles}>
                {this.renderCells()}
            </div>
        )
    },
    renderCells: function() {
        var renderings = []
        for(var coords in this.state.cells) {
            var cell = this.state.cells[coords]
            renderings.push(
                <CellView key={coords} data={cell}/>
            )
        }
        return renderings
    },
    styles: {
        bottom: "0em",
        height: "5em",
        position: "absolute"
    }
})

var Game = React.createClass({
    render: function() {
        return (
            <GameFrame aspect-ratio="5x7">
                <GameBoard/>
            </GameFrame>
        )
    }
})

React.render(<Game/>, document.body)
