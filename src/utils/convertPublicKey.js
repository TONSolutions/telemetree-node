function convertPublicKey(publicKey) {
  // Base64-decode the key if needed, then format it as a PEM key
  const formattedKey = `-----BEGIN PUBLIC KEY-----\n${publicKey
    .match(/.{1,64}/g)
    .join("\n")}\n-----END PUBLIC KEY-----`;
  return formattedKey;
}

module.exports = convertPublicKey;
