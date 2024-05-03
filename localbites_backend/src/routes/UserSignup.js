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
