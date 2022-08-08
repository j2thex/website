import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';
import DuckiesContractBuild from '../../../../../contracts/artifacts/contracts/Duckies.sol/Duckies.json';
import { getUserFromCookies } from '../../../../../helpers/getUserFromCookies';
import { supabase } from '../../../../../lib/SupabaseConnector';
import { appConfig } from '../../../../../config/app';

const generateJWTWithRef = async (ref: string, ref_id: number) => {
    const jwtPrivateKey = process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || '';
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_POLYGON_URL
    );

    const contract = new ethers.Contract(
        contractAddress,
        DuckiesContractBuild.abi,
        provider
    );

    const decimals = await contract.decimals();

    const payload = {
        ref,
        amt: appConfig.referralDuckiesAmount * appConfig.decimalBase ** decimals,
        ref_id,
    };

    const jwtToken = jwt.sign(payload, jwtPrivateKey);

    return jwtToken;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const userId = getUserFromCookies(req.cookies).sub;
    const { data } = await supabase
        .from('users')
        .select('id')
        .eq('uid', userId)
        .single();

    // TODO: get address from db
    const linkResponse = await generateJWTWithRef(
        req.query.address as string,
        data?.id as number,
    );

    res.status(200).json({ token: linkResponse });
}
