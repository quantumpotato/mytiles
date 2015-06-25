var PlayerView = React.createClass({
    render: function() {
        return (
            <div style={this.styles.container}>
                <div style={this.styles.name}>
                    {this.props.data.name}
                </div>
                <div style={this.styles.claims}>
                    {this.renderClaims()}
                </div>
            </div>
        )
    },
    renderClaims: function(_id) {
        return Array(this.props.data.claims + 1).join("*")
    },
    styles: {
        container: {
            width: "50%",
            height: "100%",
            padding: "0.25em",
            textAlign: "center",
            display: "inline-block",
        },
        name: {
            fontWeight: "bold"
        },
        claims: {
            fontSize: "0.5em"
        }
    },
})

module.exports = PlayerView
