const Boom = require('@hapi/boom');
import { db } from "../database";

export const UserSignupRoute = {
    method: 'POST',
    path: '/api/userSignup', 
    handler: async (req, h) => {
        const { name, email, zip_code, password } = req.payload;  

        try {
            // Insert new user into the database
            const result = await db.query(`
                INSERT INTO users (name, email, zip_code, password)
                VALUES (?, ?, ?, ?);
            `, [name, email, zip_code, password]);

            // Retrieve the ID of the newly added user
            const userId = result.insertId;

            return h.response({
                message: 'User added successfully',
                name,
                email,
                zip_code
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};


export const getUserIdRoute = {
    method: 'GET',
    path: '/api/userid/{name}/{email}/{zip_code}/{password}',
    handler: async (req, h) => {

        const { name, email, zip_code, password } = req.params; // Extract id from the URL parameters
        // const  { name } = req.params;
        // const { location } = req.params; 

        try {
            const query = `
            SELECT user_id
            FROM users
            WHERE name = ? AND email = ? AND zip_code = ? AND password = ?
            `;

            const result = await db.query(query, [name, email, zip_code, password]);

            return h.response(result); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Throw the error to be caught by Hapi's error handling mechanism
        }
    }
}

export const initializeCart = {
    method: 'POST',
    path: '/api/user/cart/',
    handler: async (req, h) => {
        const { user_id, quantity, total_price } = req.payload;  

        try {
            // Insert new user into the database
            const result = await db.query(`
                INSERT INTO cart (user_id, quantity, total_price)
                VALUES (?, ?, ?);
            `, [user_id, quantity, total_price]);

            // Retrieve the ID of the newly added user
            // const userId = result.insertId;
            const cartId = result.insertId;

            return h.response({
                message: 'Cart initialized successfully',
                user_id,
                quantity,
                total_price
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
}