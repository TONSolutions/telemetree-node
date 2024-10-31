# Telemetree Node.js SDK

The Telemetree Node.js SDK provides a simple and efficient way to track and analyze Telegram events using the Telemetree service. This SDK enables easy event capture and secure transmission of Telegram events to the Telemetree platform for analysis.

### Features

- Automatically capture and send Telegram events to Telemetree
- Encrypt event data with RSA public key encryption
- Configure specific events and commands to track
- Simple and intuitive API for seamless integration

### Installation

Install the Telemetree SDK using npm:

```shell
npm install @onsolutions/telemetree-node
```

### Usage

1. Import the Telemetree SDK:

   ```javascript
   const TelemetreeClient = require('telemetree-node');
   ```

2. Initialize the client with your API key, project ID, and optional configuration parameters:

   ```javascript
   const apiKey = "YOUR_API_KEY";
   const projectId = "YOUR_PROJECT_ID";

   const client = new TelemetreeClient(apiKey, projectId, {
       autoCaptureTelegram: true,
       autoCaptureTelegramEvents: ["message"],
       autoCaptureCommands: ["/start", "/help"]
   });
   ```

3. Track Telegram events by passing the event data to the client’s `track` method:

   ```javascript
   const event = {
       update_id: 123456789,
       message: {
           message_id: 1,
           from: { id: 12345, is_bot: false, first_name: "John", username: "johndoe" },
           chat: { id: 67890, first_name: "John", username: "johndoe", type: "private" },
           date: 1637246400,
           text: "Hello"
       }
   };

   client.track(event).then((status) => {
       console.log("Event tracked successfully with status:", status);
   }).catch((error) => {
       console.error("Error tracking event:", error);
   });
   ```

### Configuration Options

You can pass the following options when initializing the client:

- `autoCaptureTelegram` (Boolean): Enables or disables automatic capturing of Telegram events (default: `true`)
- `autoCaptureTelegramEvents` (Array): Specifies the types of Telegram events to capture automatically (default: `["message"]`)
- `autoCaptureCommands` (Array): Specifies the Telegram commands to capture automatically (default: `["/start", "/help"]`)

### Encryption

The SDK uses RSA encryption to secure event data before sending it to the Telemetree service, ensuring data privacy.

### License

This SDK is licensed under the MIT License.
