const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./../firebase-adminsdk.json'); // Replace with your actual path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


class PushNotificationService{

    static async sendNotification(req, res, next) {
        try {
          // Extract data from the request
          const { title, body, token, data } = req.body;
    
          if (!token) {
            return res.status(400).json({ message: 'Device token is required' });
          }
    
          // Create the notification payload
          const message = {
            notification: {
              title: title || 'Default Title',
              body: body || 'Default Body',
            },
            data: data || {}, // Optional: Add any custom data
            token, // Target device token
          };
    
          // Send the notification
          const response = await admin.messaging().send(message);
    
          console.log('Notification sent successfully:', response);
          return res.status(200).json({ message: 'Notification sent successfully', response });
        } catch (error) {
          console.error('Error sending notification:', error);
          return res.status(500).json({ message: 'Error sending notification', error });
        }
      }
}

module.exports=PushNotificationService;