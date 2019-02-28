# Cleanse FCM

Node.js Firebase Cloud Messaging Push notification manager ready to deploy to Google Cloud App Engine developed for the [Cleanse Project](https://github.com/CleanseProject/Cleanse).

## Requirements

The script needs to files on the project folder in order tu run correctly
* serviceAccountKey.json
* connection.properties

### serviceAccountKey.json

This file can be downloaded through the Firebase Console after you configure the project

### connection.properties

This file needs the following syntax

````
api.key=FIREBASE_WEB_API_KEY
database.url=YOUR_FIREBASE_DATABASE_URL
````

## Testing

In order to test your implementation, run `node app.js` (requires prior installation of Node.js)

## Deployment

### App Engine
Once the project is already configured for deployment, and [Google Cloud SDK is configured on your machine](https://cloud.google.com/sdk/docs/quickstarts), just run `gcloud app deploy` on the project folder

### Compute Engine or other Linux Server

1. Install node and npm packages
2. Run `npm install` on the project directory
3. Edit the [cleanse-fcm.service](cleanse-fcm.service) with the appropiate paths
4. Copy the file to `/etc/systemd/system`, enable and start the service
