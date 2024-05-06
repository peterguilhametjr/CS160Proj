// /api/userPage/updateWalletById
const Boom = require('@hapi/boom');
import { db } from "../database";

export const addToWallet = {
    method: 'POST',
    path: '/api/userPage/updateWalletById', 
    handler: async (req, h) => {
        const { user_id, newAmount } = req.payload;
        // const id = req.params.id; // Get the id from the request parameters
        try {
            // Update restaurant data in the database
            const result = await db.query(`
            UPDATE users
            SET wallet = ?
            WHERE user_id = ?;
        `, [newAmount, user_id]);
        

            if (result.affectedRows === 0) {
                throw Boom.notFound(`No restaurant found with id ${user_id}`);
            }

            return h.response({
                message: 'Restaurant updated successfully',
                user_id: user_id, 
                wallet: newAmount
            }).code(200);
        } catch (error) {
            console.error('Database operation failed:', error);
            throw Boom.internal('An internal server error occurred', { error });
        }
    }
};
