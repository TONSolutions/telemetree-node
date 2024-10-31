function orchestrateEvent(event) {
  return {
    ...event,
    processed: true
  };
}

module.exports = orchestrateEvent;
