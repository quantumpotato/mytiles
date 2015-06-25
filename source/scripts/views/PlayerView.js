var PlayerView = React.createClass({
    render: function() {
        return (
            <div style={this.getContainerStyle()}>
                <div style={this.getNameStyle()}>
                    {this.props.data.name}
                </div>
                <div style={this.getClaimsStyle()}>
                    {this.renderClaims()}
                </div>
            </div>
        )
    },
    renderClaims: function(_id) {
        return Array(this.props.data.claims + 1).join("*")
    },
    getContainerStyle: function() {
        return {
            width: "50%",
            height: "100%",
            padding: "0.25em",
            textAlign: "center",
            display: "inline-block",
        }
    },
    getNameStyle: function() {
        return {
            fontWeight: "bold",
            color: this.props.data.colors.light
        }
    },
    getClaimsStyle: function() {
        return {
            fontSize: "0.5em",
            color: this.props.data.colors.dark
        }
    }
})

module.exports = PlayerView
