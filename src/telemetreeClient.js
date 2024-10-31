const axios = require("axios");
const Config = require("./config");
const EncryptionService = require("./encryption/encryptionService");
const EventBuilder = require("./utils/eventBuilder");
const orchestrateEvent = require("./utils/orchestrator");
const convertPublicKey = require("./utils/convertPublicKey"); // Utility to convert public key format

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
    await this.config.fetchConfig();

    const publicKey = convertPublicKey(this.config.config.publicKey);
    this.encryptionService = new EncryptionService(publicKey);
    this.httpClient = axios.create({ baseURL: this.config.config.host });
    this.eventBuilder = new EventBuilder(this.config.config);
  }

  async track(event) {
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
