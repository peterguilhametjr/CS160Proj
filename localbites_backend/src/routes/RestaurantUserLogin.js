const Boom = require('@hapi/boom');
import { db } from "../database";

export const RestaurantUserLoginRoute = {
    method: 'POST',
    path: '/api/restaurant/login', 
    handler: async (req, h) => {
        console.log('Received login request:', req.payload);
        const { email, password } = req.payload;  
    
        try {
            const { results } = await db.query(`
                SELECT * FROM restaurant_users
                WHERE email = ? AND password = ?;
            `, [email, password]);
    
            console.log('Database query results:', results);
    
            if (!results || results.length === 0) {
                console.log('No user found or wrong credentials');
                throw Boom.unauthorized('Invalid email or password');
            }
    
            const user = results[0];
            console.log('User details:', user);
            return h.response({
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                zip_code: user.zip_code
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
    
};
