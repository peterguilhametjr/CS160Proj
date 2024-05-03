const Boom = require('@hapi/boom');
import { db } from "../database";

export const updateMenuRoute = {
    method: 'POST',
    path: '/api/ownerpage/menu/{id}/update/{item_id}', 
    handler: async (req, h) => {
        const id = req.params.id; // Extracted from the URL path
        const item_id = req.params.item_id; // Extracted from the URL path
        const { name, price } = req.payload; // Extracted from the request body

        try {
            // Update item data in the database
            const result = await db.query(`
                UPDATE items
                SET name = ?, price = ?
                WHERE item_id = ? AND id = ?;
            `, [name, price, item_id, id]);

            if (result.affectedRows === 0) {
                throw Boom.notFound(`No item found with item_id ${item_id} and id ${id}`);
            }

            return h.response({
                message: 'Item updated successfully',
                item_id: item_id, name, price
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};
