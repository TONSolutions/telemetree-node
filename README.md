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
npm install @tonsolutions/telemetree-node
```

### Usage

1. **Set Up Environment Variables**: Create a `.env` file to securely store your API keys and configuration.

   Add the following keys to `.env`:

   ```env
   TELEGRAM_BOT_TOKEN="YOUR_TELEGRAM_BOT_TOKEN"
   TELEMETREE_API_KEY="YOUR_API_KEY"
   TELEMETREE_PROJECT_ID="YOUR_PROJECT_ID"
   ```

2. **Import and Initialize the Telemetree Client**:

   ```javascript
   require("dotenv").config();
   const TelemetreeClient = require("@tonsolutions/telemetree-node");

   const client = new TelemetreeClient(
       process.env.TELEMETREE_API_KEY,
       process.env.TELEMETREE_PROJECT_ID
   );

   // Ensure client is initialized before using it to track events
   await client.initialize();
   ```

3. **Configure Webhook with ngrok**:
   Since Telegram requires a public URL to send updates, you can use [ngrok](https://ngrok.com/) to expose your local server to the internet.

   ```shell
   ngrok http 3000
   ```

   This will provide a public URL such as `https://your-ngrok-url.ngrok.io`. Use this URL to set up your bot’s webhook endpoint.

4. **Set the Webhook in Your App**:

   ```javascript
   app.get("/set-webhook", async (req, res) => {
     const webhookUrl = `https://your-ngrok-url.ngrok.io/webhook`; // Replace with your ngrok URL
     try {
       const response = await axios.get(
         `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`
       );
       res.send(response.data);
     } catch (error) {
       console.error("Error setting webhook:", error);
       res.sendStatus(500);
     }
   });
   ```

5. **Track Telegram Events**: Once the webhook is set, you can track events by sending the event data to the client’s `track` method:

   ```javascript
   app.post("/webhook", async (req, res) => {
     const update = req.body;

     try {
       const status = await client.track(update);
       console.log("Event tracked successfully with status:", status);
     } catch (error) {
       console.error("Error tracking event:", error);
     }

     res.sendStatus(200);
   });
   ```

### Configuration Options

You can pass the following options when initializing the client:

- `autoCaptureTelegram` (Boolean): Enables or disables automatic capturing of Telegram events (default: `true`)
- `autoCaptureTelegramEvents` (Array): Specifies the types of Telegram events to capture automatically (default: `["message"]`)
- `autoCaptureCommands` (Array): Specifies the Telegram commands to capture automatically (default: `["/start", "/help"]`)

### Encryption

The SDK uses RSA encryption to secure event data before sending it to the Telemetree service, ensuring data privacy. The `publicKey` is fetched automatically from the Telemetree configuration service during initialization, so there’s no need to manually set it.

### License

This SDK is licensed under the MIT License.
