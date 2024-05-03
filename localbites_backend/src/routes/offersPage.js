import { db } from "../database";

export const getAllOffersRoute = {
    method: 'GET',
    path: '/api/offersPage', 
    handler: async (req, h) => {
        try {
            console.log("Running SQL query to fetch offers...");
            const { results } = await db.query(`
                SELECT o.offer_id, o.Id, o.discount, o.zip_code, r.name AS restaurant_name 
                FROM offers o
                JOIN restaurants r ON o.Id = r.id
            `);
            console.log("Query results:", results);
            return h.response(results); // Return the results within a response object
        } catch (error) {
            console.error('Error fetching offers:', error);
            return h.response(error).code(500);
        }
    }
};

