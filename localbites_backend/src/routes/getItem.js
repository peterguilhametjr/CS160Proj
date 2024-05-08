const Boom = require('@hapi/boom');
import { db } from "../database";

export const getItemRoute = {
    method: 'GET',
    path: '/api/ownerpage/menu/{id}/update/{item_id}', 
    handler: async (req, h) => {
        const id = req.params.id;
        const item_id = req.params.item_id;   //extract these values from url

        try {
            // Execute the query and capture the result
            const result = await db.query(`
                SELECT * FROM items WHERE item_id = ? AND id = ?;
            `, [item_id, id]);

            // Access the results directly
            const rows = result.results;
            const fields = result.fields;

            if (rows.length === 0) {
                throw Boom.notFound(`No item found with item_id ${item_id} and id ${id}`);
            }

            // Respond with the item details
            return h.response({
                message: 'Item details retrieved successfully',
                itemDetails: rows[0]
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};

// /api/getItems/${item_id}
export const getItemSpecificRoute = {
    method: 'GET',
    path: '/api/getItems/{item_id}', 
    handler: async (req, h) => {
        const item_id = req.params.item_id;   //extract these values from url

        try {
            // Execute the query and capture the result
            const result = await db.query(`
                SELECT * FROM items WHERE item_id = ?;
            `, [item_id]);

            // Access the results directly
            const rows = result.results;
            const fields = result.fields;

            if (rows.length === 0) {
                throw Boom.notFound(`No item found with item_id ${item_id} and id ${id}`);
            }

            // console.log("rows: " + fields[0])
            console.log("order id checking: " + JSON.stringify(rows[0]))

            // Respond with the item details
            return h.response(rows[0]).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};
