class BotTrackingConfig {
  constructor({
    autoCaptureTelegram = true,
    publicKey,
    host,
    appName,
    autoCaptureTelegramEvents = ["message"],
    autoCaptureCommands = ["/start", "/help"],
    autoCaptureMessages = []
  }) {
    if (!publicKey || !host || !appName) {
      throw new Error(
        "BotTrackingConfig requires 'publicKey', 'host', and 'appName'."
      );
    }
    this.autoCaptureTelegram = autoCaptureTelegram;
    this.publicKey = publicKey;
    this.host = host;
    this.appName = appName;
    this.autoCaptureTelegramEvents = autoCaptureTelegramEvents;
    this.autoCaptureCommands = autoCaptureCommands;
    this.autoCaptureMessages = autoCaptureMessages;
  }
}

class EncryptedEvent {
  constructor({ encryptedEvent }) {
    if (!encryptedEvent) {
      throw new Error("EncryptedEvent requires 'encryptedEvent' field.");
    }
    this.encryptedEvent = encryptedEvent;
  }
}

module.exports = { BotTrackingConfig, EncryptedEvent };
