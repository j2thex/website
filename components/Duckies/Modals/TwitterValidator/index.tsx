import Link from 'next/link';
import React from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { fetchIsUserSubscribedOnTwitter, setIsUserSubscribedOnYellow } from '../../../../features/twitter/twitterSlice';
import { DuckiesModalWindow } from '../../DuckiesModalWindow';

interface TwitterValidatorModalProps {
    isOpenModal: boolean;
    setIsOpenModal: (value: boolean) => void;
    bounty: any;
}

export const TwitterValidatorModal: React.FC<TwitterValidatorModalProps> = ({
    isOpenModal,
    setIsOpenModal,
    bounty,
}: TwitterValidatorModalProps) => {
    const [accountLink, setAccountLink] = React.useState<string>('');
    const dispatch = useAppDispatch();

    const handleSubmit = React.useCallback(() => {
        if (bounty.fid === 'twitter-follow-yellow') {
            dispatch(fetchIsUserSubscribedOnTwitter(accountLink));
            // dispatch(setIsUserSubscribedOnYellow(true));
            setIsOpenModal(false);
        }
    }, [bounty, accountLink]);

    const renderModalBody = React.useMemo(() => {
        return (
            <div className="flex flex-col items-center w-full gap-[16px]">
                <span className="">{bounty?.description}</span>
                <Link href="https://twitter.com/Yellow">
                    <a>Follow this</a>
                </Link>
                <Link href="https://twitter.com/0xYellow">
                    <a>and this</a>
                </Link>
                <span>Input link to your account</span>
                <input
                    className="border"
                    value={accountLink}
                    onChange={(e) => {
                        setAccountLink(e.target.value);
                    }}
                />
                <button className="pointer" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }, [accountLink, handleSubmit]);

    return (
        <DuckiesModalWindow
            bodyContent={renderModalBody}
            headerContent={bounty?.title}
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
        />
    );
};
