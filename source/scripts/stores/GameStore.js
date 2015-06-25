var GameStore = Phlux.createStore({
    data: {
        player: 0,
        claims: 2
    },
    getPlayer: function() {
        return this.data.player
    },
    decreaseClaims: function() {
        this.data.claims -= 1
        if(this.data.claims <= 0) {
            this.data.claims = 2
            this.data.player += 1
            this.data.player %= 2
        }
    }
})

module.exports = GameStore
