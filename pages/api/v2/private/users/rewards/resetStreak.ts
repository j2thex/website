import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { supabase } from '../../../../../../lib/SupabaseConnector';
import { withDuckiesSession } from '../../../../../../helpers/withDuckiesSession';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userAddress = req.body.account;

    const token = jwt.sign(
        { metamaskAddress: userAddress },
        process.env.JWT_SECRET || ''
    );
    supabase.auth.setAuth(token);

    try {
        await supabase
            .from('rewards')
            .update({
                daily_streak_count: 0,
            })
            .match({
                address: userAddress,
            });
        return res.status(200).json({});
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export default withDuckiesSession(handler);
