// task: Calculate days between two dates without using any Date functions in JS
const express = require("express");
const app = express();

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
    (year1 === year2 && (month1 > month2 || (month1 === month2 && day1 > day2)))
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

  let totalDays = 0;

  // Calculate days for intermediate years
  for (let y = year1 + 1; y < year2; y++) {
    totalDays += (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 366 : 365;
  }
  console.log("totalDays", totalDays);
  // Calculate remaining days in the first year
  for (let m = month1; m <= 12; m++) {
    totalDays += daysInMonth(m, year1);
  }
  console.log("totalDays2", totalDays);
  totalDays -= day1;
  console.log("totalDay3", totalDays);
  // Add days for the last year
  for (let m = 1; m < month2; m++) {
    totalDays += daysInMonth(m, year2);
  }
  console.log("totalDays4", totalDays);
  totalDays += day2;
  console.log("totalDays5", totalDays);
  // Adjust for same year case
  if (year1 === year2) {
    totalDays = 0;
    for (let m = month1; m < month2; m++) {
      totalDays += daysInMonth(m, year1);
    }
    console.log("totalDays6", totalDays);
    totalDays += day2 - day1;
    console.log("totalDays7", totalDays);
  }
  console.log("totalDays8", totalDays);
  return totalDays;
};

console.log(countDays("11/01/2023", "20/05/2024"));
app.listen(3003, () => {
  return "server is running on 3003";
});

// with date function ---------------------------------------------------------------------------------------------------------------
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

  // Calculate the difference in time (in milliseconds)
  const diffTime = Math.abs(date2 - date1);

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

console.log(
  "w date",
  countDaysUsingDateWithCustomFormat("11/01/2023", "20/05/2024")
);

// ------------- notes ---------
// date is valid  =>  date has (valid days + valid months)

//   // Calculate the difference in days
//   const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
//   const diffDays = Math.round(Math.abs((Date1 - Date2) / oneDay));

// function isLeapYear(year) {
//   return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
// }

// function daysInMonth(month, year) {
//   const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//   if (month === 2 && isLeapYear(year)) {
//       return 29;
//   }
//   return monthDays[month - 1];
// }

// function incrementDate(year, month, day) {
//   day++;
//   if (day > daysInMonth(month, year)) {
//       day = 1;
//       month++;
//       if (month > 12) {
//           month = 1;
//           year++;
//       }
//   }
//   return [year, month, day];
// }

// function daysBetweenDates(date1, date2) {
//   let [year1, month1, day1] = date1;
//   let [year2, month2, day2] = date2;

//   // Ensure date1 is the earlier date
//   if (year1 > year2 || (year1 === year2 && month1 > month2) || (year1 === year2 && month1 === month2 && day1 > day2)) {
//       [year1, month1, day1, year2, month2, day2] = [year2, month2, day2, year1, month1, day1];
//   }

//   let daysCount = 0;

//   // Increment from date1 to date2
//   while (year1 !== year2 || month1 !== month2 || day1 !== day2) {
//       [year1, month1, day1] = incrementDate(year1, month1, day1);
//       daysCount++;
//   }

//   return daysCount;
// }

// // Example usage:
// const date1 = [2023, 10, 1]; // YYYY, MM, DD
// const date2 = [2023, 10, 15];

// console.log(daysBetweenDates(date1, date2)); // Output: 14
