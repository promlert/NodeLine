import express from "express";
import https from "https";
const app = express();
const TOKEN = process.env.LINE_ACCESS_TOKEN ?? "7rHgjnqiPL8MZ5zZl/cAescPyxmta+LceUOvljnKPP0hNFgDY4yG00ZeKyGLL0WaQS6SCXfhfzxwTqqVaCwEcHjmIg55goxmfqg/4EVVjNB6M459mfvTwTWp5SV8tiS2p2nVtqoV8czjFtsPZjruawdB04t89/1O/w1cDnyilFU=";
const port = process.env.PORT ?? "9001";
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Node.js!');
});
app.post("/webhook", function (req, res) {
    res.send("HTTP POST request sent to the webhook URL!");
    // If the user sends a message to your bot, send a reply message
    if (req.body.events[0].type === "message") {
      // You must stringify reply token and message data to send to the API server
      const dataString = JSON.stringify({
        // Define reply token
        replyToken: req.body.events[0].replyToken,
        // Define reply messages
        messages: [
          {
            "type": "flex",
            "altText": "This is a Flex Message",
            "contents": {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "Hello,"
                  },
                  {
                    "type": "text",
                    "text": "World!"
                  }
                ]
              }
            }
          }
        ],
      });
  
      // Request header. See Messaging API reference for specification
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      };
  
      // Options to pass into the request, as defined in the http.request method in the Node.js documentation
      const webhookOptions = {
        hostname: "api.line.me",
        path: "/v2/bot/message/reply",
        method: "POST",
        headers: headers,
        body: dataString,
      };
  
      // When an HTTP POST request of message type is sent to the /webhook endpoint,
      // we send an HTTP POST request to https://api.line.me/v2/bot/message/reply
      // that is defined in the webhookOptions variable.
  
      // Define our request
      const request = https.request(webhookOptions, (res) => {
        res.on("data", (d) => {
          process.stdout.write(d);
        });
      });
  
      // Handle error
      // request.on() is a function that is called back if an error occurs
      // while sending a request to the API server.
      request.on("error", (err) => {
        console.error(err);
      });
  
      // Finally send the request and the data we defined
      request.write(dataString);
      request.end();
    }
  });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });