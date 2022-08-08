import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../../lib/SupabaseConnector';
import jwt from 'jsonwebtoken';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies['sb-access-token'];
    const jwtData = jwt.verify(token, process.env.JWT_SECRET || '');
    const userId = jwtData.sub as string;

    try {
        // TODO: make foreign key relations and fetch all data related to user in one call
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('uid', userId)
            .single();

        if (!data || error) {
            throw error || new Error('User does not exist');
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export default handler;
