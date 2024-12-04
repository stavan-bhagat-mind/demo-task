// task: Calculate days between two dates without using any Date functions in JS
const express = require("express");
const app = express();

{
  const validateDate = (date) => {
    const dateSplit = date.split("/");
    if (dateSplit.length !== 3) {
      return { msg: "Invalid Date" };
    }

    const [day, month, year] = dateSplit.map(Number);

    if (year < 1900 || year > 9999) {
      return { msg: "Year is not valid." };
    }

    if (month < 1 || month > 12) {
      return { msg: "Month is not valid." };
    }

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      daysInMonth[1] = 29;
    }

    if (day < 1 || day > daysInMonth[month - 1]) {
      return { msg: "Day is invalid." };
    }

    return { dateSplit: [day, month, year], code: 1 };
  };

  const daysInMonth = (month, year) => {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      days[1] = 29;
    }
    return days[month - 1];
  };

  const getDayOfWeek = (day, month, year) => {
    // GEEKS FOR GEEKS
    // Zeller's Congruence algorithm to determine day of the week
    if (month < 3) {
      month += 12;
      year--;
    }
    const k = year % 100;
    const j = Math.floor(year / 100);
    const f =
      day +
      Math.floor((13 * (month + 1)) / 5) +
      k +
      Math.floor(k / 4) +
      Math.floor(j / 4) -
      2 * j;

    return ((f % 7) + 6) % 7;
    //note--(+7=sat=0),(+6=sun=0),(+5=mon=0),(+4=tue=0)....
  };

  const countWeekDaysBetweenDates = (date1, date2) => {
    const [day1, month1, year1] = date1;
    const [day2, month2, year2] = date2;

    let totalWeekDays = 0;
    let currentDay = day1;
    let currentMonth = month1;
    78;
    let currentYear = year1;

    // iteration day by day from date1 to date2
    while (
      currentYear < year2 ||
      (currentYear === year2 &&
        (currentMonth < month2 ||
          (currentMonth === month2 && currentDay <= day2)))
    ) {
      const dayOfWeek = getDayOfWeek(currentDay, currentMonth, currentYear);
      // Check if the day is not Saturday (6) or Sunday (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        totalWeekDays++;
      }
      currentDay++;
      if (currentDay > daysInMonth(currentMonth, currentYear)) {
        currentDay = 1;
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      }
    }

    return totalWeekDays;
  };

  const countDays = (...arguments) => {
    const [Date1, Date2] = Array.from(arguments).map((date) =>
      validateDate(date)
    );

    if (Date1.code !== 1 || Date2.code !== 1) {
      return `Invalid Dates: ${Date1.msg || Date2.msg}`;
    }

    let [day1, month1, year1] = Date1.dateSplit;
    let [day2, month2, year2] = Date2.dateSplit;

    // Ensure Date1 is earlier than Date2
    if (
      year1 > year2 ||
      (year1 === year2 &&
        (month1 > month2 || (month1 === month2 && day1 > day2)))
    ) {
      [day1, month1, year1, day2, month2, year2] = [
        day2,
        month2,
        year2,
        day1,
        month1,
        year1,
      ];
    }

    const totalWeekDays = countWeekDaysBetweenDates(
      [day1, month1, year1],
      [day2, month2, year2]
    );

    return totalWeekDays;
  };
  // format ----> dd/mm/yyyy
  console.log("w/o date", countDays("11/01/2023", "11/01/2024"));
}

app.listen(3003, () => {
  return "server is running on 3003";
});

//----- WITH DATE FUNCTION -----used just to ensure that my created function anser is true or not ---------------------------------------------------------------------------------------------------------------
const convertToISODate = (dateStr) => {
  // Split the date string into day, month, and year
  const [day, month, year] = dateStr.split("/").map(Number);
  // Create a new Date object (month is 0-indexed)
  return new Date(year, month - 1, day);
};

const countDaysUsingDateWithCustomFormat = (dateStr1, dateStr2) => {
  // Convert the date strings to Date objects
  const date1 = convertToISODate(dateStr1);
  const date2 = convertToISODate(dateStr2);

  // Check if the dates are valid
  if (isNaN(date1) || isNaN(date2)) {
    return "Invalid Dates";
  }

  // Ensure date1 is the earlier date
  const startDate = date1 < date2 ? date1 : date2;
  const endDate = date1 < date2 ? date2 : date1;

  let diffDays = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Increment the count if it's not a Saturday (6) or Sunday (0)
      diffDays++;
    }
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return diffDays;
};

console.log(
  "with date",
  countDaysUsingDateWithCustomFormat("11/01/2023", "11/01/2024")
);

// ------------- notes ---------
// date is valid  =>  date has (valid days + valid months)
//calculation for days in first year
// calculation for days in last year
//manage leap years

//-----------------------
