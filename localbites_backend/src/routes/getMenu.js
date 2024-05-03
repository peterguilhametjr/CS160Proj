const Boom = require('@hapi/boom'); 
import { db } from "../database";

export const getRestaurantsMenuRoute = {
    method: 'GET',
    path: '/api/ownerpage/menu/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const { results } = await db.query(
            'SELECT * FROM items WHERE id=?', [id],
        );

        if (results.length === 0) { // Check if menu is empty
            throw Boom.notFound(`There is no menu available for restaurant with id ${id}`);
        }

        return results;
    }
}
