const moment = require("moment");

const timeZone = require("./config").defaultTimeZone;

class DateTime {
  constructor() {
    this.formats = {
      /**
       * Date Format
       */
      dateFormat: "DD-MM-YYYY",

      /**
       *  Frontend Time
       */
      frontEndTime: "h:mm A",

      /**
       * Default Date Format
       */
      defaultFormat: "MM/DD/YYYY",

      /**
       * Formatted Date Format
       */
      formattedDateFormat: "MMM DD, YYYY",

      /**
       * Frontend Date Format
       */
      frontendDateFormat: "DD-MMM-Y",
      /**
       * MySQL Date Format
       */

      mySQLDateFormat: "YYYY-MM-DD",

      /**
       *
       */
      FrontEndDateTimeFormat: "DD-MM-YYYY hh:mm:ss A",

      /**
       * Frontend 12 hours Date Time format
       */
      frontendDateTime12HoursFormat: "DD MMM, Y h:mm A",

      /**
       * Format date by day, month name and year
       */
      shortDate: "DD-MM-YY",

      /**
       * Format date by day, month name, year and time
       */
      shortDateAndTime: "DD-MM-YY hh:mm A",
      /**
       * Format date by day, month name, year and time
       */
      shortMonthDateAndTime: "DD-MMM-YY hh:mm A",

      /**
      *  DB Time
      */
      standard24Hours: "HH:mm",

      mySQLDateTimeFormat: "YYYY-MM-DD HH:mm:ss",

      shortMonthDate: "DD-MMM-YYYY"
    };
  }

  /**
   * Format Date
   *
   * @param date
   * @param format
   * @returns {string|null}
   */
  static formatDate(date, format = dateTime.formats.dateFormat) {
    if (!date) {
      return null;
    }

    return moment(date).format(format);
  }

  static Format(date, format = dateTime.formats.frontendDateFormat) {
    if (!date) {
      return null;
    }

    return moment(date).format(format);
  }

  static shortMonthDate(date, format = dateTime.formats.shortMonthDate) {
    if (!date) {
      return null;
    }

    return moment(date).format(format);
  }
  /**
   * Default Date Format
   *
   * @param date
   * @param format
   * @returns {null|*}
   */
  static defaultDateFormat(date, format = dateTime.formats.defaultFormat) {
    if (!date) {
      return null;
    }

    return moment(date).format(format);
  }
  /**
   * Formatted Date
   *
   * @param date
   * @param format
   * @returns {string|null}
   */
  static formattedDate(
    date,
    format = dateTime.formats.frontendDateTime12HoursFormat
  ) {
    if (!date) {
      return null;
    }

    return moment(date).format(format);
  }

  /**
   * Get SQl Formatted Date
   *
   * @param date
   * @param format
   */
  static getSQlFormattedDate(
    date = "",
    format = dateTime.formats.mySQLDateFormat
  ) {
    if (date) {
      return moment(date).format(format);
    }
    return moment().format(format);
  }

  /**
   * Format Local Date
   *
   * @param date
   * @param format
   */
  static formatLocalDate(date, format = dateTime.formats.dateFormat) {
    if (!date) {
      return null;
    }

    return moment(date).tz(timeZone).format(format);
  }

  /**
   * Formatted date time
   *
   * @param date
   * @returns {null|*}
   */
  static formatDateTime(date) {
    if (!date) {
      return null;
    }

    return moment(date).format(dateTime.formats.frontEndTime);
  }
  /**
   * Format date by day, month name, year and time
   *
   * @param date
   * @returns {null|*}
   */
  static formateDateAndTime(date) {
    if (!date) {
      return null;
    }

    return moment(date).format(dateTime.formats.shortMonthDateAndTime);
  }

  /**
   * Format date by day-monthName-year
   *
   * @param date
   * @returns {null|*}
   */
  static shortDate(date) {
    if (!date) {
      return null;
    }

    return moment(date).format(dateTime.formats.shortDate);
  }

  /**
   * Format date by day, month name, year and time
   *
   * @param date
   * @returns {null|*}
   */
  static shortDateAndTime(date) {
    if (!date) {
      return null;
    }

    return moment(date).format(dateTime.formats.shortDateAndTime);
  }

  /**
 * Format Date By Day, Month Name In Mmm Format, Year and Time
 * @param date
 * @returns {null|*}
 */
  static shortDateTimeAndMonthMmmFormat(date) {
    if (!date) {
      return null;
    }

    return moment(date).format(dateTime.formats.shortMonthDateAndTime);
  }

