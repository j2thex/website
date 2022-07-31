import { api } from '../../app/api';
import jwt from 'jsonwebtoken';
import { Reward } from '../../app/types';

export const rewardsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchRewardsData: builder.query<Reward, string>({
            query(account) {
                return {
                    url: `/private/users/rewards/getRewardsData`,
                    method: 'POST',
                    body: jwt.sign(
                        { account },
                        process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || ''
                    ),
                };
            },
        }),
        updateDailyReward: builder.mutation<Reward, string>({
            query(account) {
                return {
                    url: `/private/users/rewards/updateDaily`,
                    method: 'POST',
                    body: jwt.sign(
                        { account },
                        process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || ''
                    ),
                };
            },
        }),
        resetStreakReward: builder.mutation<Reward, string>({
            query(account) {
                return {
                    url: `/private/users/rewards/resetStreak`,
                    method: 'POST',
                    body: jwt.sign(
                        { account },
                        process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || ''
                    ),
                };
            },
        }),
    }),
});

export const {
    useFetchRewardsDataQuery,
    useUpdateDailyRewardMutation,
    useResetStreakRewardMutation,
} = rewardsApi;
