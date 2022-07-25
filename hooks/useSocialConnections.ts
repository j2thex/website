import React from 'react';
import { supabaseLogout } from '../lib/SupabaseConnector';
import { useEagerConnect } from './useEagerConnect';
import useMetaMask from './useMetaMask';
import useWallet from './useWallet';
import { useSaveAddressMutation, useSaveEmailMutation } from '../features/socials/socialsApi';

export default function useSocialConnections(supabaseUser: any) {
    const [sessionAccount, setSessionAccount] = React.useState<string>('');
    const [userEmail, setUserEmail] = React.useState<string>(supabaseUser?.email || '');

    const { active, account } = useWallet();
    const { supportedChain } = useMetaMask();
    const triedToEagerConnect = useEagerConnect();
    const [saveAddress] = useSaveAddressMutation();
    const [saveEmail] = useSaveEmailMutation();

    const isReady = React.useMemo(() => {
        return supportedChain && triedToEagerConnect && active && account;
    }, [supportedChain, triedToEagerConnect, active, account]);

    React.useEffect(() => {
        setUserEmail(supabaseUser?.email);
    }, [supabaseUser?.email]);

    React.useEffect(() => {
        if (isReady && account) {
            saveAddress({
                address: account,
            });
        }
    }, [isReady, account]);

    React.useEffect(() => {
        if (!sessionAccount) {
            setSessionAccount(account || '');
        } else {
            supabaseLogout();
            setUserEmail('');
            setSessionAccount(account || '');
        }
    }, [account]);

    React.useEffect(() => {
        if (userEmail && sessionAccount) {
            saveEmail({
                email: supabaseUser.email, 
                address: sessionAccount,
            });
        }
    }, [userEmail, sessionAccount]);
}
