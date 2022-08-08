import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromCookies } from '../../../../../helpers/getUserFromCookies';
import { supabase } from '../../../../../lib/SupabaseConnector';
import jwt from 'jsonwebtoken';

const extractRefFromJWT = (token: string) => {
    const jwtPrivateKey = process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || '';

    try {
        const data: any = jwt.verify(token, jwtPrivateKey);
        return data?.ref_id;
    } catch (error: any) {
        throw error;
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userId = getUserFromCookies(req.cookies).sub;
    const refId = extractRefFromJWT(req.body.token);

    await supabase
        .from('users')
        .update({
            ref_id: refId,
            updated_at: new Date().toISOString(),
        })
        .match({
            uid: userId,
        });

    res.status(200).end();
}
