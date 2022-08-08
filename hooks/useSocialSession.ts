import { Session, User } from '@supabase/supabase-js';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { useFetchUserQuery, useSetSessionCookieQuery } from '../features/users/userApi';
import { supabase } from '../lib/SupabaseConnector';

const useSocialSession = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [session, setSession] = React.useState<Session | null>(null);
    const [userData, setUserData] = React.useState<any>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [isSocialSession, setIsSocialSession] = React.useState<boolean>(false);

    const isSessionCookie = useAppSelector((state) => state.globals.isSessionCookie);

    const {
        data: fetchUserResponse,
        isSuccess: isFetchUserSuccessful,
        refetch: refetchUser
    } = useFetchUserQuery(undefined, {
        skip: !isSocialSession || !isSessionCookie,
    });
    useSetSessionCookieQuery(session);

    React.useEffect(() => {
        if (isFetchUserSuccessful) {
            setUserData(fetchUserResponse);
        }
    }, [isFetchUserSuccessful, fetchUserResponse]);

    const handleSession = React.useCallback((session: any) => {
        if (session?.user?.id) {
            setUser(session.user);
            setToken(session.access_token);
            setIsSocialSession(true);
            setSession(session);
        } else {
            setUser(null);
            setToken(null);
            setIsSocialSession(false);
            setUserData(null);
            setSession(null);
        }
    }, []);

    React.useEffect(() => {
        const supabaseSession = supabase.auth.session();
        handleSession(supabaseSession);
        const { data: listenter } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
            handleSession(session);
        });

        return () => {
            listenter?.unsubscribe();
        }
    }, [supabase, handleSession]);

    return {
        user,
        token,
        isSocialSession,
        userData,
        refetchUserData: refetchUser,
    };
};

export default useSocialSession;
