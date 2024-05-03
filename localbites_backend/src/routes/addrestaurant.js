const Boom = require('@hapi/boom');
import { db } from "../database";

export const addRestaurantRoute = {
    method: 'POST',
    path: '/api/ownerpage/addrestaurant',
    
    handler: async (req, h) => {
        const { name, location, tags, stars, imageURL, zip_code, user_id } = req.payload;

        // Convert 'true'/'false' or true/false to integer 1/0
        // const favoriteInt = (favorite === 'true' || favorite === true) ? 1 : 0;

        try {
            // Insert new restaurant data into the database
            const result = await db.query(`
                INSERT INTO restaurants (name, location, tags, stars, imageURL, zip_code, user_id)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            `, [name, location, tags, stars, imageURL, zip_code, user_id]);

            // Fetch the last insert id
            const insertId = result.insertId;

            return { id: insertId, name, location, tags, stars, imageURL, zip_code, user_id };
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};
