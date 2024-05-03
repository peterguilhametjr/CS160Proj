const Boom = require('@hapi/boom');
import { db } from "../database";

export const getRestaurantsProfileRoute = {
    method: 'GET',
    path: '/api/ownerpage/updaterestaurant/{id}', 
    handler: async (req, h) => {
        const id = req.params.id; 
        const { results } = await db.query(
            'SELECT * FROM restaurants WHERE id=?', [id],
        );

        const restaurant = results[0];
        if (!restaurant) throw Boom.notFound(`There is no restaurant with id ${id}`);

        return restaurant;
    }
}
