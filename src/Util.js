const dayjs = require("dayjs");
const uuid = require('uuid')

exports.isTodayDateTime = (datetime) => {
  const compare = dayjs(datetime);
  const todayjs = dayjs();
  if (todayjs.year() === compare.year() && todayjs.month() === compare.month() && todayjs.date() === compare.date()) return true;
  else return false;
};

exports.isSameday = (Day1, Day2) => {
  const Day1js = dayjs(Day1);
  const Day2js = dayjs(Day2);
  if (Day1js.format("YYYYMMDD") === Day2js.format("YYYYMMDD")) {
    return true;
  } else {
    return false;
  }
};

exports.isSatSun = (Day) => {
  daynum = dayjs(Day).get("day");
  if (daynum === 0 || daynum === 6) return true;
  else return false;
};

exports.getTime2Int = (timestring) => {
  return parseInt(timestring);
};

exports.getHourMinute = (timestring) => {
  const Hour = timestring.substr(0, 2);
  const Minute = timestring.substr(2, 4);

  const IntHour = parseInt(Hour);
  const IntMinute = parseInt(Minute);

  return { IntHour, IntMinute };
};

exports.getDatetime2HourMinuteString = (datime) => {
  return dayjs(datime).format("HHmm");
};

exports.getMysqlDateTime = (datetime) => {
  if (dayjs(datetime, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
    return dayjs(datetime).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return false;
  }
};

exports.getMysqlDateYMD = (datetime) => {
  return dayjs(datetime).format("YYYYMMDD");
};

exports.getIntervalYMInt = (startDay, endDay) => {
  let dayList = [];
  let currentDay = dayjs(startDay);
  let enddayjs = dayjs(endDay);
  while (currentDay <= enddayjs) {
    dayList.push(dayjs(new Date(currentDay)).month().format("YYYYMM"));
    currentDay = dayjs(currentDay).add(1, "month");
  }
  return dayList;
};

exports.getIntervalDaysMysqlDatetime = (startDay, endDay) => {
  let dayList = [];
  let returnlist = [];
  let currentDay = dayjs(startDay);
  let enddayjs = dayjs(endDay);
  while (currentDay <= enddayjs) {
    dayList.push(new Date(currentDay));
    currentDay = dayjs(currentDay).add(1, "day");
  }

  for (index = 0; index < dayList.length; index++) {
    returnlist.push(dayjs(dayList[index]).format("YYYY-MM-DD HH:mm:ss"));
  }

  return returnlist;
};

exports.getIntervalMinuteInt = (day1, day2) => {
  return dayjs(day2).diff(dayjs(day1), "minute");
};

exports.getTodayYMD = () => {
  return dayjs().format("YYYYMMDD");
};

exports.getNowMysql = () => {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
};

exports.getIntYMD2MysqlDateTime = (intYMD) => {
  const stringYMD = String(intYMD);
  const datetime = dayjs(stringYMD, "YYYYMMDD");
  return datetime.format("YYYY-MM-DD HH:mm:ss");
};

exports.getIntYMD2MysqlDateEndTime = (intYMD) => {
  const stringYMD = String(intYMD);
  let datetime = dayjs(stringYMD, "YYYYMMDD");
  datetime = datetime.set("hour", 23).set("minute", 59).set("second", 59).set("millisecond", 59);
  return datetime.format("YYYY-MM-DD HH:mm:ss");
};

exports.getIntYMD2string = (intYMD) => {
  const stringYMD = String(intYMD);
  const datetime = dayjs(stringYMD, "YYYYMMDD");
  return datetime.format("YYYY-MM-DD");
};

exports.getYMD = (timeString) => {
  return dayjs(timeString).format("YYYYMMDD");
};

exports.getYMD_Month = (YMDstring) => {
  return dayjs(YMDstring, "YYYYMMDD").month() + 1;
};

exports.getYMD_Year = (YMDstring) => {
  const test = dayjs(String(YMDstring), "YYYYMMDD");
  const result = test.year();
  return result;
};

exports.getMonth = (dateTimestring) => {
  //Months are zero indexed, so January is month 0.
  return dayjs(dateTimestring, "YYYY-MM").month + 1;
};

exports.getMonthStart = (dateTimestring) => {
  const day = dayjs(dateTimestring, "YYYY-MM").set("date", 1).format();
  return day;
};

exports.getMonthEnd = (dateTimestring) => {
  const day = dayjs(dateTimestring, "YYYY-MM");
  const lastday = day.daysInMonth();
  let returnval = day.set("date", lastday).format();
  returnval = dayjs(returnval).set("hour", 23).set("minute", 59).set("second", 59).set("millisecond", 59);
  return returnval;
  6;
};

exports.getYMDdayStart = (dateTimestring) => {
  const day = dayjs(dateTimestring, "YYYYMMDD").set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0);
  return day;
};

exports.getYMDdayEnd = (dateTimestring) => {
  const day = dayjs(dateTimestring, "YYYYMMDD").set("hour", 23).set("minute", 59).set("second", 59).set("millisecond", 59);
  return day;
};

exports.getDaynum = (Day) => {
  return (daynum = dayjs(Day).get("day"));
};

exports.checkInsertQueryVaild = (res, text, value, insertlist, valuelist, isDate = false) => {
  insertlist.push(text);
  if (!value) {
    if (!res.headersSent) {
      res.status(400).send(`required ${text}`);
    }
  }
  if (isDate) {
    const mysqlDate = this.getMysqlDateTime(value);
    if (!mysqlDate) {
      if (!res.headersSent) {
        res.status(400).send(`incorrect ${text}`);
      }
      return false;
    }
    valuelist.push(mysqlDate);
  } else {
    valuelist.push(value);
  }
  return true;
};

exports.getuuid = () =>{
  return uuid.v4();
}