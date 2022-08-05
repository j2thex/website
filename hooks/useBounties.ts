import React from 'react';
import { dispatchAlert } from '../features/alerts/alertsSlice';
import useDuckiesContract from './useDuckiesContract';
import useWallet from './useWallet';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import useAffiliates from './useAffiliates';
import { isBrowser } from '../helpers/isBrowser';
import useMetaMask from './useMetaMask';
import { setIsPhoneOtpCompleted, setIsRewardsClaimProcessing } from '../features/globals/globalsSlice';
import { analytics } from '../lib/analitics';
import {
    useFetchMultipleTransactionsMutation,
    useFetchReferralTransactionMutation,
    useFetchSingleTransactionMutation,
} from '../features/transactions/transactionApi';
import { useFetchUserQuery } from '../features/users/userApi';
import { useFetchRewardsDataQuery, useResetStreakRewardMutation, useUpdateDailyRewardMutation } from '../features/rewards/rewardsApi';
import { appConfig } from '../config/app';
import { isPeriodPassed } from '../helpers/isPeriodPassed';
import { setBountiesArray, updateBountyByFid } from '../features/bounties/bountiesSlice';


export default function useBounties(bounties: any) {
    const [isSingleBountyProcessing, setIsSingleBountyProcessing] = React.useState<boolean>(false);
    const [isRewardsClaimed, setIsRewardsClaimed] = React.useState<boolean>(false);
    const [isReferralClaimed, setIsReferralClaimed] = React.useState<boolean>(false);
    const [phoneVerified, setIsPhoneVerified] = React.useState<boolean>(false);
    const [claimedAmount, setClaimedAmount] = React.useState<number>(0);

    const dispatch = useAppDispatch();
    const duckiesContract = useDuckiesContract();
    const { account, signer } = useWallet();
    const { affiliates, getAffiliatesRuleCompleted } = useAffiliates();
    const { isWalletConnected } = useMetaMask();

    const isBountyArrayInitialized = useAppSelector(state => state.bounties.isInitialized);
    const bountyItems: any[] = useAppSelector(state => state.bounties.bounties);
    const isRewardsClaimProcessing = useAppSelector(state => state.globals.isRewardsClaimProcessing);
    const isPhoneOtpCompleted = useAppSelector(state => state.globals.isPhoneOtpCompleted);
    const [fetchSingleTransaction] = useFetchSingleTransactionMutation();
    const [fetchReferralTransaction] = useFetchReferralTransactionMutation();
    const [fetchMultipleTransactions] = useFetchMultipleTransactionsMutation();
    const [updateDailyReward] = useUpdateDailyRewardMutation();
    const [resetStreakReward] = useResetStreakRewardMutation();

    const { data: rewardsData, refetch: refetchRewards } = useFetchRewardsDataQuery(account || '', {
        skip: !account,
    });

    const {
        data: fetchUserResponse,
        isSuccess: isFetchUserSuccessful,
        refetch: refetchUser
    } = useFetchUserQuery(account || '', {
        skip: !signer || !account,
    });

    React.useEffect(() => {
        if (isFetchUserSuccessful) {
            setIsPhoneVerified(fetchUserResponse.isPhoneVerified || false);
        }
    }, [fetchUserResponse, isFetchUserSuccessful]);

    const referral_token = React.useMemo(() => isBrowser() && localStorage.getItem('referral_token'), []);

    React.useEffect(() => {
        if (!isWalletConnected || !signer) {
            return;
        }

        (async () => {
            const referralLimit = +await duckiesContract?.connect(signer).getAccountBountyLimit('referral');
            setIsReferralClaimed(!referral_token || referralLimit === 1 || affiliates[0] > 0);
        })();
    }, [isWalletConnected, duckiesContract, isRewardsClaimed, affiliates, referral_token, signer]);

    const getClaimedBountyInfo = React.useCallback(async (bounty: any) => {
        let status = '';
        let additionalData: any = {};

        if (signer && !isRewardsClaimProcessing) {
            const bountyId = bounty.fid.split('-')[0];
            const claimedTimes = await duckiesContract?.connect(signer).getAccountBountyLimit(bounty.fid);

            switch (bountyId) {
                case 'affiliates':
                    const [level, key, value] = bounty.triggerPhrase.split(' ');
                    const result = getAffiliatesRuleCompleted(level, key, value);

                    if (claimedTimes === bounty.limit) {
                        status = 'claimed';
                    } else {
                        if (result) {
                            status = 'claim';
                        }
                    }
                    break;
                case 'phone':
                    if (claimedTimes === bounty.limit) {
                        status = 'claimed';
                    } else if (phoneVerified) {
                        status = 'claim';
                    }
                    break;
                case 'daily':
                    if (isPeriodPassed(appConfig.dailyRewardDuration * 1000, rewardsData?.dailyReceivedAt)) {
                        status = 'claim';
                    } else {
                        additionalData.claimedAt = rewardsData?.dailyReceivedAt || 0;
                    }
                    break;
                case 'weekly':
                    if ((rewardsData?.streakCount || 0) >= appConfig.dailyStreakLength) {
                        status = 'claim';
                    } else {
                        additionalData.streakCount = rewardsData?.streakCount || 0;
                    }
                    break;
                default:
            }
        }

        dispatch(updateBountyByFid({
            bounty: {
                ...bounty,
                status,
                additionalData,
            },
            fid: bounty.fid,
        }));
    }, [
        duckiesContract,
        signer,
        getAffiliatesRuleCompleted,
        phoneVerified,
        isRewardsClaimProcessing,
        rewardsData,
    ]);

    React.useEffect(() => {
        if (isPhoneOtpCompleted) {
            const phoneBounty = bounties.find((bounty: any) => bounty.fid === 'phone-otp');
            getClaimedBountyInfo(phoneBounty);
            dispatch(setIsPhoneOtpCompleted(false));
            refetchUser();
        }
    }, [
        isPhoneOtpCompleted,
        bounties,
        getClaimedBountyInfo,
    ]);

    React.useEffect(() => {
        if (bounties.length) {
            dispatch(setBountiesArray(bounties));
        }
    }, [bounties]);

    React.useEffect(() => {
        if (isBountyArrayInitialized) {
            bounties.forEach(getClaimedBountyInfo);
        }
    }, [
        bounties,
        isBountyArrayInitialized,
        getClaimedBountyInfo,
    ]);

    const bountiesToClaim = React.useMemo(() => {
        return bountyItems
            .filter(bounty => bounty.status === 'claim')
            .map(item => item.fid);
    }, [bountyItems]);

    const handleClaimReward = React.useCallback(async (id: string, isCaptchaNotResolved: boolean) => {
        const bountyToClaim = bountyItems.find((item: any) => item.fid === id);
        const bountyIdPrefix = bountyToClaim.fid.split('-')[0];

        if (bountyToClaim && signer && !isCaptchaNotResolved) {
            analytics({
                type: 'otherEvent',
                name: 'duckies_modal_claim_rewards',
                params: {
                    duckies_amount_claim: bountyToClaim.value,
                },
            });
            dispatch(setIsRewardsClaimProcessing(true));
            const { transaction } = await fetchSingleTransaction({
                bountyID: bountyToClaim.fid,
                account: account || '',
            }).unwrap()

            try {
                const tx = await signer.sendTransaction(transaction);
                const { status } = await tx.wait();
                if (status === 0) {
                    throw new Error('Transaction was reverted');
                }

                dispatch(dispatchAlert({
                    type: 'success',
                    title: 'Success',
                    message: 'You have successfully claimed the reward!',
                }));
                setIsRewardsClaimed(true);
                getClaimedBountyInfo(bountyToClaim);
                analytics({
                    type: 'otherEvent',
                    name: 'duckies_claim_rewards_success',
                    params: {
                        duckies_amount_claim: bountyToClaim.value,
                    },
                });
                if (bountyIdPrefix === 'weekly' && account) {
                    await resetStreakReward(account);
                    refetchRewards();
                }
                if (bountyIdPrefix === 'daily' && account) {
                    await updateDailyReward(account);
                    refetchRewards();
                }
            } catch (error) {
                dispatch(dispatchAlert({
                    type: 'error',
                    title: 'Error',
                    message: 'Something went wrong! Please, try again!',
                }));
                analytics({
                    type: 'otherEvent',
                    name: 'duckies_error',
                    params: {
                        errorMessage: 'Something went wrong during reward claim',
                    },
                });
            }
            dispatch(setIsRewardsClaimProcessing(false));
        }
    }, [
        signer,
        bountyItems,
        account,
        dispatch,
        setIsRewardsClaimed,
        getClaimedBountyInfo,
    ]);

    const getBountiesClaimableAmount = React.useCallback(() => {
        let amountToClaim = !isReferralClaimed ? 10000 : 0;
        let bountyTitles: string[] = !isReferralClaimed ? ['Newcomer reward'] : [];

        bountiesToClaim.forEach((bountyItem: string) => {
            const bounty = bountyItems.find(item => item.fid === bountyItem);

            if (bounty) {
                amountToClaim += bounty.value;
                bountyTitles.push(bounty.title);
            }
        });

        return [amountToClaim as number, bountyTitles as string[]];
    }, [bountyItems, bountiesToClaim, isReferralClaimed]);

    const handleClaimRewards = React.useCallback(async (amountToClaim: number, isCaptchaNotResolved: boolean, setIsCaptchaNotResolved: any, setShouldResetCaptcha: (value: boolean) => void) => {
        if (!signer
            || !account
            || isRewardsClaimProcessing
            || isSingleBountyProcessing
            || (isReferralClaimed && !bountiesToClaim.length)
            || isCaptchaNotResolved
        ) {
            return;
        }
        dispatch(setIsRewardsClaimProcessing(true));

        if (!isReferralClaimed && referral_token) {
            try {
                analytics({
                    type: 'otherEvent',
                    name: 'duckies_modal_claim_rewards',
                    params: {
                        duckies_amount_claim: 10000,
                    },
                });
                const { transaction } = await fetchReferralTransaction({
                    referralToken: referral_token || '',
                    account,
                }).unwrap();

                if (transaction) {
                    const tx = await signer.sendTransaction(transaction);
                    await tx.wait();
                    localStorage.removeItem('referral_token');
                    dispatch(dispatchAlert({
                        type: 'success',
                        title: 'Success',
                        message: 'You have successfully claimed the reward!',
                    }));
                    setIsRewardsClaimed(true);
                    analytics({
                        type: 'otherEvent',
                        name: 'duckies_claim_rewards_success',
                        params: {
                            duckies_amount_claim: 10000,
                        },
                    });
                } else {
                    localStorage.removeItem('referral_token');
                    dispatch(dispatchAlert({
                        type: 'error',
                        title: 'Error',
                        message: 'Something went wrong! Please, try again!',
                    }));
                    analytics({
                        type: 'otherEvent',
                        name: 'duckies_error',
                        params: {
                            errorMessage: 'Something went wrong during rewards claim',
                        },
                    });
                }
            } catch (error) {
                dispatch(dispatchAlert({
                    type: 'error',
                    title: 'Error',
                    message: 'Something went wrong! Please, try again!',
                }));
                analytics({
                    type: 'otherEvent',
                    name: 'duckies_error',
                    params: {
                        errorMessage: 'Something went wrong during rewards claim',
                    },
                });
            }
        } else {
            if (bountiesToClaim.length) {
                const bountyIdPrefixes = bountiesToClaim.map(bounty => bounty.split('-')[0]);
                const [claimableAmount]: any = getBountiesClaimableAmount();
                setClaimedAmount(claimableAmount);

                analytics({
                    type: 'otherEvent',
                    name: 'duckies_modal_claim_rewards',
                    params: {
                        duckies_amount_claim: amountToClaim,
                    },
                });

                const { transaction } = await fetchMultipleTransactions({
                    bountyIDs: bountiesToClaim,
                    account,
                }).unwrap();

                try {
                    const tx = await signer.sendTransaction(transaction);
                    const { status } = await tx.wait();
                    if (status === 0) {
                        throw new Error('Transaction was reverted');
                    }

                    dispatch(dispatchAlert({
                        type: 'success',
                        title: 'Success',
                        message: 'You have successfully claimed the reward!',
                    }));

                    setIsRewardsClaimed(true);
                    bountiesToClaim.forEach((bountyFid: string) => {
                        const bounty = bountyItems.find(item => item.fid === bountyFid);
                        getClaimedBountyInfo(bounty);
                    });

                    analytics({
                        type: 'otherEvent',
                        name: 'duckies_claim_rewards_success',
                        params: {
                            duckies_amount_claim: amountToClaim,
                        },
                    });
                    if (bountyIdPrefixes.includes('weekly') && account) {
                        await resetStreakReward(account);
                        refetchRewards();
                    }
                    if (bountyIdPrefixes.includes('daily') && account) {
                        await updateDailyReward(account);
                        refetchRewards();
                    }
                } catch (error) {
                    dispatch(dispatchAlert({
                        type: 'error',
                        title: 'Error',
                        message: 'Something went wrong! Please, try again!',
                    }));
                    analytics({
                        type: 'otherEvent',
                        name: 'duckies_error',
                        params: {
                            errorMessage: 'Something went wrong during rewards claim',
                        },
                    });
                }
            }
        }

        setShouldResetCaptcha(true);
        setIsCaptchaNotResolved(true);
        dispatch(setIsRewardsClaimProcessing(false));
    }, [
        account,
        signer,
        isRewardsClaimProcessing,
        isSingleBountyProcessing,
        isReferralClaimed,
        bountiesToClaim,
        dispatch,
        referral_token,
        getClaimedBountyInfo,
        getBountiesClaimableAmount,
    ]);

    return {
        bountyItems,
        bountiesToClaim,
        handleClaimReward,
        isRewardsClaimProcessing,
        isRewardsClaimed,
        setIsRewardsClaimed,
        isSingleBountyProcessing,
        setIsSingleBountyProcessing,
        isReferralClaimed,
        setIsReferralClaimed,
        handleClaimRewards,
        referral_token,
        getBountiesClaimableAmount,
        getClaimedBountyInfo,
        claimedAmount,
    };
}
