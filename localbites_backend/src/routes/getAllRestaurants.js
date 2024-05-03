import { db } from "../database";

export const getAllRestaurantsRoute = {
    method: 'GET',
    path: '/api/searchPage', 
    handler: async (req, h) => {
        try {
            const { results } = await db.query('SELECT * FROM restaurants');
            return h.response(results); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};
