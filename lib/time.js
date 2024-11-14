const moment = require("moment");

class Time {

    static getTimeDiff(startTime, endTime) {

        if (startTime && endTime) {

            let startTimeFormat = moment(startTime, 'HH:mm:ss');

            let endTimeFormat = moment(endTime, 'HH:mm:ss');

            let duration = moment.duration(startTimeFormat.diff(endTimeFormat));

            return Math.floor(duration.asHours())

        }
    }

    static getHours(hour) {
        if (hour) {
            return hour * 60;
        }
    }

    static formatHoursMinutes(decimalHours) {

        var hours = Math.floor(decimalHours);

        var decimalPart = decimalHours - hours;
        var minutes = Math.round(decimalPart * 60);

        var formattedTime = hours + " hours " + minutes + " minutes";

        if (hours > 0 && minutes > 0) {
            formattedTime = hours + " hours " + minutes + " minutes";
        } else if (hours > 0) {
            formattedTime = hours + " hours";
        } else if (minutes > 0) {
            formattedTime = minutes + " minutes"
        }

        return formattedTime;
    }
}

module.exports = Time;