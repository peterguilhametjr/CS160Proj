const Boom = require('@hapi/boom');
import { db } from "../database";

export const updateRestaurantRoute = {
    method: 'POST',
    path: '/api/ownerpage/updaterestaurant/{id}', 
    handler: async (req, h) => {
        const { name, location, tags, imageURL, zip_code } = req.payload;
        const id = req.params.id; // Get the id from the request parameters
        try {
            // Update restaurant data in the database
            const result = await db.query(`
            UPDATE restaurants
            SET name = ?, location = ?, tags = ?, imageURL = ?, zip_code = ?
            WHERE id = ?;
        `, [name, location, tags, imageURL, zip_code, id]);
        

            if (result.affectedRows === 0) {
                throw Boom.notFound(`No restaurant found with id ${id}`);
            }

            return h.response({
                message: 'Restaurant updated successfully',
                id: id, name, location, tags, imageURL, zip_code
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};
