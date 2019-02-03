# Cleanse FCM

Node.js Firebase Cloud Messaging Push notification manager ready to deploy to Google Cloud App Engine developed for the [Cleanse Project](https://github.com/CleanseProject/Cleanse).

## Requirements

The script needs to files on theproject folder in order tu run correctly
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

## Deployment

Once the project is already configured for deployment, and [Google Cloud SDK is configured on your machine](https://cloud.google.com/sdk/docs/quickstarts), just run `gcloud app deploy`
