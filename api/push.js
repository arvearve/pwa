/* eslint-env node */
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.post("/api/push", (req, res) => {
  console.log(req.body);
  const options = {
    vapidDetails: {
      subject: "mailto:joubran.jad@gmail.com",
      publicKey: "<your-public-key>",
      privateKey: "<your-private-key>"
    },
    TTL: 60 * 60 //1 hour
  };

  webpush
    .sendNotification(req.body.subscription, req.body.data, options)
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch(err => {
      if (err.statusCode) {
        res.status(err.statusCode).send(err.body);
      } else {
        res.status(400).send(err.message);
      }
    });
});

// workshop purpose only
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/push.html"));
});

const server = app.listen(process.env.PORT || "8081", () => {
  console.log("App listening on port %s", server.address().port);
  console.log("Press Ctrl+C to quit.");
});
