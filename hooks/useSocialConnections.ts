import React from 'react';
import { supabaseLogout } from '../lib/SupabaseConnector';
import useMetaMask from './useMetaMask';
import useWallet from './useWallet';
import { useSaveAddressMutation, useSaveEmailMutation } from '../features/socials/socialsApi';

export default function useSocialConnections(supabaseUser: any) {
    const [sessionAccount, setSessionAccount] = React.useState<string>('');
    const [userEmail, setUserEmail] = React.useState<string>(supabaseUser?.email || '');

    const { account } = useWallet();
    const { isWalletConnected } = useMetaMask();
    const [saveAddress] = useSaveAddressMutation();
    const [saveEmail] = useSaveEmailMutation();

    React.useEffect(() => {
        setUserEmail(supabaseUser?.email);
    }, [supabaseUser?.email]);

    React.useEffect(() => {
        if (isWalletConnected && account) {
            saveAddress({
                address: account,
            });
        }
    }, [isWalletConnected, account]);

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
