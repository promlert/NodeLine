import dotenv from "dotenv";
import express from "express";
import https from "https";
import path from "path";
// initialize configuration
dotenv.config();
const app = express();

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

const TOKEN = process.env.LINE_ACCESS_TOKEN ?? "7rHgjnqiPL8MZ5zZl/cAescPyxmta+LceUOvljnKPP0hNFgDY4yG00ZeKyGLL0WaQS6SCXfhfzxwTqqVaCwEcHjmIg55goxmfqg/4EVVjNB6M459mfvTwTWp5SV8tiS2p2nVtqoV8czjFtsPZjruawdB04t89/1O/w1cDnyilFU=";
const port = process.env.PORT ?? "9001";
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get('/', (req, res) => {
  res.send(`Hello, TypeScript with Node.js!`);
});
app.get( "/guitars", ( req, res ) => {
  res.render( "guitars" );
} );
app.post("/webhook", function (req, res) {
    res.send("HTTP POST request sent to the webhook URL!");
    // If the user sends a message to your bot, send a reply message
    if (req.body.events[0].type === "message") {
      // You must stringify reply token and message data to send to the API server
      let dataString = JSON.stringify({
        // Define reply token
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            "type": "text",
            "text": "Hello,"
          }
        ]
      });
     
      if(req.body.events[0].message.text =="ฝาก/ถอนเงิน")
      {
        dataString = JSON.stringify({
          // Define reply token
          replyToken: req.body.events[0].replyToken,
          // Define reply messages
          "messages": [
          {
            "type": "flex",
            "altText": "Call Eservice",
            "contents":
            {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "เลือกบริการที่สนใจได้เลยค่ะ",
                    "weight": "bold",
                    "size": "lg"
                  }
                ]
              },
              "footer": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "button",
                    "style": "link",
                    "height": "sm",
                    "action": {
                      "type": "message",
                      "label": "ฝากเงิน",
                      "text": "ฝากเงิน"
                    }
                  },
                  {
                    "type": "button",
                    "style": "link",
                    "height": "sm",
                    "action": {
                      "type": "message",
                      "label": "ถอนเงิน",
                      "text": "ถอนเงิน"
                    }
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [],
                    "margin": "sm"
                  }
                ],
                "flex": 0
              }
            }
            }
          ]});
      }
      if(req.body.events[0].message.text =="ฝากเงิน")
        {
          dataString = JSON.stringify({
            // Define reply token
            replyToken: req.body.events[0].replyToken,
            // Define reply messages
            "messages": [
            {
              "type": "flex",
              "altText": "Call Eservice",
              "contents": 
              {
                "type": "carousel",
                "contents": [
                  {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                      "type": "image",
                      "url": "https://backend-api-chat.aslsecurities.com/public/assets/img/ats_mobile.png",
                      "size": "full",
                      "aspectMode": "fit",
                      "aspectRatio": "320:213"
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ฝากเงินผ่าน ATS",
                          "weight": "bold",
                          "size": "sm",
                          "wrap": true,
                          "align": "center"
                        }
                      ],
                      "spacing": "sm",
                      "paddingAll": "13px"
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "separator"
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "message",
                            "label": "วิธีการ",
                            "text": "hello"
                          }
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "message",
                            "label": "เริ่มฝากเงิน",
                            "text": "hello"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                      "type": "image",
                      "url": "https://backend-api-chat.aslsecurities.com/public/assets/img/mobile-banking.png",
                      "size": "full",
                      "aspectMode": "fit",
                      "aspectRatio": "320:213"
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ฝากเงินผ่านธนาคาร Bill Payment",
                          "weight": "bold",
                          "size": "sm",
                          "wrap": true,
                          "align": "center"
                        }
                      ],
                      "spacing": "sm",
                      "paddingAll": "13px"
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "separator"
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "message",
                            "label": "วิธีการ",
                            "text": "manual billpayment"
                          }
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "uri",
                            "label": "แนบสลิป",
                            "uri": "http://linecorp.com/"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "type": "bubble",
                    "size": "micro",
                    "hero": {
                      "type": "image",
                      "url": "https://backend-api-chat.aslsecurities.com/public/assets/img/insurance-agent.png",
                      "size": "full",
                      "aspectMode": "fit",
                      "aspectRatio": "320:213"
                    },
                    "body": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ค่าขายหลักทรัพย์",
                          "weight": "bold",
                          "size": "sm"
                        }
                      ],
                      "spacing": "sm",
                      "paddingAll": "13px"
                    },
                    "footer": {
                      "type": "box",
                      "layout": "vertical",
                      "contents": [
                        {
                          "type": "separator"
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "uri",
                            "label": "วิธีการ",
                            "uri": "http://linecorp.com/"
                          }
                        },
                        {
                          "type": "button",
                          "action": {
                            "type": "uri",
                            "label": "เริ่มฝากเงิน",
                            "uri": "http://linecorp.com/"
                          }
                        }
                      ]
                    }
                  }
                ]
              }
              }
            ]});
        }
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