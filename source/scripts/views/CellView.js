var CellView = React.createClass({
    render: function() {
        return (
            <div onClick={this.props.data.onClick.bind(this.props.data)}
                onMouseOver={this.props.data.onMouseOver.bind(this.props.data)}
                onMouseOut={this.props.data.onMouseOut.bind(this.props.data)}
                style={this.props.data.getStyle()}/>
        )
    }
})

module.exports = CellView
