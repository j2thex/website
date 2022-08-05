import React from 'react';
import { supabase } from '../lib/SupabaseConnector';

const useSocialSession = () => {
    const [user, setUser] = React.useState<any>(null);
    const [token, setToken] = React.useState<string | null>(null);
    const [isSocialSession, setIsSocialSession] = React.useState<boolean>(false);

    const handleSession = React.useCallback((session: any) => {
        if (session?.user?.id) {
            setUser(session.user);
            setToken(session.access_token);
            setIsSocialSession(true);
        } else {
            setUser(null);
            setToken(null);
            setIsSocialSession(false);
        }
    }, []);

    React.useEffect(() => {
        const supabaseSession = supabase.auth.session();
        handleSession(supabaseSession);
        supabase.auth.onAuthStateChange((_event: any, session: any) => {
            handleSession(session);
        });
    }, [supabase, handleSession]);

    return {
        user,
        token,
        isSocialSession,
    };
};

export default useSocialSession;
