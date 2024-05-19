const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/getCredits', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4004/getCredits');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/addCredits', async(req,res) => {
    const creds = req.body.credits;
    console.log(creds);
    try {
        const response = await axios.put('http://localhost:4004/addCredits', req.body, req.headers);
        console.log(response);  
        res.status(200).json({success :'success'});
    } catch (error) {
        res.status(500).json({error : 'Internal Server Error'})
    }
});

module.exports = router;