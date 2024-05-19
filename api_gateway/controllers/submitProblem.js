const express = require('express');
const router = express.Router();
const axios = require('axios');


router.post('/newSubmission', async (req,res) => {
    try {
        const response = await axios.post('http://localhost:4005/submit_metadata', req.body);
        console.log(response);
        res.status(200).json({success : "success"})
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router