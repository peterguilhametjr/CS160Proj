// 
import { db } from "../database";
const Boom = require('@hapi/boom');

export const getAllOrders = {
    method: 'GET',
    path: '/api/driverPage/getAllOrders', 
    handler: async (req, h) => {
        try {
            const { results } = await db.query('SELECT * FROM orders');
            return h.response(results); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
};

// /api/driverPage/fullfilOrder/${order_id}
export const fullfilOrder = {
    method: 'DELETE',
    path: '/api/driverPage/fullfilOrder/{order_id}', 
    handler: async (req, h) => {
        const order_id = req.params.order_id; // Get the id from the request parameters

        try {
            const result = await db.query('DELETE FROM orders WHERE order_id = ?', [order_id]);

            if (result.affectedRows === 0) {
                // If no rows are affected, no restaurant with the given ID was found
                throw Boom.notFound(`No restaurant found with id ${id}`);
            }

            return h.response({
                message: 'Restaurant successfully deleted'
            }).code(200);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            // Throw a more generic error to the client
            throw Boom.internal('An internal server error occurred');
        }
    }
};


