import { api } from '../../app/api';

export const referralApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchReferralToken: builder.query<{ token: string }, string>({
            query(account) {
                return {
                    url: `/private/referral/referral_token?address=${account}`,
                    method: 'GET',
                };
            },
        }),
        saveReferral: builder.mutation<void, string>({
            query(token) {
                return {
                    url: `/private/referral/save_referral`,
                    method: 'POST',
                    body: {
                        token,
                    },
                };
            },
        }),
    }),
});

export const { useFetchReferralTokenQuery, useSaveReferralMutation } = referralApi;
