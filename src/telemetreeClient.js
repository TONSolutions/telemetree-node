const axios = require("axios");
const EncryptionService = require("./encryption/encryptionService");
const Config = require("./config");
const EventBuilder = require("./utils/eventBuilder");
const orchestrateEvent = require("./utils/orchestrator");

class TelemetreeClient {
  constructor(apiKey, projectId) {
    this.apiKey = apiKey;
    this.projectId = projectId;
    this.config = new Config(apiKey, projectId);
    this.encryptionService = null;
    this.httpClient = null;
    this.eventBuilder = null;
  }

  async initialize() {
    await this.config.fetchConfig(); // Fetch configuration

    // Initialize services that depend on the fetched configuration
    this.encryptionService = new EncryptionService(
      this.config.config.publicKey
    );
    this.httpClient = axios.create({ baseURL: this.config.config.host });
    this.eventBuilder = new EventBuilder(this.config.config);
  }

  async track(event) {
    // Ensure that initialize has been called before tracking
    if (!this.encryptionService || !this.httpClient || !this.eventBuilder) {
      await this.initialize();
    }

    try {
      const orchestratedEvent = orchestrateEvent(event);
      const encryptedEvent = this.encryptionService.encrypt(
        JSON.stringify(orchestratedEvent)
      );
      const builtEvent = this.eventBuilder.buildEvent({ encryptedEvent });

      const response = await this.httpClient.post("/track", builtEvent, {
        headers: { Authorization: `Bearer ${this.apiKey}` }
      });

      return response.status;
    } catch (error) {
      console.error("Error tracking event:", error);
      return null;
    }
  }
}

module.exports = TelemetreeClient;
