const PushNotificationService = require("../../services/PushNotificationService");

const notification = async (req, res, next) => {
  await PushNotificationService.sendNotification(req, res, next);
};
module.exports = notification;
