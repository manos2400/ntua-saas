const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/getCredits', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4003/getCredits');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;