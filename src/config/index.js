const axios = require("axios");
const { BotTrackingConfig } = require("../schemas/telemetreeSchemas");

class Config {
  constructor(apiKey, projectId, options = {}) {
    this.apiKey = apiKey;
    this.projectId = projectId;

    // Validate and assign options
    const validatedConfig = new BotTrackingConfig({
      publicKey: options.publicKey,
      host: options.host,
      appName: options.appName,
      ...options
    });

    // Assign validated configuration values
    this.autoCaptureTelegram = validatedConfig.autoCaptureTelegram;
    this.publicKey = validatedConfig.publicKey;
    this.host = validatedConfig.host;
    this.appName = validatedConfig.appName;
    this.autoCaptureTelegramEvents = validatedConfig.autoCaptureTelegramEvents;
    this.autoCaptureCommands = validatedConfig.autoCaptureCommands;
    this.autoCaptureMessages = validatedConfig.autoCaptureMessages;

    this.config = this.getConfig();
  }

  async getConfig() {
    try {
      const response = await axios.get(`${this.host}/config`, {
        headers: { Authorization: `Bearer ${this.apiKey}` }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch configuration:", error);
      return {};
    }
  }
}

module.exports = Config;
