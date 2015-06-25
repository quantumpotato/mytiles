var GameStore = Phlux.createStore({
    data: {
        player: 0,
    },
    getCurrentPlayer: function() {
        return this.data.player
    },
    togglePlayer: function() {
        this.data.player += 1
        this.data.player %= 2
        this.trigger()
    }
})

module.exports = GameStore
