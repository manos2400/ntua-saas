
const { fetch_and_solve } = require('../utils/retrieve_json.js'); // Import the function to fetch JSON data from the database



exports.solve_problem = (req, res, next) => {
    const solver_id = req.body.solver_id;
    const metadata_id = req.body.metadata_id;
    
    if(solver_id == 1){
        const num_vehicles = req.body.num_vehicles;
        const depot = req.body.depot;
        const max_distance = req.body.max_distance;

        try {
            const jsonData = fetch_and_solve(metadata_id);

            console.log('Execution completed');
            
            // Send response to the client
            res.status(200).json("problem sended for solution");
            
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: 'Solver ID not supported' });
    }
 };