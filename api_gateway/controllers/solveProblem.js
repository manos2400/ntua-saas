const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req,res) => {
    try {
        const result = await axios.post('http://localhost:4005/solveproblem', req.body);
        console.log(result);
        res.status(200).json({success : 'success'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Api Gateway error'})
    }
})

module.exports = router;