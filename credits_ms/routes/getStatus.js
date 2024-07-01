const express = require('express');
const router = express.Router();


const getStatus = async (req, res) => {
    try {
        const message = 'Credits ms is running okay'
        res.status(200).json({ message });
    } catch (error) {
        console.error('Error checking server status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

router.get('/status', getStatus);

module.exports = router;