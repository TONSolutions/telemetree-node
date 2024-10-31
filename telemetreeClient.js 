const axios = require('axios');
const EncryptionService = require('./encryption/encryptionService');
const Config = require('./config');
const EventBuilder = require('./utils/eventBuilder');
const orchestrateEvent = require('./utils/orchestrator');

class TelemetreeClient {
  constructor(apiKey, projectId, options = {}) {
    this.apiKey = apiKey;
    this.projectId = projectId;
    this.config = new Config(apiKey, projectId, options);  // Pass options to Config
    this.encryptionService = new EncryptionService(this.config.publicKey);
    this.httpClient = axios.create({ baseURL: this.config.baseUrl });
    this.eventBuilder = new EventBuilder(this.config);
  }

  async track(event) {
    try {
      const orchestratedEvent = orchestrateEvent(event);
      const encryptedEvent = this.encryptionService.encrypt(JSON.stringify(orchestratedEvent));
      const builtEvent = this.eventBuilder.buildEvent({ encryptedEvent });

      const response = await this.httpClient.post('/track', builtEvent, {
        headers: { Authorization: `Bearer ${this.apiKey}` }
      });

      return response.status;
    } catch (error) {
      console.error('Error tracking event:', error);
      return null;
    }
  }
}

module.exports = TelemetreeClient;
