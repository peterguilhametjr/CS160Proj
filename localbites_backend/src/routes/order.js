const Boom = require('@hapi/boom');
import { db } from "../database";

export const addOrderRoute = {
    method: 'POST',
    path: '/api/userPage/cartToOrder', // Adjust the route to indicate adding a menu

    // /api/ownerpage/addrestaurant/${id}/addmenu
    handler: async (req, h) => {
        const { user_id, total_price } = req.payload; // Extract id, name, and price from the request payload
        // const { id } = req.params; // Extract id from the URL parameters

        try {
            // Insert new menu item into the database      +++++ take id from url
            const result = await db.query(`
                INSERT INTO orders (user_id, total_price)
                VALUES (?, ?);
            `, [user_id, total_price]);

            // Retrieve the ID of the newly added menu item
            // const itemId = result.insertId;
            const orderId = result.results.insertId;


            console.log("order id checking: " + JSON.stringify(result))
            return h.response({
                message: 'Order route added successfully',
                order_id: orderId,
                user_id,
                total_price
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};

// /api/userPage/moveToOrder
export const moveToOrderRoute = {
    method: 'POST',
    path: '/api/userPage/moveToOrder', // Adjust the route to indicate adding a menu

    // /api/ownerpage/addrestaurant/${id}/addmenu
    handler: async (req, h) => {
        const { user_id, order_id, name, price, item_id } = req.payload; // Extract id, name, and price from the request payload
        // const { id } = req.params; // Extract id from the URL parameters

        try {
            // Insert new menu item into the database      +++++ take id from url
            const result = await db.query(`
                INSERT INTO order_details (user_id, order_id, name, price, item_id)
                VALUES (?, ?, ?, ?, ?);
            `, [user_id, order_id, name, price, item_id]);

            // Retrieve the ID of the newly added menu item
            // const itemId = result.insertId;

            return h.response({
                message: 'Cart items moved to order succesfully',
                user_id,
                order_id,
                name,
                price,
                item_id
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};

// /api/userPage/${user_id}/getOrdersRoute
export const getUserOrdersRoute = {
    method: 'GET',
    path: '/api/userPage/{user_id}/getOrdersRoute',

    handler: async (req, h) => {
        const user_id = req.params.user_id;
        const { results } = await db.query(
            'SELECT * FROM orders WHERE user_id=?', [user_id],
        );

        if (results.length === 0) { // Check if menu is empty
            // throw Boom.notFound(`Cannot find items`);
        }

        return results;
    }
}

export const getUserOrderDetailsRoute = {
    method: 'GET',
    path: '/api/userPage/{user_id}/getOrderDetailsRoute',

    handler: async (req, h) => {
        const user_id = req.params.user_id;
        const { results } = await db.query(
            'SELECT * FROM order_details WHERE user_id=?', [user_id],
        );

        if (results.length === 0) { // Check if menu is empty

            // throw Boom.notFound(`Cannot find items`);
        }

        return results;
    }
}

// /api/driverPage/sendToHistory
export const addOrderHistoryRoute = {
    method: 'POST',
    path: '/api/driverPage/sendToHistory', // Adjust the route to indicate adding a menu

    // /api/ownerpage/addrestaurant/${id}/addmenu
    handler: async (req, h) => {
        const { order_id } = req.payload; // Extract id, name, and price from the request payload
        // const { id } = req.params; // Extract id from the URL parameters

        try {
            // Insert new menu item into the database      +++++ take id from url
            const result = await db.query(`
                INSERT INTO order_history (order_id, user_id, total_price)
                SELECT order_id, user_id, total_price
                FROM orders
                WHERE order_id = ?
            `, order_id);

            // Retrieve the ID of the newly added menu item
            // const itemId = result.insertId;
            const orderId = result.results.insertId;


            console.log("order id checking: " + JSON.stringify(result))
            return h.response({
                message: 'Order route added successfully'
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};

export const addOrderHistoryDetailsRoute = {
    method: 'POST',
    path: '/api/driverPage/sendToHistoryDetails', // Adjust the route to indicate adding a menu

    // /api/ownerpage/addrestaurant/${id}/addmenu
    handler: async (req, h) => {
        const { order_id } = req.payload; // Extract id, name, and price from the request payload
        // const { id } = req.params; // Extract id from the URL parameters

        try {
            // Insert new menu item into the database      +++++ take id from url
            const result = await db.query(`
                INSERT INTO order_history_details (order_item, order_id, name, price, item_id, user_id)
                SELECT order_item, order_id, name, price, item_id, user_id
                FROM order_details
                WHERE order_id = ?
            `, order_id);

            // Retrieve the ID of the newly added menu item
            // const itemId = result.insertId;
            const orderId = result.results.insertId;


            console.log("order id checking: " + JSON.stringify(result))
            return h.response({
                message: 'Order route added successfully'
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};

// /api/userPage/getAllOrderHistories/${user_id}
export const getAllUserSpecificOrderHistory = {
    method: 'GET',
    path: '/api/userPage/getAllOrderHistories/{user_id}', 
    handler: async (req, h) => {
        const user_id = req.params.user_id;
        try {
            const { results } = await db.query('SELECT * FROM order_history WHERE user_id = ?', user_id);
            return h.response(results); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};

export const getAllUserSpecificOrderHistoryDetails = {
    method: 'GET',
    path: '/api/userPage/getAllOrderHistoryDetails/{user_id}', 
    handler: async (req, h) => {
        const user_id = req.params.user_id;
        try {
            const { results } = await db.query('SELECT * FROM order_history_details WHERE user_id = ?', user_id);
            console.log("results: " + JSON.stringify(results))
            return h.response(results); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};