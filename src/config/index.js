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

      console.log("Configuration response:", responseData);

      this.config = new BotTrackingConfig({
        publicKey: responseData.public_key,
        host: responseData.host,
        appName: responseData.appName || "DefaultAppName", // Use a fallback if appName is missing
        autoCaptureTelegram: responseData.auto_capture_telegram,
        autoCaptureTelegramEvents: responseData.auto_capture_telegram_events,
        autoCaptureCommands: responseData.auto_capture_commands,
        autoCaptureMessages: responseData.auto_capture_messages
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
