const Boom = require('@hapi/boom');
import { db } from "../database";

export const createNewMenuRoute = {
    method: 'POST',
    path: '/api/restaurants/{id}/menu/create', // not working 2:26 not implemented yet
    handler: async (req, h) => {
        const id = req.params.id;
        const {name = '', price = 0 } = req.payload; 

        try {
            await db.query(`
                INSERT INTO items (id, name, price)
                VALUES (?, ?, ?);
                
            `,
            [id, name, price]
            );

            return { restaurant_id: restaurantId, name, price };
        } catch (error) {
            throw Boom.internal('An internal server error occurred');
        }
    }
}
