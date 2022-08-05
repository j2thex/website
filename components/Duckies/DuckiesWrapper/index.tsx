import React, { FC } from 'react';
import { DuckiesHero} from '../DuckiesHero';
import { DuckiesAffiliates} from '../DuckiesAffiliates';
import { DuckiesEarnMore} from '../DuckiesEarnMore';
import { DuckiesRedeem} from '../DuckiesRedeem';
import { dispatchAlert } from '../../../features/alerts/alertsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { DuckiesFAQ } from '../DuckiesFAQ';
import { useRouter } from 'next/router';
import { MetamaskConnectModal } from '../Modals/MetamaskConnectModal';
import { SocialAuthModal } from '../Modals/SocialAuthModal';
import { ClaimRewardModal } from '../Modals/ClaimRewardModal';
import useMetaMask from '../../../hooks/useMetaMask';
import useWallet from '../../../hooks/useWallet';
import { DuckiesPrizes } from '../DuckiesPrizes'
import { DuckiesPrizesList } from '../DuckiesPrizes/defaults';
import { DuckiesBanned } from '../DuckiesBanned';
import { useFetchUserQuery } from '../../../features/users/userApi';
import useSession from '../../../hooks/useSocialSession';

interface DuckiesLayoutProps {
    bounties: any;
    faqList: any;
}

export const DuckiesLayout: FC<DuckiesLayoutProps> = ({ bounties, faqList }: DuckiesLayoutProps): JSX.Element => {
    const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
    const [currentModal, setCurrentModal] = React.useState<string>('');
    const { items } = bounties?.data.slices[0];

    const { isWalletConnected } = useMetaMask();
    const { account } = useWallet();
    const { isSocialSession } = useSession();

    const [userStatus, setUserStatus] = React.useState<string>('');

    const dispatch = useAppDispatch();
    const router = useRouter();
    const query = router.query;
    const { data: fetchUserResponse, isSuccess: isFetchUserSuccessful } = useFetchUserQuery(account || '', {
        skip: !isWalletConnected,
    });

    React.useEffect(() => {
        if (isFetchUserSuccessful) {
            setUserStatus(fetchUserResponse.status || '');
        }
    }, [fetchUserResponse, isFetchUserSuccessful]);


    React.useEffect(() => {
        if (query.error) {
            dispatch(dispatchAlert({
                type: 'error',
                title: 'Server error',
                message: query.error_description?.toString() || '',
            }));
        }
        router.replace('/duckies');
    }, []);

    React.useEffect(() => {
        if ((isWalletConnected && currentModal === 'metamask') || (isSocialSession && currentModal === 'social_auth')) {
            handleCloseModal();
        }
    }, [isWalletConnected, isSocialSession, currentModal]);

    const handleOpenModal = React.useCallback(() => {
        setIsOpenModal(true);

        if (!isSocialSession) {
            setCurrentModal('social_auth');
            return;
        }

        if (!isWalletConnected) {
            setCurrentModal('metamask');
            return;
        }

        setCurrentModal('rewards');
    }, [isWalletConnected, isSocialSession]);

    const handleOpenMetamaskModal = React.useCallback(() => {
        setIsOpenModal(true);

        if (!isWalletConnected) {
            setCurrentModal('metamask');
        } else {
            handleCloseModal();
        }
    }, [isWalletConnected]);

    const handleCloseModal = React.useCallback(() => {
        setIsOpenModal(false);
        setCurrentModal('');
    }, []);

    const renderContent = React.useMemo(() => {
        if (userStatus !== 'banned') {
            return (
                <div className="bg-primary-cta-color-60">
                    <DuckiesHero
                        bountiesItems={items}
                        handleOpenModal={handleOpenModal}
                    />
                    <DuckiesAffiliates
                        bountyTitle={bounties.data.title}
                        bountiesItems={items}
                        handleOpenModal={handleOpenModal}
                    />
                    <DuckiesEarnMore
                        handleOpenModal={handleOpenMetamaskModal}
                    />
                    <DuckiesRedeem />
                    <DuckiesPrizes prizes={DuckiesPrizesList} />
                    <DuckiesFAQ
                        faqList={faqList}
                    />
                    <MetamaskConnectModal
                        isOpenModal={isOpenModal && currentModal === 'metamask'}
                        setIsOpenModal={handleCloseModal}
                    />
                    <SocialAuthModal
                        isOpenModal={isOpenModal && currentModal === 'social_auth'}
                        setIsOpenModal={handleCloseModal}
                    />
                    <ClaimRewardModal
                        bounties={items}
                        isOpenModal={isOpenModal && currentModal !== 'metamask' && currentModal !== 'social_auth'}
                        setIsOpenModal={handleCloseModal}
                    />
                </div>
            );
        } else {
             return <DuckiesBanned />;
        }
    }, [
        isSocialSession,
        items,
        handleCloseModal,
        handleOpenModal,
        handleOpenMetamaskModal,
        currentModal,
        isOpenModal,
        DuckiesPrizesList,
        faqList,
        userStatus,
    ]);

    return (
        <main className="h-full bg-primary-cta-color-60 pb-[5rem] md:pb-[7.5rem] no-scrollbar">
            {renderContent}
        </main>
    );
};
