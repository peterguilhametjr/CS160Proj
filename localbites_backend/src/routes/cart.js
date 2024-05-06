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


export const getUserCartDetailsRoute = {
    method: 'GET',
    path: '/api/user/cartDetails/{user_id}',

    handler: async (req, h) => {
        const user_id = req.params.user_id;
        const { results } = await db.query(
            'SELECT * FROM cart_details WHERE user_id=?', [user_id],
        );

        if (results.length === 0) { // Check if menu is empty
            // throw Boom.notFound(`Cannot find items`);
            return []
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

export const getCartQuantity = {
    method: 'GET',
    path: '/api/{user_id}/getCartQuantity', 
    handler: async (req, h) => {

        const { user_id } = req.params; // Extract id from the URL parameters
        // const  { name } = req.params;
        // const { location } = req.params; 

        try {
            const query = `
            SELECT COUNT(*) AS row_count FROM cart_details WHERE user_id = ?
            `;

            const result = await db.query(query, user_id);

            // Extract the count value from the first row
            console.log('Result:', result);
            const count = result.results[0].row_count;

            
            return h.response(count); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};

export const getCartTotalPrice = {
    method: 'GET',
    path: '/api/{user_id}/getCartTotalPrice', 
    handler: async (req, h) => {

        const { user_id } = req.params; // Extract id from the URL parameters
        // const  { name } = req.params;
        // const { location } = req.params; 

        try {
            const query = `
            SELECT SUM(price) AS total_sum FROM cart_details WHERE user_id = ?
            `;

            const result = await db.query(query, user_id);

            // Extract the count value from the first row
            console.log('Result:', result);
            const count = result.results[0].total_sum;

            
            return h.response(count); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};

export const updateCartTotalPriceQuantity = {
    method: 'POST',
    path: '/api/cart/updateCartTotalPrice', 
    handler: async (req, h) => {
        const { user_id, quantity, total_price } = req.payload;
        // const id = req.params.id; // Get the id from the request parameters
        try {
            // Update restaurant data in the database
            const result = await db.query(`
            UPDATE cart
            SET quantity = ?, total_price = ?
            WHERE user_id = ?;
        `, [quantity, total_price, user_id]);
        

            if (result.affectedRows === 0) {
                throw Boom.notFound(`No cart found with id ${user_id}`);
            }

            return h.response({
                message: 'cart updated successfully'
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};

// `/api/user/getCart/${user_id}`
export const getCart = {
    method: 'GET',
    path: '/api/user/getCart/{user_id}', 
    handler: async (req, h) => {
        const { user_id } = req.params;
        try {
            const { results } = await db.query('SELECT * FROM cart WHERE user_id=?', user_id);
            console.log(results[0])
            return h.response(results[0]); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};

// /api/userPage/${user_id}/deleteAllFromCart

export const deleteAllFromCart = {
    method: 'DELETE',
    path: '/api/userPage/{user_id}/deleteAllFromCart', 
    handler: async (req, h) => {
        // const id = req.params.id; // Get the id from the request parameters
        const user_id = req.params.user_id; // Get the item_id from the request parameters

        try {
            const result = await db.query('DELETE FROM cart_details WHERE user_id=?', [user_id]);

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
}