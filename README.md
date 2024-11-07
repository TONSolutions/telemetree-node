# Telemetree SDKs for Telegram Mini App Analytics

Telemetree is a comprehensive free analytics tool designed specifically for **Telegram Mini Apps**. With our SDKs, developers, marketers, and product managers can easily track and optimize user engagement, making data-driven decisions to boost user acquisition and retention. Telemetree simplifies **Analytics for Telegram Mini Apps** by delivering insights into user behaviors, acquisition channels, and in-app interactions.

## Key Features
- **Real-Time Analytics**: Monitor user activity within your Telegram Mini App in real-time.
- **User Retention Metrics**: Track returning users and pinpoint which features encourage app retention.
- **Web3 data**: discover web3 metrics associated with your users.
- **Seamless Integration**: Our SDKs are lightweight and integrate easily with auto event mapping.
- **Telegram-native**: Telemetree is built natively for Telegram.
- **User segmentation**: API for personalized notifications based on cohorts, completed actions. web3 data and more.
- **Free tier** with wide limits.

## Why Use Telemetree for Telegram Mini App Analytics?

Telemetree is uniquely focused on the needs of Telegram Mini App developers, providing tailored metrics and insights that help you grow and retain your user base efficiently. As the demand for Analytics for Telegram Mini Apps grows, Telemetree remains at the forefront, offering tools that cater specifically to the Telegram ecosystem.

Start capturing valuable insights with Telemetree and make data-driven decisions for your app's growth on Telegram.

## Resources
Consider visiting our resources for more info about the state of the Telegram Mini Apps ecosystem and Telegram analytics.

- [Website](https://www.telemetree.io/)
- [Twitter](https://x.com/telemetree_HQ) 
- [Telegram channel](https://t.me/telemetree_en)
- [LinkedIn](https://linkedin.com/company/telemetree) 
- [Medium](https://medium.com/@telemetree)
- [Documentation](https://docs.telemetree.io/)

# Installation

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

## Other SDKs
Telemetree SDKs are available for various frameworks and environments, making it easy to incorporate powerful analytics into any Telegram Mini App.
- React SDK: https://github.com/TONSolutions/telemetree-react
- Node.js SDK: https://github.com/TONSolutions/telemetree-node
- .NET SDK: https://github.com/MANABbl4/Telemetree.Net (community-supported)

### License

This SDK is licensed under the MIT License.
