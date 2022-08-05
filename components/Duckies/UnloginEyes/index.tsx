import classnames from 'classnames';
import React from 'react';
import useSocialSession from '../../../hooks/useSocialSession';

interface UnloginEyes {
    children: React.ReactNode
    paginationComponent?: React.ReactNode
    isReversed?: boolean
}

const UnloginEyes: React.FC<UnloginEyes> = ({ children, paginationComponent, isReversed }: UnloginEyes) => {
    const {isSocialSession} = useSocialSession();

    const rootClassName = classnames('relative flex flex-col h-[25.75rem]', {
        'blur-[0.313rem]': !isSocialSession
    });

    const paginationClassName = classnames('', {
        'blur-[0.313rem]': !isSocialSession
    });

    const reversedClassName = classnames('absolute flex items-center justify-center w-full h-full top-[-3.125rem]', {
        'rotate-y-180': isReversed
    });


    return (
        <div className="relative flex flex-col h-[25.75rem]">
            <div className={rootClassName}>
                {children}
            </div>
            <div className={paginationClassName}>
                {paginationComponent}
            </div>
            {!isSocialSession ?
                <div className={reversedClassName}>
                    <img src="/images/components/duckies/login_eyes_2.png" alt="login" />
                </div> : <></>
            }
        </div>
    )
};

export default UnloginEyes;
