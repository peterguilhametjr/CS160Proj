const Boom = require('@hapi/boom');
import { db } from "../database";

export const RestaurantUserSignupRoute = {
    method: 'POST',
    path: '/api/restaurant/userSignup', 
    handler: async (req, h) => {
        const { name, email, password } = req.payload;  

        try {
            // Insert new user into the restaurant_users table in the database
            const result = await db.query(`
                INSERT INTO restaurant_users (name, email, password)
                VALUES (?, ?, ?);
            `, [name, email, password]);

            // Retrieve the ID of the newly added user
            const userId = result.insertId;

            return h.response({
                message: 'User added successfully',
                userId,
                name,
                email
                
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};