  static toGetISOStringWithDayEndTime(date) {
    return moment(date).format("YYYY-MM-DDT23:59:59.000") + "Z";
  }

  static getToday(date) {
    return moment(date).format("YYYY-MM-DDT00:00:00.000") + "Z";
  }

  static startDate(date) {
    return moment(date).startOf('day').format()
  }

  static endDate(date) {
    return moment(date).endOf('day').format()
  }
  /**
   * convert UTC time to local time
   *
   * @param date
   * @returns {null|*}
   */
  static UTCtoLocalTime(date, format) {
    if (!date) {
      return null;
    }
    let gmtDateTime = moment.utc(date, format);

    return gmtDateTime.local().format(format);
  }

  /**

/**
 * Format date by day-monthName-year
 *
 * @param date
 * @returns {null|*}
 */
  static FrontEndDateTimeFormat(date) {
    if (!date) {
      return null;
    }

    return moment(date).format(dateTime.formats.FrontEndDateTimeFormat);
  }
  /**
   * Get Ago
   *
   * @param date
   */
  static ago(date) {
    moment(date).fromNow();
  }

  /**
   * Get SQl Current Date Time
   */
  static getSQlCurrentDateTime() {
    moment.utc().format();
  }

  //get My Sql Time Zone
  static getMysqlTimeZone(date) {
    if (!date) {
      return null;
    }
    let mysqlTimeFormat = moment(date).format("YYYY-MM-DD HH:mm:ss");
    return mysqlTimeFormat;
  }


  static DateAndHours(date) {
    if (!date) {
      return null
    }
    const timestamp = new Date(date);
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedTimestamp = timestamp.toLocaleString("en-IN", options);
    return formattedTimestamp
  }
  /**
 * Get Time Zone added Date Time value
 *
 * @param dateTime
 * @param format
 * @returns {string}
 */
  static getTimeZoneTime(dateTime, format = dateTime.formats.dateFormat) {
    if (!dateTime) {
      return null;
    }

    return moment(dateTime).add(moment.duration(this.getTimeZoneValue())).format(format);
  }

  /**
 * Convert to UTC time
 *
 * @param dateTime
 * @returns {string}
 */
  static convertToUTC(dateTimes) {
    return moment(dateTimes).utc().format(dateTime.formats.frontendDateFormat)
  }

  /**
 * Get Time Zone
 */
  static getTimeZoneValue() {
    return moment().utc().tz(timeZone).format("Z");
  }

  /**
 * Get Timesheet hours and minutes Difference from current Date Time
 * @param time
 * @param format
 * @returns {number}
 */
  static getOverDueInHour(time = "", format = dateTime.formats.mySQLDateTimeFormat) {
    if (!time) {
      return null;
    }
    time = moment(time).format(format);

    return moment(time).fromNow(true)
  }

  /**
* Hours Between Diff
*
* @param fromDate
* @param toDate
* @returns {number}
*/
  static hoursBetweenDiff(fromDate, toDate) {
    return Math.abs(new Date(moment(toDate).format(dateTime.formats.mySQLDateTimeFormat)) - new Date(fromDate)) / 36e5;
  }

  /**
 * Get Last Date of Month
 *
 * @param date
 * @param format
 */
  static getLastDayOfMonth(date, format = DateTime.formats.dateFormat) {
    return moment(date).endOf("month").format(format);
  }

  static getMonth(date) {
    let dates = new Date(date)
    // Getting full month name (e.g. "June")
    let month = dates.toLocaleString('default', { month: 'short' });
    return month
  }
  static getYear(date) {
    let dates = new Date(date)
    // Getting year (e.g. "2022")
    let year = dates.getFullYear();
    return year
  }
  /** Get Actual hours time diff**/

  static getTimeDiffData(endDate) {
    var currentTime = new Date().getTime();
    var endTime = endDate.getTime();
    var diff = (endTime - currentTime) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  /**
 * Convert Hours to days
 *
 * @param hours
 * @param showDay
 * @returns {*}
 */
  static convertHoursToDays(hours, showDay = true) {
    if (!hours) {
      return "";
    }

    hours = parseFloat(hours);
    const days = hours / 10;

    let text = `${Math.round(hours) !== hours ? hours.toFixed(2) : hours} hr${hours > 1 ? "s" : ""}`;
    if (showDay && days > 0) {
      text += ` (${Math.round(days) !== days ? days.toFixed(2) : days} day${days > 1 ? "s" : ""})`;
    }

    return text;
  }


  static getHours(startDate, endDate) {
    if (!startDate || !endDate || startDate > endDate) {
      return "";
    }
    const start_date = moment(startDate, "YYYY-MM-DD HH:mm:ss");
    const end_date = moment(endDate, "YYYY-MM-DD HH:mm:ss");
    const duration = moment.duration(end_date.diff(start_date));
    const hours = parseFloat(utils.roundValue(duration.asHours()));
    if (!hours) {
      return;
    }

    const text = `${Math.round(hours) !== hours ? hours.toFixed(2) : hours} Hour${hours > 1 ? "s" : ""}`;
    return text;
  }

  /**
 * Convert to hours and minutes
 *
 * @param milliseconds
 * @returns {string}
 */
  static covertToHoursAndMinutes(milliseconds) {
    if (!milliseconds) {
      return "";
    }

    if (!milliseconds) {
      return "";
    }
    let minutes;
    let hoursString = "";
    let hours;
    if (milliseconds > 3600) {
      minutes = milliseconds / 60;
      hours = Math.floor(minutes / 60);
      minutes = Math.floor(minutes % 60);
      if (minutes > 0) {
        hoursString = `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""}`;
      } else {
        hoursString = `${hours} hr${hours > 1 ? "s" : ""}`;
      }
    } else {
      minutes = Math.floor(milliseconds / 60);
      hoursString = `${minutes} min${minutes > 1 ? "s" : ""}`;
    }
    return hoursString;

  }

  static HoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${(hours)} hr${hours > 1 ? "s" : ""} ${(minutes)} min${minutes > 1 ? "s" : ""}`;
  }
  /**
   * convert UTC time to local time
   *
   * @param date
   * @returns {null|*}
   */
  static Get(date) {
    if (!date) {
      return null;
    }
    let gmtDateTime = moment.utc(date);

    return gmtDateTime.local().format("DD-MMM-YY hh:mm A");
  }

  static getDatesInRange(startDate, endDate) {

    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  static GetDate(date, format = DateTime.formats.mySQLDateFormat) {
    if (date) {
      return moment(date).format(format);
    }

    return moment().format(format);

  }

  static Difference(start_time, end_time) {
    if (start_time && end_time) {
      let startTime = moment(start_time);
      let endTime = moment(end_time);

      let difference = endTime - startTime;
      let days = Math.floor(difference / 1000 / 60 / 60 / 24);
      difference -= days * 1000 * 60 * 60 * 24

      let hours = Math.floor(difference / 1000 / 60 / 60);
      difference -= hours * 1000 * 60 * 60

      let minutes = Math.floor(difference / 1000 / 60);
      difference -= minutes * 1000 * 60

      return (+hours * 60) + (+minutes);
    }
  }


  static formateTime(date) {
    if (!date) {
      return null;
    }
    return moment(date).format("HH:mm:ss");
  }

  static countDaysOtherThanSunday(startDate, endDate) {
    if (startDate && endDate) {
      const start_date = new Date(startDate);
      const end_date = new Date(endDate);
      let numDays = 0;

      for (let day = start_date; day <= end_date; day.setDate(day.getDate() + 1)) {
        if (day.getDay() !== 0) { // 0 = Sunday
          numDays++;
        }
      }
      return numDays;
    }
    else return null
  }

  static getDaysInAMonth(start_date, end_date) {
    if (start_date && end_date) {

      let start = moment(start_date);

      let end = moment(end_date);

      let numberOfDays = end.diff(start, 'days') + 1;

      return numberOfDays;

    } else {
      return null
    }

  }
  static getStartAndEndOfDay(date) {
    // Set the start time to 12:00 AM
    var start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

    // Set the end time to 11:59 PM
    var end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    // Return an object with the start and end dates
    return { start: start, end: end };
  }

  static subtract(value) {
    if(value !== undefined){
    const newDate = new Date();

    const weeklyDate = new Date(newDate.getTime() - value * 24 * 60 * 60 * 1000);

    const date = weeklyDate.toISOString().split('T')[0];

    return date;
}
  }

  static getOnehourAgo(currentDate) {

    let utcDate = DateTime.UTCtoLocalTime(currentDate);

    const givenTime = moment(utcDate);
    const oneHourEarlier = givenTime.clone().subtract(1, 'hour');
    const formattedOneHourEarlier = oneHourEarlier.format(dateTime.formats.mySQLDateTimeFormat);

    const formattedOneHourEarlierTime = moment(formattedOneHourEarlier, dateTime.formats.mySQLDateTimeFormat);
    const onehourAgo = formattedOneHourEarlierTime.format('YYYY-MM-DD HH:mm:ss.SSSZ');

    return onehourAgo
  }
  static compareTime(startTime, endTime) {
    try {

      let currentDate = new Date();

      startTime = new Date(Date.parse(startTime));

      endTime = new Date(Date.parse(endTime));

      if (startTime instanceof Date && endTime instanceof Date) {

        let startTimeHour = startTime.getHours();
        let startTimeMinute = startTime.getMinutes();
        let startTimeSeconds = endTime.getSeconds();

        let endTimeHour = endTime.getHours();
        let endTimeMinute = endTime.getMinutes();
        let endTimeSeconds = endTime.getSeconds();

        let currentTimeHour = currentDate.getHours();
        let currentTimeMinutes = currentDate.getMinutes();
        let currentTimeSeconds = currentDate.getMinutes();

        let hourValidation = currentTimeHour >= startTimeHour && currentTimeHour <= endTimeHour;

        let minuteValidation = startTimeMinute > 0 && endTimeMinute > 0 ? currentTimeMinutes >= startTimeMinute && currentTimeMinutes <= endTimeMinute : true;

        let secondValidation = startTimeSeconds > 0 && endTimeSeconds > 0 ? currentTimeSeconds >= startTimeSeconds && currentTimeSeconds <= endTimeSeconds : true;

        return hourValidation && minuteValidation && secondValidation ? true : false;

      }
    } catch (err) {
      console.log(err);
    }
  }

  static CurrentStartMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const startDate = new Date(currentYear, currentMonth, 1);

    return startDate;
  }

  static CurrentEndMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const endDate = new Date(currentYear, currentMonth + 1, 0);

    return endDate;
  }

  static getVariable() {
    return dateTime.formats;
  }

  static GetCurrentTime(date) {
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute
      .toString()
      .padStart(2, '0')}`;
    return currentTime
  }

