import { api } from '../../app/api';

export const referralApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchReferralToken: builder.query<{ token: string }, string>({
            query(account) {
                return {
                    url: `/private/users/referralToken?address=${account}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useFetchReferralTokenQuery } = referralApi;
