import { api } from '../../app/api';
import jwt from 'jsonwebtoken';
import { User } from '../../app/types';

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchUser: builder.query<User, string>({
            query: (account) => ({
                url: '/private/users/me',
                method: 'POST',
                body: jwt.sign(
                    {
                        account,
                    },
                    process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || ''
                ),
            }),
        }),
    }),
});

export const { useFetchUserQuery } = userApi;
