const Boom = require('@hapi/boom');
import { db } from "../database";

export const addCartRoute = {
    method: 'POST',
    path: '/api/user/cart/addToCart', // Adjust the route to indicate adding a menu

    // /api/ownerpage/addrestaurant/${id}/addmenu
    handler: async (req, h) => {
        const { user_id, item_id, name, price } = req.payload; // Extract id, name, and price from the request payload
        // const { id } = req.params; // Extract id from the URL parameters

        try {
            // Insert new menu item into the database      +++++ take id from url
            const result = await db.query(`
                INSERT INTO cart_details (user_id, item_id, name, price)
                VALUES (?, ?, ?, ?);
            `, [user_id, item_id, name, price]);

            // Retrieve the ID of the newly added menu item
            // const itemId = result.insertId;

            return h.response({
                message: 'Cart item added successfully',
                user_id,
                item_id,
                name,
                price
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};


export const getUserCartRoute = {
    method: 'GET',
    path: '/api/user/cartDetails/{user_id}',

    handler: async (req, h) => {
        const user_id = req.params.user_id;
        const { results } = await db.query(
            'SELECT * FROM cart_details WHERE user_id=?', [user_id],
        );

        if (results.length === 0) { // Check if menu is empty
            throw Boom.notFound(`Cannot find items`);
        }

        return results;
    }
}

export const deleteCartRoute = {
    method: 'DELETE',
    path: '/api/user/cartDelete/{cart_item_id}', 
    handler: async (req, h) => {
        // const id = req.params.id; // Get the id from the request parameters
        const cart_item_id = req.params.cart_item_id; // Get the item_id from the request parameters

        try {
            const result = await db.query('DELETE FROM cart_details WHERE cart_item_id=?', [cart_item_id]);

            if (result.affectedRows === 0) {
                // If no rows are affected, no menu item with the given ID was found
                throw Boom.notFound(`No cart item found with id: ${cart_item_id}`);
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
