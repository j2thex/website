import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../../lib/SupabaseConnector';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    supabase.auth.api.setAuthCookie(req, res);
    res.status(200).end();
}
