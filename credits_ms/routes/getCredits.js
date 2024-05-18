const express = require('express');
const router = express.Router();
let { getPool } = require('../utils/database');


const handleRoute = async (req, res) => {
    try {
        const client = await getPool().connect();
        const result = await client.query('SELECT credits FROM global_credits');
        const globalCreds = result.rows[0].credits;
        await client.release();
        console.debug(globalCreds);
        return res.json({ globalCreds });
    } catch (error) {
        console.error('Error fetching global credits:', error);
        return res.status(500).json({error: 'Internal server error'});
    }
}


router.get('/getCredits', handleRoute);

module.exports = router;