var Cell = require("<scripts>/classes/Cell")

var CellStore = Phlux.createStore({
    initiateStore: function() {
        for(var x = 0; x < 5; x++) {
            for(var y = 0; y < 5; y++) {
                var cell = new Cell(x, y)
                this.data[x + "x" + y] = cell
                cell.trigger = this.trigger.bind(this)
            }
        }
    }
})

module.exports = CellStore
