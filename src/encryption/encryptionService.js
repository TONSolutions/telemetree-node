const crypto = require("crypto");

class EncryptionService {
  constructor(publicKey) {
    this.publicKey = publicKey;
  }

  encrypt(data) {
    try {
      const buffer = Buffer.from(data, "utf8");
      const encrypted = crypto.publicEncrypt(
        {
          key: this.publicKey,
          padding: crypto.constants.RSA_PKCS1_PADDING
        },
        buffer
      );
      return encrypted.toString("base64");
    } catch (error) {
      console.error("Encryption failed:", error);
      throw error;
    }
  }
}

module.exports = EncryptionService;
