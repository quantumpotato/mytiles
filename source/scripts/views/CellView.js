var CellView = React.createClass({
    render: function() {
        var cell = this.props.data
        return (
            <div onClick={cell.onClick.bind(cell)}
                onMouseOver={cell.onMouseOver.bind(cell)}
                onMouseOut={cell.onMouseOut.bind(cell)}
                style={cell.renderStyle()}/>
        )
    }
})

module.exports = CellView
