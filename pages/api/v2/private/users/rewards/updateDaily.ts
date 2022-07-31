import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { supabase } from '../../../../../../lib/SupabaseConnector';
import { withDuckiesSession } from '../../../../../../helpers/withDuckiesSession';
import { appConfig } from '../../../../../../config/app';
import { isPeriodPassed } from '../../../../../../helpers/isPeriodPassed';

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

        if (
            !data ||
            !isPeriodPassed(
                appConfig.dailyRewardDuration * 1000,
                data.last_daily_received_at
            )
        ) {
            throw 'Updating of daily reward is not allowed';
        }

        const updatedData = {
            dailyReceivedAt: new Date(),
            streakCount:
                data.daily_streak_count >= appConfig.dailyStreakLength
                    ? appConfig.dailyStreakLength
                    : data.daily_streak_count + 1,
        };

        await supabase
            .from('rewards')
            .update({
                last_daily_received_at:
                    updatedData.dailyReceivedAt.toISOString(),
                daily_streak_count: updatedData.streakCount,
            })
            .match({
                address: userAddress,
            });

        return res.status(200).json({
            dailyReceivedAt: data.last_daily_received_at,
            streakCount: data.daily_streak_count,
        });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export default withDuckiesSession(handler);
