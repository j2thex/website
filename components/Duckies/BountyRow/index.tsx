import React from 'react';
import classnames from 'classnames';
import { convertNumberToLiteral } from '../../../helpers/convertNumberToLiteral';
import { DuckiesModalWindow } from '../DuckiesModalWindow';
import Image from 'next/image';
import { loginWithProvider } from '../../../lib/SupabaseConnector';
import { OTPModal } from '../OTPModal';
import { Decimal } from '../../Decimal';
import { Captcha } from '../Captcha';
import { analytics } from '../../../lib/analitics';
import { isBrowser } from '../../../helpers';
import { isPeriodPassed } from '../../../helpers/isPeriodPassed';
import { appConfig } from '../../../config/app';
import { useSetMobileDevice } from '../../../hooks/useMobileDevice';

export interface BountyItem {
    fid: string;
    description: string;
    limit: number;
    title: string;
    triggerPhrase: string;
    value: number;
    status: string;
    additionalData: any;
}

interface BountyProps {
    bounty: BountyItem;
    handleClaim: (id: string, isCaptchaNotResolved: boolean) => void;
    index: number;
    isLoading: boolean;
    isSingleBountyProcessing: boolean;
    setIsSingleBountyProcessing: (value: boolean) => void;
    supabaseUser: any;
    getClaimedBountyInfo: (bounty: any) => Promise<void>;
}

