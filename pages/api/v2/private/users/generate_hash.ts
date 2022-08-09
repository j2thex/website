import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromCookies } from '../../../../../helpers/getUserFromCookies';
import { getSignatureMessage } from '../../../../../helpers/getSignatureMessage';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = getUserFromCookies(req.cookies);
    const nonce = Number(process.hrtime.bigint());
    const hash = getSignatureMessage(user.email, nonce);

    res.status(200).json({ hash, timestamp: nonce });
}

export default handler;
