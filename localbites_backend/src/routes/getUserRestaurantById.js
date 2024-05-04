const Boom = require('@hapi/boom');
import { db } from "../database";

export const getUserRestaurantsByIdRoute = {
    method: 'GET',
    path: '/api/restaurant/{id}', 
    handler: async (req, h) => {
        const id = req.params.id; 

        // Query to fetch restaurant details
        const { results: restaurantResults } = await db.query(
            'SELECT * FROM restaurants WHERE id=?', [id]
        );

        const restaurant = restaurantResults[0];
        if (!restaurant) throw Boom.notFound(`There is no restaurant with id ${id}`);

        // Query to fetch items associated with the restaurant
        const { results: itemResults } = await db.query(
            'SELECT * FROM items WHERE id=?', [id]
        );

        // Including item details in the response
        restaurant.items = itemResults;

        return restaurant;
    }
}