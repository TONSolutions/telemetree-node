class EventBuilder {
  constructor(config) {
    this.config = config;
  }

  buildEvent(event) {
    return {
      ...event,
      timestamp: new Date().toISOString(),
      projectId: this.config.projectId
    };
  }
}

module.exports = EventBuilder;
