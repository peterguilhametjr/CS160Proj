const Boom = require('@hapi/boom');
import { db } from "../database";

export const deleteRestaurantRoute = {
    method: 'DELETE',
    path: '/api/ownerpage/{id}', 
    handler: async (req, h) => {
        const id = req.params.id; // Get the id from the request parameters

        try {
            const result = await db.query('DELETE FROM restaurants WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                // If no rows are affected, no restaurant with the given ID was found
                throw Boom.notFound(`No restaurant found with id ${id}`);
            }

            return h.response({
                message: 'Restaurant successfully deleted'
            }).code(200);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            // Throw a more generic error to the client
            throw Boom.internal('An internal server error occurred');
        }
    }
};
