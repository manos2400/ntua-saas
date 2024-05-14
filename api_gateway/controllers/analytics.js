const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/analytics-status', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3002/status');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/analytics-log', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3002/log');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/analytics', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3002/analytics');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/analytics/:id', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3002/analytics/:id');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
