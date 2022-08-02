import { api } from '../../app/api';

export const twitterApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchIsUserSubscribedOnTwitter: builder.query<boolean, string>({
            query(accountLink) {
                return {
                    url: `/api/v2/public/socials/twitter/isSubscribedOnYellow?accountLink=${accountLink}`,
                    method: 'GET',
                };
            },
        }),
    }),
});

export const {
    useFetchIsUserSubscribedOnTwitterQuery,
} = twitterApi;
