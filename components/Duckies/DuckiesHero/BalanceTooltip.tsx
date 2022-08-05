import classNames from 'classnames';
import React from 'react';
import { appConfig } from '../../../config/app';
import { Decimal } from '../../Decimal';
import copyToClipboard from 'copy-to-clipboard';
import { analytics } from '../../../lib/analitics';
import { shortenHex } from '../../../utils/utils';
import { MetamaskIcon } from '../../../assets/MetamaskIcon';
import useMetaMask from '../../../hooks/useMetaMask';

interface BalanceTooltipProps {
    balance: number;
    address: string;
    network: string;
}

export const BalanceTooltip: React.FC<BalanceTooltipProps> = ({
    balance,
    address,
    network,
}) => {
    const [isCopyClicked, setIsCopyClicked] = React.useState<boolean>(false);

    const { addDuckiesToken, isWalletConnected } = useMetaMask();

    React.useEffect(() => {
        if (!isCopyClicked)
            return;

        setTimeout(() => {
            setIsCopyClicked(false);
        }, 700);
    }, [isCopyClicked]);

    const handleCopy = React.useCallback(() => {
        copyToClipboard(appConfig.duckiesSmartContractAddress);
        setIsCopyClicked(true);

        analytics({
            type: 'otherEvent',
            name: 'duckies_balance_info_sc_copy',
        });
    }, []);

    const renderMetamaskButtonContent = React.useMemo(() => {
        return (
            <span className="flex items-center button__inner gap-1 sm:!px-3">
                <MetamaskIcon />
                <span className="underline">
                    Add DUCKIES to MetaMask
                </span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.26341 2.9638C9.61488 2.61233 10.1847 2.61233 10.5362 2.9638L15.9362 8.3638C16.2877 8.71527 16.2877 9.28512 15.9362 9.63659L10.5362 15.0366C10.1847 15.3881 9.61488 15.3881 9.26341 15.0366C8.91194 14.6851 8.91194 14.1153 9.26341 13.7638L13.127 9.9002L2.69981 9.9002C2.20275 9.9002 1.7998 9.49725 1.7998 9.0002C1.7998 8.50314 2.20275 8.10019 2.69981 8.10019H13.127L9.26341 4.23659C8.91194 3.88512 8.91194 3.31527 9.26341 2.9638Z" fill="#070707"/>
                </svg>
            </span>
        );
    }, []);

    return (
        <div className="z-[100] absolute left-[1.125rem] sm:left-auto right-[1.125rem] sm:right-0 mt-[1.875rem] sm:mt-0 sm:pt-[1.875rem] sm:min-w-[27.813rem] w-[calc(100vw-2.25rem)] sm:w-fit">
            <div className="bg-text-color-0 border-2 border-text-color-100 rounded flex h-fit flex-col p-4">
                <h5 className="pb-2 mb-0 text-text-color-100 text-2xl font-gilmer-medium">
                    Connected wallet info
                </h5>
                {(isWalletConnected && (
                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 gap-[1.125rem] sm:gap-0 sm:flex flex-row justify-between">
                            <div className="flex flex-col">
                                <span className="text-sm text-text-color-100 font-metro-semibold">
                                    Balance:
                                </span>
                                <span className="text-sm text-text-color-100 font-metro-regular ml-[0.188rem] flex items-center">
                                    {Decimal.format(balance, 2, ',')}
                                    <svg className="ml-1" width="10" height="14" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.51487 3.11111H0V24.8889H9.51487C15.9624 24.8889 20 20.2844 20 14C20 7.59111 15.8998 3.11111 9.51487 3.11111ZM9.42097 21.0311H4.25665V6.93778H9.42097C13.1768 6.93778 15.6808 9.76889 15.6808 13.9067C15.6808 18.1067 13.1768 21.0311 9.42097 21.0311Z" fill="#000000" />
                                        <path d="M3.92 0H7.04989V6.22222H3.92V0Z" fill="#000000" />
                                        <path d="M3.92 21.7778H7.04989V28H3.92V21.7778Z" fill="#000000" />
                                        <path d="M8.61484 0H11.7447V6.22222H8.61484V0Z" fill="#000000" />
                                        <path d="M8.61484 21.7778H11.7447V28H8.61484V21.7778Z" fill="#000000" />
                                    </svg>
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-text-color-100 font-metro-semibold">
                                    Current network:{' '}
                                </span>
                                <span className="text-sm text-text-color-100 font-metro-regular">
                                    {network}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-text-color-100 font-metro-semibold">
                                    Current address:{' '}
                                </span>
                                <span className="text-sm text-text-color-100 font-metro-regular">
                                    {shortenHex(address, 4)}
                                </span>
                            </div>
                        </div>
                        <div className="my-[1.125rem] border border-divider-color-40 border-[0.5px]"></div>
                        <div>
                            <span className="text-base text-text-color-100 font-metro-semibold">
                                DUCKIES smart-contract address:
                            </span>
                            <div className="flex mt-1 mb-4">
                                <span className="text-xs text-text-color-70 font-metro-medium bg-neutral-control-color-20 pl-2.5 flex items-center w-[calc(100%-2.625rem)] rounded-tl rounded-bl break-all">
                                    {appConfig.duckiesSmartContractAddress}
                                </span>
                                <div
                                    className={classNames(
                                        'relative flex justify-center items-center w-[2.625rem] h-[2.625rem] bg-primary-cta-color-60 hover:bg-primary-cta-color-80 rounded-tr rounded-br cursor-pointer',
                                        {
                                            '!bg-system-green-20 !hover:bg-system-green-20':
                                                isCopyClicked,
                                        }
                                    )}
                                    onClick={handleCopy}
                                >
                                    {isCopyClicked && (
                                        <div className="absolute bg-text-color-0 border-2 border-text-color-100 rounded text-sm font-metro-regular font-normal text-text-color-100 py-4 px-[1.125rem] bottom-[calc(100%+0.563rem)]">
                                            Copied
                                        </div>
                                    )}
                                    {isCopyClicked ? (
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.75 5.75L3.75 8.75L11.25 1.25" stroke="#00401C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.10117 0.800049C5.10706 0.800049 4.30117 1.60594 4.30117 2.60005V9.80005C4.30117 10.7942 5.10706 11.6 6.10117 11.6H11.5012C12.4953 11.6 13.3012 10.7942 13.3012 9.80005V4.77284C13.3012 4.29545 13.1115 3.83761 12.774 3.50005L10.6012 1.32726C10.2636 0.989691 9.80577 0.800049 9.32838 0.800049H6.10117Z" fill="#070707" />
                                            <path d="M0.701172 6.20005C0.701172 5.20594 1.50706 4.40005 2.50117 4.40005V13.4H9.70117C9.70117 14.3942 8.89528 15.2 7.90117 15.2H2.50117C1.50706 15.2 0.701172 14.3942 0.701172 13.4V6.20005Z" fill="#070707" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div onClick={addDuckiesToken} className="!hidden sm:!inline-block button button--outline button--secondary button--shadow-secondary">
                                {renderMetamaskButtonContent}
                            </div>
                            <div onClick={addDuckiesToken} className="flex sm:hidden">
                                <span className="flex gap-1 items-center">
                                    {renderMetamaskButtonContent}
                                </span>
                            </div>
                        </div>
                    </div>
                )) || (
                    <div>
                        <span className="text-sm text-text-color-100 font-metro-regular">
                            Connect MetaMask to access your balance (Polygon
                            network)
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
