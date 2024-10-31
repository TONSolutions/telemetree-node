const axios = require("axios");
const { BotTrackingConfig } = require("../schemas/telemetreeSchemas");

class Config {
  constructor(apiKey, projectId) {
    this.apiKey = apiKey;
    this.projectId = projectId;

    this.config = null;
  }

  async fetchConfig() {
    try {
      const url = `https://config.ton.solutions/v1/client/config?project=${this.projectId}`;
      const headers = { Authorization: `Bearer ${this.apiKey}` };

      const response = await axios.get(url, { headers });
      const responseData = response.data;

      this.config = new BotTrackingConfig({
        publicKey: responseData.publicKey,
        host: responseData.host || "https://ebn.telemetree.io",
        appName: responseData.appName || "YourAppName",
        autoCaptureTelegram: responseData.autoCaptureTelegram,
        autoCaptureTelegramEvents: responseData.autoCaptureTelegramEvents,
        autoCaptureCommands: responseData.autoCaptureCommands,
        autoCaptureMessages: responseData.autoCaptureMessages
      });
    } catch (error) {
      console.error("Failed to fetch configuration:", error);
      throw new Error(
        "Could not initialize Config due to configuration fetch failure."
      );
    }
  }
}

module.exports = Config;
