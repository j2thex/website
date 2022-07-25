import { api } from '../../app/api';
import jwt from 'jsonwebtoken';
import { User } from '../../app/types';

export const socialsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        saveAddress: builder.mutation<void, User>({
            query(user) {
                return {
                    url: '/private/users/socials/saveAddress',
                    method: 'POST',
                    body: jwt.sign(
                        user,
                        process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || ''
                    ),
                };
            },
        }),
        saveEmail: builder.mutation<void, User>({
            query(user) {
                return {
                    url: '/private/users/socials/saveEmail',
                    method: 'POST',
                    body: jwt.sign(
                        user,
                        process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || ''
                    ),
                };
            },
        }),
    }),
});

export const { useSaveAddressMutation, useSaveEmailMutation } = socialsApi;
