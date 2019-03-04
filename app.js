const firebase = require('firebase-admin');
const request = require('request');
const PropertiesReader = require('properties-reader');
const uuidV4 = require('uuid/v4');
uuidV4();

const properties = PropertiesReader('./connection.properties');

const serviceAccount = require("./serviceAccountKey.json");
const API_KEY = properties.get('api.key');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: properties.get('database.url')
});
ref = firebase.database().ref();

function listenForNotificationRequests() {
    var requests = ref.child('notificationRequests');
    requests.on('child_added', function (requestSnapshot) {
        var request = requestSnapshot.val();
        sendNotificationToUser(
            request.username,
            request.title,
            request.message,
            request.chatuid,
            function () {
                requestSnapshot.ref.remove();
            }
        );
    }, function (error) {
        console.error(error);
    });
}

function sendNotificationToUser(username, title, message, chatuid, onSuccess) {
    request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'Authorization': 'key=' + API_KEY
        },
        body: JSON.stringify({
            notification: {
                title: title,
                body: message,
                click_action: "OPEN_CHAT_ACTIVITY"
            },
            data: {
                chatuid: chatuid,
                notificationid: uuidV4()
            },
            to: '/topics/user_' + username
        })
    }, function (error, response, body) {
        if (error) {
            console.error(error);
        } else if (response.statusCode >= 400) {
            console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage);
        } else {
            onSuccess();
        }
    });
}

// start listening
listenForNotificationRequests();
