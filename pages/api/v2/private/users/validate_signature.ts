import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromCookies } from '../../../../../helpers/getUserFromCookies';
import { getSignatureMessage } from '../../../../../helpers/getSignatureMessage';
import { appConfig } from '../../../../../config/app';
import { ethers } from 'ethers';
import { supabase } from '../../../../../lib/SupabaseConnector';
import { getUserFromDatabase } from '../../../../../helpers/getUserFromDatabase';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = getUserFromCookies(req.cookies);
    const timestamp = req.body.timestamp;
    const signature = req.body.signature;
    const userAddress = req.body.address;

    if (
        Number(process.hrtime.bigint()) >=
        timestamp + appConfig.validSignatureDuration
    ) {
        res.status(400).json({ error: 'The signature is no longer valid' });
    }

    const hash = getSignatureMessage(user.email, timestamp);
    const signer = await ethers.utils.verifyMessage(hash, signature);

    if (userAddress === signer) {
        const { id: userId, state } = await getUserFromDatabase(user.sub);
        await supabase.from('wallets').insert({
            address: userAddress,
            user_id: userId,
            state,
        });
        return res.status(200).json({ isValid: true });
    }

    res.status(400).json({ error: 'Failed to validate signature' });
}

export default handler;
