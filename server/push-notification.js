var apn = require("apn");

// get device token from app
var tokens = [
  "<ea579dbc 9b2095fb a20f5be5 21cddefb 88edc8b6 6f15d40f 1547e5ef 88db2a5f>"
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