export const BountyRow: React.FC<BountyProps> = ({
    bounty,
    handleClaim,
    index,
    isLoading,
    isSingleBountyProcessing,
    setIsSingleBountyProcessing,
    supabaseUser,
    getClaimedBountyInfo,
}: BountyProps) => {
    const [isOpenShow, setIsOpenShow] = React.useState<boolean>(false);
    const [isOpenClaim, setIsOpenClaim] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isCaptchaNotResolved, setIsCaptchaNotResolved] = React.useState<boolean>(true);
    const [shouldResetCaptcha, setShouldResetCaptcha] = React.useState<boolean>(false);
    const isMobile = useSetMobileDevice();

    const isClaimStatus = React.useMemo(() => (
        bounty.status === 'claim' && !((loading && isSingleBountyProcessing) || (isLoading && !isSingleBountyProcessing))
    ), [bounty.status, loading, isLoading, isSingleBountyProcessing]);

    const rowClassName = React.useMemo(() => {
        return classnames('h-1/4 sm:h-auto flex w-full items-center border-b border-color-divider-color-40 px-1', {
            'bg-primary-cta-color-10': isClaimStatus,
        });
    }, [isClaimStatus]);

    const indexClassName = React.useMemo(() => {
        return classnames('py-1 px-2.5 text-sm sm:text-base w-[1.125rem] sm:w-7 h-8 flex items-center justify-center font-metro-semibold sm:font-metro-bold rounded-sm mr-4 bg-neutral-control-color-30', {
            'bg-primary-cta-color-40': isClaimStatus,
        });
    }, [isClaimStatus]);

    const showMoreClassName = React.useMemo(() => {
        return classnames('border lg:group-hover:border-primary-cta-color-40 lg:group-hover:bg-primary-cta-color-40 rounded-[0.1875px] lg:px-2 text-xs leading-6 text-neutral-control-layer-color-90 font-gilmer-bold cursor-pointer w-fit flex items-center hover:text-text-color-100', {
            'border-neutral-control-color-40 bg-neutral-control-color-40': !isClaimStatus,
            'border-primary-cta-color-80': isClaimStatus,
        });
    }, [isClaimStatus]);

    const claimButtonClassName = React.useMemo(() => {
        return classnames('button__inner', {
            'cursor-not-allowed': isCaptchaNotResolved,
        });
    },[isCaptchaNotResolved]);

    const claimButtonContainerClassName = React.useMemo(() => {
        return classnames({
            'px-7 py-1.5 bg-neutral-control-color-40 rounded-sm text-neutral-control-layer-color-40 cursor-not-allowed': isCaptchaNotResolved,
            'button button--outline button--secondary button--shadow-secondary': !isCaptchaNotResolved,
        });
    },[isCaptchaNotResolved]);

    const duckiesColor = React.useMemo(() => bounty.status === 'claim' ? '#ECAA00' : '#525252', [bounty.status]);

    const handleClaimReward = React.useCallback(async () => {
        setShouldResetCaptcha(true);

        if (!isCaptchaNotResolved) {
            setLoading(true);
            setIsSingleBountyProcessing(true);
            setIsOpenClaim(false);
            setIsCaptchaNotResolved(true);
            await handleClaim(bounty.fid, false);
            setLoading(false);
            setIsSingleBountyProcessing(false)
        }
    }, [handleClaim, bounty.fid, isCaptchaNotResolved, setIsSingleBountyProcessing]);

    const handleSelectBountyId = React.useCallback(() => {
        setIsOpenShow(true);
        analytics({
            type: 'otherEvent',
            name: 'duckies_bounties_show_more_details_click',
            params: {
                bounty_id: bounty.fid,
            },
        });
    }, [bounty]);

    const handleClickClaimReward = React.useCallback(() => {
        setIsOpenClaim(true);

        analytics({
            type: 'otherEvent',
            name: 'duckies_bounties_claim_click',
        });
    }, []);

    React.useEffect(() => {
        if (!bounty.fid.includes('daily') || bounty.status === 'claim' || isPeriodPassed(appConfig.dailyRewardDuration * 1000, bounty?.additionalData?.claimedAt)) {
            return;
        }

        const timeBeforeClaim = +new Date(bounty?.additionalData?.claimedAt || 0) + appConfig.dailyRewardDuration * 1000 - +new Date();
        const dailyRewardTimeout = setTimeout(() => {
            getClaimedBountyInfo(bounty);
        }, timeBeforeClaim + 1000);

        return () => {
            clearTimeout(dailyRewardTimeout);
        }
    }, [bounty, getClaimedBountyInfo]);

    const renderBountyStatus = React.useMemo(() => {
        if ((loading && isSingleBountyProcessing) || (bounty.status === 'claim' && isLoading && !isSingleBountyProcessing)) {
            return (
                <div className="text-sm sm:text-base text-system-yellow-60">
                    Processing...
                </div>
            );
        }

        switch (bounty.status) {
            case 'claim':
                return !isMobile && (
                    <div onClick={handleClickClaimReward} className="button button--outline button--secondary button--shadow-secondary">
                        <span className="button__inner">Claim</span>
                    </div>
                );
            case 'claimed':
                return (
                    <div className="text-sm sm:text-base text-system-green-60">
                        Claimed
                    </div>
                );
            default:
                return null;
        }
    }, [bounty, loading, isLoading, isSingleBountyProcessing, handleClickClaimReward, isMobile]);

    const renderBounty = React.useMemo(() => {
        return (
            <div className={rowClassName}>
                <div onClick={handleSelectBountyId} className="group cursor-pointer flex flex-row items-center py-[1.0625rem] w-full">
                    <div className={indexClassName}>
                        {index}
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="text-lg text-text-color-100">
                            {bounty.title}
                        </div>
                        <div className={showMoreClassName}>
                            <span className="hidden lg:block">Show more details</span>
                            <span className="px-1.5">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.58064 11.81L6.19177 11.4249C6.06393 11.2915 6 11.1357 6 10.9578C6 10.7762 6.06393 10.6222 6.19177 10.4956L8.7114 8.00002L6.19184 5.50449C6.06401 5.37784 6.00007 5.22382 6.00007 5.04233C6.00007 4.86435 6.06401 4.70855 6.19184 4.5751L6.58071 4.19512C6.71197 4.06502 6.86928 4 7.05247 4C7.23908 4 7.3946 4.06509 7.519 4.1951L10.8939 7.53784C11.0252 7.66113 11.0909 7.8151 11.0909 8C11.0909 8.18143 11.0252 8.33722 10.8939 8.46719L7.519 11.81C7.3911 11.9366 7.23559 12 7.05247 12C6.87269 12 6.71548 11.9366 6.58064 11.81Z" fill="black"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center text-2xl font-gilmer-medium text-text-color-100">
                    <div className="pr-2.5">
                        {renderBountyStatus}
                    </div>
                    <div className="flex items-center justify-end w-36">
                        <span className="mr-1">{convertNumberToLiteral(bounty.value)}</span>
                        <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.51487 3.11111H0V24.8889H9.51487C15.9624 24.8889 20 20.2844 20 14C20 7.59111 15.8998 3.11111 9.51487 3.11111ZM9.42097 21.0311H4.25665V6.93778H9.42097C13.1768 6.93778 15.6808 9.76889 15.6808 13.9067C15.6808 18.1067 13.1768 21.0311 9.42097 21.0311Z" fill={duckiesColor}/>
                            <path d="M3.92 0H7.04989V6.22222H3.92V0Z" fill={duckiesColor}/>
                            <path d="M3.92 21.7778H7.04989V28H3.92V21.7778Z" fill={duckiesColor}/>
                            <path d="M8.61484 0H11.7447V6.22222H8.61484V0Z" fill={duckiesColor}/>
                            <path d="M8.61484 21.7778H11.7447V28H8.61484V21.7778Z" fill={duckiesColor}/>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }, [
        bounty.value,
        bounty.title,
        index,
        renderBountyStatus,
        duckiesColor,
        indexClassName,
        rowClassName,
        showMoreClassName,
        handleSelectBountyId,
    ]);

    const renderMobileBounty = React.useMemo(() => {
        return (
            <div className={rowClassName}>
                <div onClick={handleSelectBountyId} className="group cursor-pointer flex flex-row items-center py-[1.0625rem] w-1/2">
                    <div className={indexClassName}>
                        {index}
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="text-sm text-text-color-100">
                            {bounty.title}
                        </div>

                    </div>
                </div>
                <div className="flex items-center text-lg sm:text-2xl leading-[1.625rem] font-gilmer-medium text-text-color-100 w-1/2 justify-end gap-3">
                    {bounty.status === 'claim' ? (
                        <div onClick={handleClickClaimReward} className="button button--outline button--secondary button--shadow-secondary">
                            <span className="button__inner !px-[1.125rem]">Claim</span>
                        </div>
                    ) : (
                        <div className="flex flex-col" onClick={handleSelectBountyId}>
                            <div className="flex items-center">
                                <span className="mr-1">{convertNumberToLiteral(bounty.value)}</span>
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.76291 4.38889H3.10156V17.6111H8.76291C12.5992 17.6111 15.0016 14.8156 15.0016 11C15.0016 7.10889 12.562 4.38889 8.76291 4.38889ZM8.70704 15.2689H5.63427V6.71222H8.70704C10.9418 6.71222 12.4316 8.43111 12.4316 10.9433C12.4316 13.4933 10.9418 15.2689 8.70704 15.2689Z" fill="#8E8E8E"/>
                                    <path d="M5.43396 2.5H7.29625V6.27778H5.43396V2.5Z" fill="#8E8E8E"/>
                                    <path d="M5.43396 15.7222H7.29625V19.5H5.43396V15.7222Z" fill="#8E8E8E"/>
                                    <path d="M8.22739 2.5H10.0897V6.27778H8.22739V2.5Z" fill="#8E8E8E"/>
                                    <path d="M8.22739 15.7222H10.0897V19.5H8.22739V15.7222Z" fill="#8E8E8E"/>
                                </svg>
                            </div>
                            <span className="w-full flex justify-end">
                                {renderBountyStatus}
                            </span>
                        </div>
                    )}
                    <div className={showMoreClassName} onClick={handleSelectBountyId}>
                        <span className="p-1">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.58064 11.81L6.19177 11.4249C6.06393 11.2915 6 11.1357 6 10.9578C6 10.7762 6.06393 10.6222 6.19177 10.4956L8.7114 8.00002L6.19184 5.50449C6.06401 5.37784 6.00007 5.22382 6.00007 5.04233C6.00007 4.86435 6.06401 4.70855 6.19184 4.5751L6.58071 4.19512C6.71197 4.06502 6.86928 4 7.05247 4C7.23908 4 7.3946 4.06509 7.519 4.1951L10.8939 7.53784C11.0252 7.66113 11.0909 7.8151 11.0909 8C11.0909 8.18143 11.0252 8.33722 10.8939 8.46719L7.519 11.81C7.3911 11.9366 7.23559 12 7.05247 12C6.87269 12 6.71548 11.9366 6.58064 11.81Z" fill="black"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        );
    }, [
        bounty.value,
        bounty.title,
        index,
        renderBountyStatus,
        indexClassName,
        rowClassName,
        showMoreClassName,
        handleSelectBountyId,
    ]);

    const renderDetailsModalBody = React.useMemo(() => {
        return (
            <div className="flex flex-col w-full">
                <div className="bg-primary-cta-color-10 w-full flex justify-center py-3 mb-4">
                    <div className="text-text-color-100 text-2xl font-gilmer-bold flex items-center">
                        {Decimal.format(bounty.value, 0, ',')}
                        <svg className="ml-3" width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.51487 3.11111H0V24.8889H9.51487C15.9624 24.8889 20 20.2844 20 14C20 7.59111 15.8998 3.11111 9.51487 3.11111ZM9.42097 21.0311H4.25665V6.93778H9.42097C13.1768 6.93778 15.6808 9.76889 15.6808 13.9067C15.6808 18.1067 13.1768 21.0311 9.42097 21.0311Z" fill="#ECAA00" />
                            <path d="M3.92 0H7.04989V6.22222H3.92V0Z" fill="#ECAA00" />
                            <path d="M3.92 21.7778H7.04989V28H3.92V21.7778Z" fill="#ECAA00" />
                            <path d="M8.61484 0H11.7447V6.22222H8.61484V0Z" fill="#ECAA00" />
                            <path d="M8.61484 21.7778H11.7447V28H8.61484V21.7778Z" fill="#ECAA00" />
                        </svg>
                    </div>
                </div>
                <div className="text-text-color-100 text-sm text-center font-metro-regular font-medium mb-6">
                    {bounty.description}
                </div>
                <div className="flex items-center justify-center">
                    <div className="button button--outline button--secondary button--shadow-secondary" onClick={() => setIsOpenShow(false)}>
                        <span className="button__inner">OK</span>
                    </div>
                </div>
            </div>
        );
    }, [bounty]);

    const renderClaimRewardModalBody = React.useMemo(() => {
        return (
            <div className="flex flex-col">
                <div className="text-text-color-100 text-base text-center font-metro-regular font-semibold mb-1">
                    Amount to claim for completed<br/>
                    &quot;{bounty.title}&quot;<br/>
                    bounty
                </div>
                <div className="bg-primary-cta-color-10 w-full flex justify-center py-3 mb-4">
                    <div className="text-text-color-100 text-2xl font-gilmer-bold flex items-center">
                        {Decimal.format(+bounty.value || 0, 0, ',')}
                        <svg className="ml-3" width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.51487 3.11111H0V24.8889H9.51487C15.9624 24.8889 20 20.2844 20 14C20 7.59111 15.8998 3.11111 9.51487 3.11111ZM9.42097 21.0311H4.25665V6.93778H9.42097C13.1768 6.93778 15.6808 9.76889 15.6808 13.9067C15.6808 18.1067 13.1768 21.0311 9.42097 21.0311Z" fill="#ECAA00" />
                            <path d="M3.92 0H7.04989V6.22222H3.92V0Z" fill="#ECAA00" />
                            <path d="M3.92 21.7778H7.04989V28H3.92V21.7778Z" fill="#ECAA00" />
                            <path d="M8.61484 0H11.7447V6.22222H8.61484V0Z" fill="#ECAA00" />
                            <path d="M8.61484 21.7778H11.7447V28H8.61484V21.7778Z" fill="#ECAA00" />
                        </svg>
                    </div>
                </div>
                <div className="text-text-color-100 text-sm text-center font-metro-regular font-medium mb-6">
                    {bounty.description}
                </div>
                <div className="flex justify-center mb-5">
                    <Captcha
                        shouldResetCaptcha={shouldResetCaptcha}
                        setShouldResetCaptcha={setShouldResetCaptcha}
                        handleResolveCaptcha={() => setIsCaptchaNotResolved(!isCaptchaNotResolved)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <div className={claimButtonContainerClassName} onClick={handleClaimReward}>
                        <button className={claimButtonClassName} disabled={isCaptchaNotResolved}>Claim reward</button>
                    </div>
                </div>
            </div>
        );
    }, [
        bounty,
        handleClaimReward,
        shouldResetCaptcha,
        isCaptchaNotResolved,
        claimButtonClassName,
        claimButtonContainerClassName,
    ]);

    const renderLoadingModalBody = React.useMemo(() => {
        return (
            <div className="flex flex-col">
                <div className="text-text-color-100 text-sm text-center font-metro-regular font-medium mb-6">
                    A tiny amount of MATIC will be charged to cover the network fee. Please wait for the transaction to be completed. Time may vary depending on the Polygon Network congestion.
                </div>
                <div className="flex items-center justify-center">
                    <div className="button button--outline button--secondary button--shadow-secondary" onClick={() => setIsOpenClaim(false)}>
                        <span className="button__inner">Confirm</span>
                    </div>
                </div>
            </div>
        );
    }, []);

    const renderClaimModalBody = React.useMemo(() => {
        return (
            <div className="flex flex-col w-full">
                <div className="flex justify-center mb-4">
                    <Image width="156px" height="156px" src="/images/components/duckies/duckDetective.png" alt="duck-no-rewards" />
                </div>
                {(isLoading || isSingleBountyProcessing) ? renderLoadingModalBody : renderClaimRewardModalBody}
            </div>
        );
    }, [isLoading, renderLoadingModalBody, renderClaimRewardModalBody, isSingleBountyProcessing]);

    const handleSocialAuth = React.useCallback((provider: string) => {
        if (isBrowser()) {
            loginWithProvider(provider, window.location.href);
        }
    }, [isBrowser]);

    const renderSocialsModalBody = React.useMemo(() => {
        return (
            <div className="flex flex-col w-full p-0.5">
                <div className="flex justify-center mb-4">
                    <Image width="156px" height="156px" src="/images/components/duckies/duckiesGroup.png" alt="duckies-group" />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex w-full mb-1.5 button socials facebook" onClick={() => handleSocialAuth('facebook')}>
                        <div className="button__inner">
                            <div className="absolute left-3">
                                <svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.47229 10.0923H6.64526C6.64526 14.609 6.64526 20.1686 6.64526 20.1686H2.45615C2.45615 20.1686 2.45615 14.6629 2.45615 10.0923H0.464844V6.53108H2.45615V4.2276C2.45615 2.57785 3.24008 0 6.68375 0L9.78796 0.0118993V3.46887C9.78796 3.46887 7.90164 3.46887 7.53487 3.46887C7.16811 3.46887 6.64666 3.65225 6.64666 4.43898V6.53178H9.83835L9.47229 10.0923Z" fill="white"/>
                                </svg>
                            </div>
                            Connect with Facebook
                        </div>
                    </div>
                    <div className="flex w-full my-1.5 button socials twitter" onClick={() => handleSocialAuth('twitter')}>
                        <div className="button__inner">
                            <div className="absolute left-3">
                                <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.8668 4.02629C17.8746 4.20209 17.8789 4.37932 17.8789 4.55655C17.8789 9.95281 13.7726 16.1731 6.25955 16.1731C3.9534 16.1731 1.80661 15.4991 0 14.34C0.319445 14.3779 0.644607 14.3972 0.974056 14.3972C2.88787 14.3972 4.64803 13.744 6.04587 12.6492C4.25926 12.6163 2.75066 11.4357 2.23111 9.81274C2.47981 9.85991 2.73636 9.88635 2.99864 9.88635C3.37096 9.88635 3.73257 9.83776 4.07489 9.74414C2.20681 9.36967 0.799684 7.71956 0.799684 5.74C0.799684 5.72285 0.799684 5.70498 0.800399 5.68855C1.35067 5.9937 1.98027 6.17808 2.64918 6.1988C1.55435 5.46772 0.833272 4.2171 0.833272 2.80068C0.833272 2.05174 1.03409 1.34996 1.38569 0.746801C3.39884 3.21803 6.4089 4.84313 9.80202 5.01464C9.73199 4.7152 9.69697 4.40434 9.69697 4.08346C9.69697 1.82877 11.525 0 13.7797 0C14.9546 0 16.0144 0.495961 16.7605 1.28921C17.6917 1.10627 18.5635 0.767525 19.3546 0.298006C19.0473 1.25205 18.402 2.05174 17.5566 2.5577C18.3834 2.45908 19.1724 2.2404 19.9021 1.91524C19.3575 2.73279 18.665 3.45243 17.8668 4.02629Z" fill="white"/>
                                </svg>
                            </div>
                            Connect with Twitter
                        </div>
                    </div>
                    <div className="flex w-full mt-1.5 button socials google" onClick={() => handleSocialAuth('google')}>
                        <div className="button__inner">
                            <div className="absolute left-3">
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.5774 11.2707C21.5774 10.545 21.5131 9.85611 21.4029 9.18555H11.0229V13.3283H16.9661C16.6998 14.6878 15.919 15.8361 14.7616 16.6168V19.3726H18.3073C20.3833 17.4527 21.5774 14.6235 21.5774 11.2707Z" fill="#4285F4"/>
                                    <path d="M11.023 22.0459C13.9992 22.0459 16.4886 21.0538 18.3074 19.3728L14.7616 16.6171C13.7696 17.2784 12.5111 17.6826 11.023 17.6826C8.14788 17.6826 5.71365 15.7444 4.841 13.1265H1.18506V15.9649C2.99466 19.5657 6.7149 22.0459 11.023 22.0459Z" fill="#34A853"/>
                                    <path d="M4.84091 13.1265C4.61126 12.4652 4.49184 11.7579 4.49184 11.023C4.49184 10.2881 4.62045 9.58084 4.84091 8.91946V6.08105H1.18496C0.431731 7.56915 0 9.24096 0 11.023C0 12.805 0.431731 14.4769 1.18496 15.965L4.84091 13.1265Z" fill="#FBBC05"/>
                                    <path d="M11.023 4.36325C12.6489 4.36325 14.1003 4.92358 15.2485 6.01669L18.39 2.87515C16.4886 1.09311 13.9992 0 11.023 0C6.7149 0 2.99466 2.48016 1.18506 6.08099L4.841 8.91939C5.71365 6.30145 8.14788 4.36325 11.023 4.36325Z" fill="#EA4335"/>
                                </svg>
                            </div>
                            Connect with Google
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [handleSocialAuth]);

    const renderModalBody = React.useMemo(() => {
        if (!supabaseUser) {
            return renderSocialsModalBody;
        }

        return renderClaimModalBody;
    }, [supabaseUser, renderSocialsModalBody, renderClaimModalBody]);

    const renderModal = React.useMemo(() => {
        if (bounty.fid === 'phone-otp') {
            return (
                <OTPModal
                    bounty={bounty.value}
                    bountyDescription={bounty.description}
                    bountyStatus={bounty.status}
                    isOpen={isOpenShow}
                    setIsOpen={setIsOpenShow}
                    isClaimed={bounty.status === 'claimed' || bounty.status === 'claim'}
                />
            );
        }

        return (
            <DuckiesModalWindow
                isOpen={isOpenShow}
                headerContent={bounty.title}
                bodyContent={renderDetailsModalBody}
                setIsOpen={setIsOpenShow}
            />
        );
    }, [isOpenShow, renderDetailsModalBody, bounty]);

    const renderModalTitle = React.useMemo(() => {
        if (!supabaseUser) {
            return 'Connect social';
        }

        return 'Claim reward';
    }, [supabaseUser]);

    const renderClaimModal = React.useMemo(() => {
        return (
            <DuckiesModalWindow
                isOpen={isOpenClaim}
                headerContent={renderModalTitle}
                bodyContent={renderModalBody}
                setIsOpen={setIsOpenClaim}
            />
        );
    }, [isOpenClaim, renderModalBody, renderModalTitle]);

    return (
        <React.Fragment>
            {isMobile ? renderMobileBounty : renderBounty}
            {renderModal}
            {renderClaimModal}
        </React.Fragment>
    );
}
