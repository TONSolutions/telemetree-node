const axios = require("axios");
const { HTTP_TIMEOUT, JSON_HEADER } = require("../constants");
const { EncryptedEvent } = require("../schemas/telemetreeSchemas");

class HttpClient {
  constructor(baseURL, apiKey) {
    this.client = axios.create({
      baseURL: baseURL,
      timeout: HTTP_TIMEOUT,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...JSON_HEADER
      }
    });
  }

  async post(endpoint, data) {
    try {
      // Validate data as EncryptedEvent
      const validatedData = new EncryptedEvent(data);

      const response = await this.client.post(endpoint, validatedData);

      if ([200, 201, 204].includes(response.status)) {
        return response.status;
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("HTTP request failed:", error.message);
      throw error;
    }
  }
}

module.exports = HttpClient;
