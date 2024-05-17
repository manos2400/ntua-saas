const express = require('express');
let { getPool } = require('../utils/database');

const router = express.Router();

const handleRoute = async (req, res) => {
    const creds = req.body.credits;
    try {
        const client = await getPool().connect();
        const result = await client.query('UPDATE global_credits SET credits = credits + $1', creds);
        console.log(result);
    } catch (error) {
        console.error('Error adding global credits:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}

router.get('/addCredits', handleRoute);

module.exports = router;