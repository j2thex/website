import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { supabase } from '../../../../../../lib/SupabaseConnector';
import { withDuckiesSession } from '../../../../../../helpers/withDuckiesSession';
import { isPeriodPassed } from '../../../../../../helpers/isPeriodPassed';
import { appConfig } from '../../../../../../config/app';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userAddress = req.body.account;

    const token = jwt.sign(
        { metamaskAddress: userAddress },
        process.env.JWT_SECRET || ''
    );
    supabase.auth.setAuth(token);

    try {
        const { data } = await supabase
            .from('rewards')
            .select('*')
            .eq('address', userAddress)
            .single();

        if (!data) {
            await supabase
                .from('rewards')
                .insert({
                    address: userAddress,
                });

            return res.status(200).json({
                dailyReceivedAt: null,
                streakCount: 0,
            }); 
        }

        if (
            data.last_daily_received_at && 
            isPeriodPassed(
                2 * appConfig.dailyRewardDuration * 1000,
                data.last_daily_received_at
            ) &&
            data.daily_streak_count < appConfig.dailyStreakLength
        ) {
            await supabase
                .from('rewards')
                .update({
                    daily_streak_count: 0,
                })
                .match({
                    address: userAddress,
                });

            data.daily_streak_count = 0;
        }

        return res.status(200).json({
            dailyReceivedAt: data.last_daily_received_at ? `${data.last_daily_received_at}Z` : null,
            streakCount: data.daily_streak_count,
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export default withDuckiesSession(handler);
