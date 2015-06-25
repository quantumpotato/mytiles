var GameStore = Phlux.createStore({
    data: {
        player: 0,
    },
    getCurrentPlayer: function() {
        return this.data.player
    },
    togglePlayer: function() {
        this.player += 1
        this.player %= 2
    }
})

module.exports = GameStore
