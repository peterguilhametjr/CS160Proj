// /api/userPage/${user_id}/getAccount

import { db } from "../database";

export const getAllUsersRoute = {
    method: 'GET',
    path: '/api/userPage/{user_id}/getAccount', 
    handler: async (req, h) => {
        const user_id = req.params.user_id;
        try {
            const { results } = await db.query('SELECT * FROM users WHERE user_id=?', user_id);
            // console.log("testing: " + results[0].result)
            console.log("order id checking: " + JSON.stringify(results[0]))
            return h.response(results[0]); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};