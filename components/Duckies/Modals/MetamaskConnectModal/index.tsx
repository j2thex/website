import React from 'react';
import Image from 'next/image';
import { DuckiesModalWindow } from '../../DuckiesModalWindow';
import useMetaMask from '../../../../hooks/useMetaMask';
import { analytics } from '../../../../lib/analitics';
import { useSetMobileDevice } from '../../../../hooks/useMobileDevice';
import { useRouter } from 'next/router';
import { isBrowser } from '../../../../helpers';

interface MetamaskConnectModalProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
}

export const MetamaskConnectModal: React.FC<MetamaskConnectModalProps> = ({
    isOpenModal,
    setIsOpenModal,
}: MetamaskConnectModalProps) => {
    const {
        isSwitchedMainChain,
        addOrSwitchToMainChain,
        mainChain,
        handleMetamask,
        isMetaMaskInstalled,
    } = useMetaMask();

    const router = useRouter();
    const isMobile = useSetMobileDevice();

    const handleConnectMetamaskClick = React.useCallback(() => {
        if (isMobile && isBrowser() && !isMetaMaskInstalled) {
            router.push(window.location.href.replace(window.location.protocol, 'dapp:'));
        }

        handleMetamask(isMetaMaskInstalled, 'Injected');

        analytics({
            type: 'otherEvent',
            name: 'duckies_modal_connect_metamask',
        });
    }, [
        isMetaMaskInstalled,
        handleMetamask,
        isMobile,
        isBrowser,
        isMetaMaskInstalled,
    ]);

    const renderModalBody = React.useMemo(() => {
        return (
            <div className="flex flex-col w-full">
                <div className="flex justify-center mb-4">
                    <Image width="156px" height="156px" src="/images/components/duckies/duckMetamask.png" alt="duck-no-rewards" />
                </div>
                <div className="text-text-color-100 text-sm text-center font-metro-regular font-medium mb-6">
                    Connect MetaMask wallet in order to be able to get Duckies tokens
                </div>
                {isMetaMaskInstalled && (
                    <div className="flex items-center justify-center mb-8">
                        {isSwitchedMainChain && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="#419E6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                        <div
                            onClick={() => addOrSwitchToMainChain()}
                            className={[
                                'button-link cursor-pointer font-bold text-center underline px-2',
                                isSwitchedMainChain ? 'active no-underline' : undefined
                            ].join(' ')}
                        >
                            <span>Switch to {mainChain?.name?.split(' ')[0]} network</span>
                        </div>
                    </div>
                )}
                <div className="flex items-center justify-center">
                    <div onClick={handleConnectMetamaskClick} className="button button--outline button--secondary button--shadow-secondary">
                        <span className="button__inner">{isMetaMaskInstalled ? 'Connect MetaMask' : 'Install Metamask'}</span>
                    </div>
                </div>
            </div>
        );
    }, [
        addOrSwitchToMainChain,
        isMetaMaskInstalled,
        mainChain,
        isSwitchedMainChain,
        handleConnectMetamaskClick,
    ]);

    return (
        <DuckiesModalWindow
            bodyContent={renderModalBody}
            headerContent="Connect Wallet"
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
        />
    );
};
