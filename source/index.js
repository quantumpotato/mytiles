window.React = require("react")
window.Phlux = require("phlux")

var Game = React.createClass({
	render: function() {
		return (
			<div>
				Hello World!
			</div>
		)
	}
})

React.render(<Game/>, document.body)
