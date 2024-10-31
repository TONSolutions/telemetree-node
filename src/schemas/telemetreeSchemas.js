class BotTrackingConfig {
  constructor({
    autoCaptureTelegram = true,
    publicKey,
    host,
    appName = "DefaultAppName",
    autoCaptureTelegramEvents = ["message"],
    autoCaptureCommands = ["/start", "/help"],
    autoCaptureMessages = []
  }) {
    if (!publicKey) throw new Error("BotTrackingConfig requires 'publicKey'");
    if (!host) throw new Error("BotTrackingConfig requires 'host'");

    this.autoCaptureTelegram = autoCaptureTelegram;
    this.publicKey = publicKey;
    this.host = host;
    this.appName = appName;
    this.autoCaptureTelegramEvents = autoCaptureTelegramEvents;
    this.autoCaptureCommands = autoCaptureCommands;
    this.autoCaptureMessages = autoCaptureMessages;
  }
}

module.exports = { BotTrackingConfig };
