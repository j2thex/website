const crypto = require('crypto');
const fs = require('fs');

function generateKeys() {
    const dir = '.ssh';
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const exportedPublicKeyBuffer = publicKey.export({
        type: 'pkcs1',
        format: 'pem',
    });
    fs.writeFileSync(`${dir}/public.pem`, exportedPublicKeyBuffer, {
        encoding: 'utf-8',
    });
    fs.writeFileSync(
        `${dir}/public_base64`,
        Buffer.from(exportedPublicKeyBuffer).toString('base64')
    );

    const exportedPrivateKeyBuffer = privateKey.export({
        type: 'pkcs1',
        format: 'pem',
    });
    fs.writeFileSync(`${dir}/private.pem`, exportedPrivateKeyBuffer, {
        encoding: 'utf-8',
    });
    fs.writeFileSync(
        `${dir}/private_base64`,
        Buffer.from(exportedPrivateKeyBuffer).toString('base64')
    );
}

generateKeys();
