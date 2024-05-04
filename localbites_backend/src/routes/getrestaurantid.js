const Boom = require('@hapi/boom');
import { db } from "../database";

export const getRestaurantIdRoute = {
    method: 'GET',
    path: '/api/{user_id}/{name}/{location}/getrestaurantid', 
    handler: async (req, h) => {

        const { user_id, name, location } = req.params; // Extract id from the URL parameters
        // const  { name } = req.params;
        // const { location } = req.params; 

        try {
            const query = `
            SELECT id
            FROM restaurants
            WHERE user_id = ? AND name = ? AND location = ?
            `;

            const result = await db.query(query, [user_id, name, location]);

            return h.response(result); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};
