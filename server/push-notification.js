var apn = require("apn");

// get device token from app
var tokens = [
  "<e32a9af4 5529f636 6d2c5fa6 700f5737 086a5c82 e532f2e3 13ba7657 5e602fec>"
];

// APNS Service
var service = new apn.Connection({
  gateway: "gateway.sandbox.push.apple.com",
  cert: "cert.pem",
  key: "key.pem"
});

service.on('connected', function() {
  console.log("Connected");
});

service.on('transmitted', function(notification, device) {
  console.log("Notification transmitted to: " + device.token.toString('hex'));
});

service.on('transmissionError', function(errCode, notification, device) {
  console.error("Notification caused error: " + errCode + " for device ", device, notification);
});

service.on('timeout', function () {
  console.log("Connection Timeout");
});

service.on('disconnected', function() {
  console.log("Disconnected from APNS");
});

service.on('socketError', console.error);

// Set Note
var note = new apn.Notification();
note.sound = "ping.aiff";
note.alert = "You have a new message";

// Send Notification to all the tokens
service.pushNotification(note, tokens);
