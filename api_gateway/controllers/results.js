const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/status', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4002/status');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/results/:id', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4002/results/:id');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
