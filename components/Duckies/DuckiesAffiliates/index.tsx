import React, { useEffect, useState } from 'react';
import useDuckiesContract from '../../../hooks/useDuckiesContract';
import useWallet from '../../../hooks/useWallet';
import { SimplePagination } from '../../Pagination/SimplePagination';
import { BountyItem, BountyRow } from '../BountyRow';
import UnloginEyes from '../UnloginEyes';
import useBounties from '../../../hooks/useBounties';
import useAffiliates from '../../../hooks/useAffiliates';
import { useAppSelector } from '../../../app/hooks';
import { analytics } from '../../../lib/analitics';
import { useSetMobileDevice } from '../../../hooks/useMobileDevice';
import { appConfig } from '../../../config/app';
import classNames from 'classnames';

interface DuckiesAffiliatesProps {
    bountyTitle: string;
    supabaseUser: any;
    bountiesItems: any;
    handleOpenModal: () => void;
}

export const DuckiesAffiliates: React.FC<DuckiesAffiliatesProps> = ({
    bountyTitle,
    supabaseUser,
    bountiesItems,
    handleOpenModal,
}: DuckiesAffiliatesProps) => {
    const { affiliates } = useAffiliates();
    const {
        bountiesToClaim,
        bountyItems,
        isSingleBountyProcessing,
        setIsSingleBountyProcessing,
        handleClaimReward,
        getClaimedBountyInfo,
    } = useBounties(bountiesItems);
    const isRewardsClaimProcessing = useAppSelector(state => state.globals.isRewardsClaimProcessing);

    const [bounties, setBounties] = useState<BountyItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [payouts, setPayouts] = useState<number[]>([]);
    const [selectedMobileTab, setSelectedMobileTab] = useState<number>(0);
    const [touchStart, setTouchStart] = React.useState<number>(0);
    const [touchEnd, setTouchEnd] = React.useState<number>(0);

    const duckiesContract = useDuckiesContract();
    const { active, account, signer } = useWallet();
    const isMobile = useSetMobileDevice();
    const mobileTabs: any = React.useRef(null);

    const limit: number = isMobile ? 4 : 5;

    const getPayouts = React.useCallback(async() => {
        if (account && signer) {
            const payoutsValues = await duckiesContract?.getPayouts();

            setPayouts(payoutsValues);
        }
    }, [account, duckiesContract, signer]);

    React.useEffect(() => {
        if (active && account) {
            getPayouts();
        }
    }, [active, account, getPayouts]);

    useEffect(() => {
        if (bountyItems && bountyItems.length) {
            const paginationBounties = [];

            for (let index = (page * limit - limit); index < limit * page; index++) {
                const element = bountyItems[index];

                element && paginationBounties.push(element);
            }

            setBounties(paginationBounties)
        }
    }, [bountyItems, page]);

    const renderAffiliateLevels = React.useMemo(() => {
        return affiliates.map((affiliateCount: number, index: number) => {
            return (
                <div
                    className="flex w-full items-center justify-between py-2 border-b border-divider-color-40"
                    key={`affiliate-${index}`}
                >
                    <div className="flex flex-col font-metro-semibold">
                        <div className="text-xl text-text-color-100">
                            Level {index + 1} invitees
                        </div>
                        <div className="text-base text-text-color-60 cursor-pointer flex items-center w-fit">
                            {payouts?.[index] ? `${payouts[index]}% bonus` : ''}
                        </div>
                    </div>
                    <div className="text-2xl flex items-center font-gilmer-medium text-text-color-100">
                        {affiliateCount}
                    </div>
                </div>
            );
        });
    }, [affiliates, payouts]);

    const renderBountySlices = React.useMemo(() => {
        return bounties.map((bounty: BountyItem, index: number) => {
            return (
                <React.Fragment key={`bounty-${bounty.fid}`}>
                    <BountyRow
                        bounty={bounty}
                        handleClaim={handleClaimReward}
                        index={((page - 1) * limit) + index + 1}
                        isLoading={isRewardsClaimProcessing}
                        isSingleBountyProcessing={isSingleBountyProcessing}
                        setIsSingleBountyProcessing={setIsSingleBountyProcessing}
                        supabaseUser={supabaseUser}
                        getClaimedBountyInfo={getClaimedBountyInfo}
                    />
                </React.Fragment>
            );
        });
    }, [
        bounties,
        page,
        isRewardsClaimProcessing,
        isSingleBountyProcessing,
        supabaseUser,
        handleClaimReward,
        setIsSingleBountyProcessing,
        getClaimedBountyInfo,
    ]);

    const handleClickNextButton = React.useCallback((value: number) => {
        setPage(value + 1);
        setBounties([]);
        analytics({
            type: 'otherEvent',
            name: 'duckies_bounties_table_next_page_click',
        });
    }, []);

    const handleClickPrevButton = React.useCallback((value: number) => {
        setPage(value - 1);
        setBounties([]);

        analytics({
            type: 'otherEvent',
            name: 'duckies_bounties_table_prev_page_click',
        });
    }, []);

    const handleClaimAllClick = React.useCallback(() => {
        handleOpenModal();

        analytics({
            type: 'otherEvent',
            name: 'duckies_bounties_claim_all_click',
        });
    }, [handleOpenModal]);

    const handleTouchStart = React.useCallback((e: any) => {
        setTouchStart(e.targetTouches[0].clientX);
    }, []);

    const handleTouchMove = React.useCallback((e: any) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }, []);

    const handleTouchEnd = React.useCallback((e: any) => {
        if (touchEnd == 0) {
            return;
        }

        if (Math.abs(touchStart - touchEnd) > appConfig.swipeTriggerLength) {
            setSelectedMobileTab(touchEnd > touchStart ? 0 : 1);
        }

        setTouchStart(0);
        setTouchEnd(0);
    }, [touchStart, touchEnd]);

    React.useEffect(() => {
        mobileTabs.current?.scrollTo({
            top: 0,
            left: selectedMobileTab == 0 ? 0 : mobileTabs.current.scrollWidth,
            behavior: 'smooth',
        });
    }, [selectedMobileTab]);

    const renderPagination = React.useMemo(() => {
        return (
            <SimplePagination
                page={page}
                limit={limit}
                nextPageExists={page * limit < bountyItems.length}
                handleClickNextButton={handleClickNextButton}
                handleClickPrevButton={handleClickPrevButton}
                totalValue={bountyItems.length}
                total={bounties.length}
                shouldRenderTotal={true}
                prefixedTextLabel={isMobile ? '' : 'Showing'}
                totalSeparatorText={isMobile ? '/' : 'of'}
                resultsText={isMobile ? '' : 'results'}
            />
        );
    }, [page, limit, bountyItems, bounties]);

    const renderDesktopAffiliates = React.useMemo(() => {
        return (
            <div className="flex w-full overflow-x-auto overflow-y-hidden px-4 no-scrollbar">
                <div className="mr-6 w-1/4 min-w-[18.75rem]">
                    <div className="h-full border-2 rounded p-6 border-text-color-90 bg-body-background-color">
                        <div className="font-gilmer-bold text-4xl text-text-color-100">
                            Your Team
                        </div>
                        <UnloginEyes>
                            {renderAffiliateLevels}
                        </UnloginEyes>
                    </div>
                </div>
                <div className="w-full min-w-[50rem]">
                    <div className="h-full border-2 rounded p-6 border-text-color-90 bg-body-background-color">
                        <div className="font-gilmer-bold text-4xl text-text-color-100 flex justify-between mb-2">
                            {bountyTitle}
                            {bountiesToClaim.length > 1 && (
                                <div onClick={handleClaimAllClick} className="button button--outline button--secondary button--shadow-secondary">
                                    <span className="button__inner">Claim All</span>
                                </div>
                            )}
                        </div>
                        <UnloginEyes isReversed={true} paginationComponent={renderPagination}>
                            {renderBountySlices}
                        </UnloginEyes>
                    </div>
                </div>
            </div>
        );
    }, [
        renderAffiliateLevels,
        bountyTitle,
        bountiesToClaim,
        handleClaimAllClick,
        renderPagination,
        renderBountySlices,
    ]);

    const renderMobileAffiliates = React.useMemo(() => {
        return (
            <div
                ref={mobileTabs}
                className="flex w-full px-4 no-scrollbar overflow-auto touch-pan-y"
                onTouchEnd={handleTouchEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                <div className="mr-6 w-full min-w-[calc(100%-2rem)]">
                    <div className="h-full border-2 rounded p-6 border-text-color-90 bg-body-background-color">
                        <div className="font-gilmer-bold text-4xl text-text-color-100">
                            Your Team
                        </div>
                        <UnloginEyes>
                            {renderAffiliateLevels}
                        </UnloginEyes>
                    </div>
                </div>
                <div className="w-full min-w-[calc(100%-2rem)]">
                    <div className="h-full border-2 rounded p-6 border-text-color-90 bg-body-background-color">
                        <div className="font-gilmer-bold text-[1.625rem] text-text-color-100 flex justify-between mb-2">
                            {bountyTitle}
                            {bountiesToClaim.length >= 1 && (
                                <div onClick={handleClaimAllClick} className="button button--outline button--secondary button--shadow-secondary">
                                    <span className="button__inner !px-[1.125rem]">Claim All</span>
                                </div>
                            )}
                        </div>
                        <UnloginEyes isReversed={true} paginationComponent={renderPagination}>
                            {renderBountySlices}
                        </UnloginEyes>
                    </div>
                </div>
            </div>
        );
    }, [
        renderAffiliateLevels,
        bountyTitle,
        bountiesToClaim,
        handleClaimAllClick,
        renderPagination,
        renderBountySlices,
        handleTouchEnd,
    ]);

    const renderTabButtons = React.useMemo(() => {
        const affiliatesClassNames = classNames('px-[1.375rem] py-[0.875rem] outline outline-2 outline-offset-[-2px] outline-primary-cta-color-60 rounded', {'bg-primary-cta-color-60': selectedMobileTab == 0});
        const rewardClassNames = classNames('px-[1.375rem] py-[0.875rem] outline outline-2 outline-offset-[-2px] outline-primary-cta-color-60 rounded', {'bg-primary-cta-color-60': selectedMobileTab == 1});

        return (
            <div className="w-screen flex justify-center gap-6 mb-5">
                <div className={affiliatesClassNames} onClick={() => { setSelectedMobileTab(0) }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M29.0995 29.9934C28.6192 29.7975 28.105 29.6986 27.5863 29.7023L27.573 27.84V29.7023C26.5171 29.7023 25.5045 30.1218 24.7579 30.8684C24.0113 31.615 23.5918 32.6276 23.5918 33.6835V35.223H19.8672V33.6835C19.8672 31.6398 20.6791 29.6798 22.1242 28.2347C23.5678 26.7911 25.5251 25.9794 27.5664 25.9777C28.5742 25.9714 29.5733 26.1641 30.5064 26.5448C31.4416 26.9263 32.2921 27.489 33.0089 28.2007C33.7256 28.9124 34.2945 29.7589 34.6826 30.6913C35.0708 31.6238 35.2706 32.6238 35.2706 33.6339C35.2706 33.6339 35.2706 33.6338 35.2706 33.6339V35.1816H31.546V33.6339C31.546 33.1152 31.4434 32.6016 31.244 32.1228C31.0447 31.6439 30.7526 31.2092 30.3845 30.8438C30.0165 30.4784 29.5798 30.1894 29.0995 29.9934Z" fill="#090909"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.9883 12.1885C19.0413 12.1906 20.0508 12.6098 20.7956 13.3546C21.5422 14.1012 21.9616 15.1138 21.9616 16.1697H25.6862C25.6862 14.126 24.8744 12.166 23.4293 10.7209C21.9842 9.27579 20.0241 8.46387 17.9804 8.46387V10.3262L17.9646 8.46393C15.9322 8.48121 13.989 9.3007 12.558 10.744C11.127 12.1872 10.3241 14.1373 10.3242 16.1698L14.0488 16.1696C14.0488 15.1196 14.4636 14.1121 15.2029 13.3664C15.9404 12.6226 16.9412 12.1995 17.9883 12.1885Z" fill="#090909"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M27.5644 22.2119C26.5268 22.2119 25.6856 23.0531 25.6856 24.0908C25.6856 25.1285 26.5268 25.9697 27.5644 25.9697C28.6021 25.9697 29.4433 25.1285 29.4433 24.0908C29.4433 23.0531 28.6021 22.2119 27.5644 22.2119ZM21.9609 24.0908C21.9609 20.9961 24.4697 18.4873 27.5644 18.4873C30.6592 18.4873 33.1679 20.9961 33.1679 24.0908C33.1679 27.1855 30.6592 29.6943 27.5644 29.6943C24.4697 29.6943 21.9609 27.1855 21.9609 24.0908Z" fill="#090909"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.0136 29.9934C9.53331 29.7975 9.01904 29.6986 8.50039 29.7023L8.48709 27.84V29.7023C7.43119 29.7023 6.41856 30.1218 5.67195 30.8684C4.92533 31.615 4.50588 32.6276 4.50588 33.6835V35.223H0.78125V33.6835C0.78125 31.6398 1.59311 29.6798 3.03824 28.2347C4.4818 26.7911 6.43914 25.9794 8.48045 25.9777C9.48822 25.9714 10.4873 26.1641 11.4205 26.5448C12.3557 26.9263 13.2061 27.489 13.9229 28.2007C14.6397 28.9124 15.2085 29.7589 15.5967 30.6913C15.9849 31.6238 16.1847 32.6239 16.1846 33.6339C16.1846 33.6339 16.1846 33.6338 16.1846 33.6339V35.1816H12.46V33.6339C12.46 33.1152 12.3574 32.6016 12.1581 32.1228C11.9587 31.6439 11.6666 31.2092 11.2986 30.8438C10.9306 30.4784 10.4938 30.1894 10.0136 29.9934Z" fill="#090909"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.44017 22.2119C8.06657 22.2111 7.70112 22.3212 7.39014 22.5282C7.07916 22.7353 6.83664 23.03 6.69329 23.375C6.54994 23.72 6.51222 24.0997 6.58491 24.4662C6.65759 24.8327 6.83742 25.1693 7.10158 25.4335C7.36574 25.6976 7.70237 25.8774 8.06885 25.9501C8.4353 26.0228 8.81509 25.9851 9.1601 25.8417C9.50512 25.6984 9.79979 25.4559 10.0068 25.1449C10.2139 24.8339 10.324 24.4685 10.3231 24.0949C10.322 23.5958 10.1233 23.1175 9.77042 22.7647C9.41754 22.4118 8.93924 22.213 8.44017 22.2119ZM5.32598 19.4279C6.25073 18.8122 7.33743 18.4849 8.44838 18.4873C9.93241 18.4906 11.3547 19.0816 12.4041 20.1309C13.4535 21.1803 14.0445 22.6026 14.0478 24.0867C14.0502 25.1976 13.7228 26.2843 13.1072 27.2091C12.4915 28.1338 11.6152 28.855 10.5893 29.2813C9.56334 29.7075 8.43397 29.8197 7.34423 29.6036C6.25452 29.3875 5.25345 28.8528 4.46787 28.0672C3.6823 27.2816 3.14758 26.2805 2.93145 25.1908C2.71531 24.1011 2.82748 22.9717 3.25376 21.9458C3.68004 20.9199 4.40124 20.0436 5.32598 19.4279Z" fill="#090909"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.0571 4.50734C17.6837 4.50734 17.3187 4.61813 17.0082 4.82569C16.6978 5.03325 16.4559 5.32823 16.3132 5.67328C16.1705 6.01833 16.1334 6.39796 16.2065 6.76416C16.2797 7.13036 16.4598 7.4666 16.7241 7.73034C16.9885 7.99414 17.3252 8.17355 17.6915 8.24588C18.0578 8.31822 18.4374 8.28025 18.7822 8.13677C19.1269 7.9933 19.4213 7.75078 19.6282 7.43988C19.8351 7.12897 19.945 6.76374 19.9442 6.39034C19.9431 5.89052 19.7438 5.41156 19.39 5.05858C19.0363 4.70559 18.5569 4.50734 18.0571 4.50734ZM14.9381 1.72935C15.8612 1.11219 16.9466 0.782718 18.0571 0.782715C19.5432 0.782711 20.9687 1.3722 22.0208 2.42196C23.0729 3.47172 23.6656 4.89596 23.6688 6.38211C23.6713 7.49256 23.3442 8.57871 22.7291 9.50318C22.114 10.4276 21.2384 11.1489 20.2132 11.5755C19.188 12.0021 18.0593 12.1151 16.9699 11.8999C15.8804 11.6848 14.8794 11.1512 14.0933 10.367C13.3073 9.58263 12.7716 8.58273 12.5541 7.49383C12.3365 6.40494 12.4469 5.27599 12.8713 4.24983C13.2957 3.22367 14.015 2.34652 14.9381 1.72935Z" fill="#090909"/>
                    </svg>
                </div>
                <div className={rewardClassNames} onClick={() => { setSelectedMobileTab(1) }}>
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.9934 0.835422C11.8301 1.01108 10.8295 1.53248 9.91088 2.44169C9.41519 2.93225 9.22508 3.19585 8.92329 3.81085C8.42914 4.81798 8.28383 5.42009 8.28279 6.46516C8.28182 7.37154 8.41047 7.97035 8.75433 8.65984L8.94501 9.0424H4.7245H0.503906V14.8009V20.5594H2.15324H3.80257V27.8885V35.2175H17.7213H31.64V27.8885V20.5594H33.2894H34.9387V14.7204V8.88132H30.7936H26.6485L26.802 8.5793C27.2685 7.6614 27.4362 6.58976 27.2527 5.70028C26.9585 4.27427 26.3707 3.19907 25.3707 2.25733C24.3115 1.25986 23.1753 0.809327 21.7038 0.803206C20.4523 0.798052 19.3382 1.1695 18.1839 1.9769L17.7213 2.3005L17.2587 1.9769C15.9219 1.04192 14.3722 0.627148 12.9934 0.835422ZM14.7251 4.49736C15.1945 4.73156 15.581 5.13345 15.7992 5.61427C15.9251 5.89173 15.948 6.15485 15.9495 7.33957L15.9513 8.73748L14.7243 8.7047C13.6569 8.67627 13.4421 8.64752 13.0727 8.48387C12.564 8.25852 11.9992 7.66318 11.8633 7.20902C11.6415 6.46822 11.7932 5.51521 12.2224 4.95192C12.7169 4.30286 13.9033 4.08742 14.7251 4.49736ZM22.3381 4.38815C22.8259 4.53183 23.5289 5.25934 23.7114 5.80942C24.0015 6.68382 23.7652 7.51152 23.0749 8.03857C22.5816 8.41525 22.2946 8.4713 20.8389 8.47509L19.4913 8.47863V7.2058C19.4913 6.00069 19.5023 5.91097 19.6978 5.51811C20.1911 4.52724 21.2588 4.07026 22.3381 4.38815ZM15.9513 14.6398V16.9352H9.99761H4.04393V14.6398V12.3445H9.99761H15.9513V14.6398ZM31.3987 14.7204V17.0963H25.445H19.4913V14.7204V12.3445H25.445H31.3987V14.7204ZM15.9513 26.1166V31.6738H11.6067H7.26213V26.1166V20.5594H11.6067H15.9513V26.1166ZM28.1805 26.1166V31.6738H23.8359H19.4913V26.1166V20.5594H23.8359H28.1805V26.1166Z" fill="#090909"/>
                    </svg>
                </div>
            </div>
        )
    }, [selectedMobileTab]);

    return (
        <React.Fragment>
            <div className="pt-8 pb-44 mx-auto bg-primary-cta-color-90 duckies-affiliates">
                <div className="mx-auto p-0 w-full max-w-md-layout 2xl:max-w-lg-layout-2p">
                    {isMobile && renderTabButtons}
                    {isMobile ? renderMobileAffiliates : renderDesktopAffiliates}
                </div>
            </div>
        </React.Fragment>
    );
};
