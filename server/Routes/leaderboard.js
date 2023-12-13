const express = require('express')

const router = express.Router()

const leaderboardController = require('../Controller/leaderboard')

router.get('/leaderboard',leaderboardController.getLeaderboard)

module.exports = router