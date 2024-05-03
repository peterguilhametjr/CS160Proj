const Boom = require('@hapi/boom');
import { db } from "../database";

export const addMenuRoute = {
    method: 'POST',
    path: '/api/ownerpage/{user_id}/addrestaurant/{restaurant_id}/prompt_add/addmenu', // Adjust the route to indicate adding a menu

    // {path:'ownerPage/:user_id/addrestaurant/:restaurant_id/prompt_add/addmenu', component:AddMenuComponent},

    handler: async (req, h) => {
        const { name, price } = req.payload; // Extract id, name, and price from the request payload
        const { id } = req.params; // Extract id from the URL parameters

        try {
            // Insert new menu item into the database      +++++ take id from url
            const result = await db.query(`
                INSERT INTO items (id, name, price)
                VALUES (?, ?, ?);
            `, [id, name, price]);

            // Retrieve the ID of the newly added menu item
            const itemId = result.insertId;

            return h.response({
                message: 'Menu item added successfully',
                item_id: itemId, // Return the ID of the newly added item
                id,
                name,
                price
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};
