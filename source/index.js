window.React = require("react")
window.Phlux = require("phlux")
window.Pather = require("pathfinding")

var Cell = require("<scripts>/classes/Cell")
var CellView = require("<scripts>/views/CellView")
var CellStore = require("<scripts>/stores/CellStore")

var GameFrame = require("<scripts>/views/GameFrame")
var GameStore = require("<scripts>/stores/GameStore")

var PlayerView = require("<scripts>/views/PlayerView")
var PlayerStore = require("<scripts>/stores/PlayerStore")

var Game = React.createClass({
    mixins: [
        Phlux.connectStore(GameStore, "game"),
        Phlux.connectStore(CellStore, "cells"),
        Phlux.connectStore(PlayerStore, "players")
    ],
    render: function() {
        return (
            <GameFrame aspect-ratio="5x7">
                <div style={this.styles.players}>
                    {this.renderViews(PlayerView, this.state.players)}
                </div>
                <div style={this.styles.cells}>
                    {this.renderViews(CellView, this.state.cells)}
                </div>
            </GameFrame>
        )
    },
    renderViews: function(View, data) {
        var views = []
        for(var key in data) {
            views.push(
                <View key={key}
                    data={data[key]}/>
            )
        }
        return views
    },
    styles: {
        players: {
            height: "2em"
        },
        cells: {
            bottom: "0em",
            height: "5em",
            position: "absolute"
        }
    }
})

React.render(<Game/>, document.body)
