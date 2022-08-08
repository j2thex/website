import React from 'react';
import { useAppSelector } from '../app/hooks';
import { useSaveReferralMutation } from '../features/referral/referralApi';

const useReferral = (refetchUserData: () => void) => {
    const [referralToken, setReferralToken] = React.useState<string | null>(
        null
    );
    const isSessionCookie = useAppSelector((state) => state.globals.isSessionCookie);

    const [saveReferral] = useSaveReferralMutation();

    React.useEffect(() => {
        const token = localStorage.getItem('referral_token');
        setReferralToken(token);
    }, []);

    React.useEffect(() => {
        const refetchWithReferral = async () => {
            await saveReferral(referralToken as string);
            refetchUserData();
        }

        if (referralToken && isSessionCookie) {
            refetchWithReferral();
            localStorage.removeItem('referral_token');
        }
    }, [referralToken, isSessionCookie]);

    return {
        referralToken,
    };
};

export default useReferral;
