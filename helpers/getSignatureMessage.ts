import crypto from 'crypto';

export const getSignatureMessage = (email: string, nonce: number) => {
    const jwtPrivateKey = process.env.NEXT_PUBLIC_JWT_PRIVATE_KEY || '';
    const rsaPrivateKey = Buffer.from(
        process.env.RSA_PRIVATE_KEY_BASE64 || '',
        'base64'
    ).toString('utf-8');

    const messageData = JSON.stringify({
        email,
        nonce,
        secret: jwtPrivateKey,
    });

    const messageToSign = crypto.privateEncrypt(
        crypto.createPrivateKey(rsaPrivateKey),
        Buffer.from(messageData)
    );

    const hash = crypto
        .createHmac('MD5', jwtPrivateKey)
        .update(messageToSign)
        .digest('hex');

    return hash;
};
