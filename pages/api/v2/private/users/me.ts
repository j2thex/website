import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../../lib/SupabaseConnector';
import { getUserFromCookies } from '../../../../../helpers/getUserFromCookies';
import { getUserFromDatabase } from '../../../../../helpers/getUserFromDatabase';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userId = getUserFromCookies(req.cookies).sub;

    try {
        const data = await getUserFromDatabase(userId);

        if (!data) {
            throw new Error('User does not exist');
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export default handler;
