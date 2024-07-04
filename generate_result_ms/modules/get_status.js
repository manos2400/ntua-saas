exports.get_status = async (req, res, next) => {
    try {
        const currentDate = new Date().toISOString();

        const serverInfo = {
            currentDateTime: currentDate,
            message: 'Server is running okay'
        };
        res.status(200).json(serverInfo);
    } catch (error) {
        console.error('Error checking server status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
