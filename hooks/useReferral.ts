import React from 'react';

const useReferral = () => {
    const [referralToken, setReferralToken] = React.useState<string | null>(null);

    React.useEffect(() => {
        const token = localStorage.getItem('referral_token');
        setReferralToken(token);
    }, []);

    return {
        referralToken,
    };
};

export default useReferral;