  static getTimeOrNull(inputDate) {
    const date = new Date(inputDate);
    const time = date.toISOString().split('T')[1];
    if (time === '00:00:00.000Z') {
      return null;
    } else {
      return inputDate;
    }
  }

  static CompareTwoDate(sourceDate, destinationDate) {

    const date1 = this.formatDate(sourceDate, dateTime.formats.mySQLDateFormat);

    const date2 = this.formatDate(destinationDate, dateTime.formats.mySQLDateFormat);

    if (date1 < date2) {
      return true;
    } else if (date1 > date2) {
      return true;
    } else {
      return false;
    }
  }

  static getTimeZoneDateTime(dateTime , format){
    
    if (dateTime ) {
      let dateValue = new Date(dateTime).toLocaleString("en-US", {
        timeZone: timeZone
      });

      return moment(dateValue).format(format)
    }
      return dateTime ? moment(dateTime).format(format) : ""
  }

  static getUserTimeZoneTime(time, format="hh:mm A"){

    let convertedTime = this.getTimeZoneDateTime(time, format)

    if(convertedTime){
      return convertedTime;
    }
    
    return time ?  moment(time).format(format) : "";
  }

  static GetFormatedTime(date) {
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const isAM = currentHour < 12;
    let formattedHour = currentHour % 12;
    formattedHour = formattedHour === 0 ? 12 : formattedHour;
  
    const currentTime = `${formattedHour.toString().padStart(2, '0')}:${currentMinute
      .toString()
      .padStart(2, '0')} ${isAM ? 'AM' : 'PM'}`;  
    return currentTime;
  }

  static getTodayDate(timeZone) {

    if (timeZone) {
      
      let dateValue = new Date().toLocaleString("en-US", {
        timeZone: timeZone,
      });

      return new Date(dateValue)
    }
  }
  static UTCtoLocalTimeAndMmmFormat(date) {
    if (!date) {
      return null;
    }
    let gmtDateTime = moment.utc(date);

    return gmtDateTime.local().format("DD-MMM-YY hh:mm A");
  }

  static getDateTimeByUserProfileTimezone(date, format="DD-MMM-YY hh:mm A") {
    let dateTime = this.getTimeZoneDateTime(date, format)
    if(dateTime){
      return dateTime;
    }
    return this.UTCtoLocalTimeAndMmmFormat(date);
  }


}
const dateTime = new DateTime();
// dateTime.formats.formattedDateFormat
module.exports = DateTime;
