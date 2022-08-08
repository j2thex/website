import { api } from '../../app/api';
import { User } from '../../app/types';
import { Session } from '@supabase/supabase-js';
import { setIsSessionCookie } from '../globals/globalsSlice';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchUser: builder.query<User, void>({
            query: () => '/private/users/me',
        }),
        setSessionCookie: builder.query<void, Session | null>({
            query: (session) => ({
                url: '/public/setSessionCookie',
                method: 'POST',
                body: {
                    event: session ? 'SIGNED_IN' : 'SIGNED_OUT',
                    session,
                },
            }),
            async onQueryStarted(session, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(setIsSessionCookie(!!session));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
    }),
});

export const { useFetchUserQuery, useSetSessionCookieQuery } = userApi;
