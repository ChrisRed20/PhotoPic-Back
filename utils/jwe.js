const { CompactEncrypt } = require('jose');
const crypto = require('crypto');
const { TextEncoder } = require('util');

const secretKey = process.env.JWE_SECRET || 'clave-ultra-secreta-1234567890123456'; // 32 caracteres

async function encryptPayload(payload) {
  const encoder = new TextEncoder();
  const key = encoder.encode(secretKey); // 32 bytes para A256GCM

  const jwe = await new CompactEncrypt(
    encoder.encode(JSON.stringify(payload))
  )
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .encrypt(key);

  return jwe;
}

module.exports = { encryptPayload };
