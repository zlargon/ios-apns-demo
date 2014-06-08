ios-apns-demo
=============

###Apple Push Notification Service

Local and Push Notification Programming Guide
[https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Introduction.html](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Introduction.html)

=============

###1. Certificates

1. **Create certSigningRequest**<br>
a. `OS X` > `Application` > `Keychain Access` > select menu > `Certificate Assistant` ><br>
&nbsp;&nbsp;&nbsp;&nbsp;`Request a Certificate From a Certificate Authority...`<br>
b. input `email` and `name`, select the option `saved to disk` ><br>
&nbsp;&nbsp;&nbsp;&nbsp;`CertificateSigningRequest.certSigningRequest` will be saved to disk

2. **Login Apple Developer Member Center** [https://developer.apple.com](https://developer.apple.com)<br>
`iOS Dev Center` > `Certificates, Identifiers & Profiles` > ...

3. **Certificates** [https://developer.apple.com/account/ios/certificate/](https://developer.apple.com/account/ios/certificate/)<br>
a. click `+`<br>
b. select `iOS App Development` > continue<br>
c. upload `CertificateSigningRequest.certSigningRequest` > generate<br>
d. download `ios_development.cer` and double click the certificate install to OS X

4. **Identifiers** [https://developer.apple.com/account/ios/identifiers/](https://developer.apple.com/account/ios/identifiers/)<br>
a. click **`+`**<br>
b. **App ID Description > Name:** *APNS App Demo*<br>
&nbsp;&nbsp;&nbsp;&nbsp;**Explicit App ID > Bundle ID:** *com.zlargon.apns-app-demo*<br>
&nbsp;&nbsp;&nbsp;&nbsp;**App Services > Select** `Push Notifications`<br>
c. Edit ***com.gemtek.huzza*** > `Push Notifications` > `Development SSL Certificate` > `Create Certificate...`<br>
d. upload `CertificateSigningRequest.certSigningRequest`<br>
e. download `aps_development.cer` and double click the certificate install to OS X

5. **Provisioning Profiles** [https://developer.apple.com/account/ios/profile/](https://developer.apple.com/account/ios/profile/)<br>
a. click **`+`**<br>
b. `iOS App Development` > continue<br>
c. app ID: *`APNS App Demo(N952G2NSNX.com.zlargon.apns-app-demo)`* > continue<br>
d. certificates `Select All` > continue<br>
e. devices `Select All` > continue<br>
f. **Profile Name:** > *`APNS App Demo`* > generate<br>
g. download *`APNS_App_Demo.mobileprovision`* and double click the certificate install to OS X

6. **Generate .p12 and .pem**<br>
a. `OS X` > `Application` > `Keychain Access`<br>
b. find the certificate *`Apple Development IOS Push Services: com.zlargon.apns-app-demo`* > click left import to `cert.p12`<br>
c. find the key of certificate *`Apple Development IOS Push Services: com.zlargon.apns-app-demo`* > click left import to `key.p12`<br>
d. use `cert.p12` and `key.p12` generate `cert.pem` and `key.pem`
<pre>
$ openssl pkcs12 -in cert.p12 -out cert.pem -nodes
$ openssl pkcs12 -in key.p12 -out key.pem -nodes
</pre>

=============

###2. App

- App Name `com.zlargon.apns-app-demo`
- set App Provisioning Profile<br>
*`apns-app-demo.xcodeproj`* > `Build Settings` > `Code Signing` > `Provisioning Profile` > *`APNS App Demo`*

=============

###3. Server

**node-apn**<br>
[https://github.com/argon/node-apn](https://github.com/argon/node-apn)

- **Install Node Module**<br>
<pre>
$ cd server
$ npm install
</pre>

- **Test**<br>
copy the `device token` from App with XCode console, and add to device token array in `push-notification.js`
<pre>
$ node push-notification.js
</pre>

- **Notice**<br>
notification only shows up when the app is **backgrounded** or **killed**<br>
