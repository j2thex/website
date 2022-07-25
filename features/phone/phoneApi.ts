import { api } from '../../app/api';
import jwt from 'jsonwebtoken';
import { User } from '../../app/types';

export const phoneApi = api.injectEndpoints({
    endpoints: (builder) => ({
        verifyPhone: builder.mutation<{ suceess: boolean }, User>({
            query(user) {
                return {
                    url: '/private/users/phone/verify',
                    method: 'POST',
                    body: jwt.sign(
                        user,
                        process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || ''
                    ),
                };
            },
        }),
        sendPhoneVerification: builder.mutation<void, User>({
            query(user) {
                return {
                    url: '/private/users/phone/send',
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

export const { useVerifyPhoneMutation, useSendPhoneVerificationMutation } = phoneApi;
