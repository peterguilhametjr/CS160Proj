const Boom = require('@hapi/boom');
import { db } from "../database";

export const deleteMenuRoute = {
    method: 'DELETE',
    path: '/api/ownerpage/menu/{id}/{item_id}', 
    handler: async (req, h) => {
        const id = req.params.id; // Get the id from the request parameters
        const item_id = req.params.item_id; // Get the item_id from the request parameters

        try {
            const result = await db.query('DELETE FROM items WHERE id = ? AND item_id = ?', [id, item_id]);

            if (result.affectedRows === 0) {
                // If no rows are affected, no menu item with the given ID was found
                throw Boom.notFound(`No menu item found with id ${id} and item_id ${item_id}`);
            }

            return h.response({
                message: 'Menu item successfully deleted'
            }).code(200);
        } catch (error) {
            console.error('Error deleting menu item:', error);
            // Throw a more generic error to the client
            throw Boom.internal('An internal server error occurred');
        }
    }
};
