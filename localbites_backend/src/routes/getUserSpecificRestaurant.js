const Boom = require('@hapi/boom'); 
import { db } from "../database";

export const getUserSpecificRestaurantRoute = {
    method: 'GET',
    path: '/api/ownerPage/{user_id}', 
    handler: async (req, h) => {
        try {
            const userId = req.params.user_id; // Corrected parameter name

            const query = 'SELECT * FROM restaurants WHERE user_id = ?';
            const { results } = await db.query(query, [userId]);

            if (results.length === 0) {
                return Boom.notFound(`No restaurants found for user_id: ${userId}`);
            }

            return h.response(results);
        } catch (error) {
            console.error('Error fetching user-specific restaurants:', error);
            throw Boom.badImplementation('An internal server error occurred');
        }
    }
};
