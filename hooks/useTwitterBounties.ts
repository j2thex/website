import React from 'react';
import { useAppSelector } from '../app/hooks';

export default function useTwitterBounties() {
    const isUserSubscribedOnYellow = useAppSelector(state => state.twitter.isUserSubscribedOnYellow)

    const isTwitterBountyCoditionsFulfilled = React.useCallback(
        (id: string) => {
            switch (id) {
                case 'twitter-follow-yellow':
                    return isUserSubscribedOnYellow;
            }
        },
        [isUserSubscribedOnYellow]
    );

    return {
        isTwitterBountyCoditionsFulfilled,
    };
}
