import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { loginWithProvider } from '../lib/SupabaseConnector';
import { isBrowser } from '../helpers';

const Auth: FC = (): JSX.Element => {
    const [authToken, setAuthToken] = React.useState<string>('');

    const router = useRouter();
    const query = router.query;

    const handleAuth = React.useCallback(() => {
        if (!query.provider) {
            router.push(`${window.location.origin}/duckies`);
        }

        loginWithProvider(
            query.provider as string,
            `${window.location.origin}/auth?action=returnUser`
        );
    }, [query]);

    React.useEffect(() => {
        const authTokenListener = setInterval(() => {
            const token = localStorage.getItem('supabase.auth.token');
            if (token) {
                setAuthToken(token);
                clearInterval(authTokenListener);
            }
        }, 200);

        return () => {
            clearInterval(authTokenListener);
        }
    }, []);

    const handleReturnUser = React.useCallback(() => {
        if (!authToken) {
            return;
        }

        router.push(
            `${window.location.origin.replace(
                window.location.protocol,
                'dapp:'
            )}/auth?action=saveUser&user_session=${authToken}`
        );
    }, [authToken]);

    const handleSaveUser = React.useCallback(() => {
        if (query.user_session && isBrowser()) {
            localStorage.setItem(
                'supabase.auth.token',
                query.user_session as string
            );

            window.location.href = `${window.location.origin}/duckies`;
        }
    }, [query, isBrowser]);

    React.useEffect(() => {
        switch (query.action) {
            case 'auth':
                handleAuth();
                break;
            case 'returnUser':
                handleReturnUser();
                break;
            case 'saveUser':
                handleSaveUser();
                break;
        }
    }, [handleAuth, handleReturnUser, handleSaveUser]);

    return <></>;
};

export default Auth;
