import React from 'react';
import Head from 'next/head';
import { isBrowser } from '../../../helpers';

const DuckiesHead: React.FC = () => {
    const ogImagePath = React.useMemo(() => {
        if (isBrowser()) {
            return `${window.location.origin}/images/og-image.png?og-image=duckies`;
        }
    }, [isBrowser]);

    return (
        <Head>
            <title>Yellow DeFi - Discover WEB 3.0 Internet of Finance</title>
            <meta
                name="description"
                content="Yellow DeFi is a new generation hybrid technology cryptocurrency exchange combining the best of decentralized and centralized performance."
            />
            <meta property="og:type" content="website" />
            <meta
                property="og:title"
                content="DUCKIES—The Fun and Friendly Web3 Currency"
            />
            <meta
                property="og:description"
                content="The DUCKIES token is a decentralized meme coin and the Yellow community currency for true growth hackers. Join the duckies squad! Quack-quack!"
            />
            <meta property="og:image" content={ogImagePath} />
            <meta property="og:image:width" content="2400" />
            <meta property="og:image:height" content="1260" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:title"
                content="DUCKIES—The Fun and Friendly Web3 Currency"
            />
            <meta
                name="twitter:description"
                content="The DUCKIES token is a decentralized meme coin and the Yellow community currency for true growth hackers. Join the duckies squad! Quack-quack!"
            />
            <meta property="twitter:image" content={ogImagePath} />
        </Head>
    );
};

export default DuckiesHead;
