const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    notification: {
        type: String,
        required: true
    },
    notification_date: {
        type: Date,
        required: true
    },
    url_notification: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Notification',NotificationSchema);