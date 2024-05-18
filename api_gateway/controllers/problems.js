const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/getProblems', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:4000/problems');
        // res.json(response.data);
        console.log(response.data);
        res.json({problems: response.data});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/problem/:problemID', async (req, res) => {
    try {
        // Check if the titleID is empty
        if (req.params.problemID === '') {
            return res.status(400).send('Bad Request');
        }
        
        let problemID = req.params.problemID;       
        const response = await axios.get(`http://localhost:4000/problem/${problemID}`);
        // res.json(response.data);
        console.log(response.data);
        res.json('hi');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/problem/:problemID', async (req, res) => {
    try {
        if (req.params.problemID === '') {
            return res.status(400).send('Bad Request');
        }

        let problemID = req.params.problemID;       
        const response = await axios.delete(`http://localhost:4000/problem/${problemID}`);
        // res.json(response.data);
        console.log(response.data);
        res.json('hi');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;