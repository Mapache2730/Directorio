const fs = require('fs');
const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,

  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },

  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

if (!fs.existsSync('./src/auth/keys')) {
  fs.mkdirSync('./src/auth/keys', { recursive: true });
}

fs.writeFileSync('./src/auth/keys/private.pem', privateKey);
fs.writeFileSync('./src/auth/keys/public.pem', publicKey);

console.log('RSA keys generated successfully ');