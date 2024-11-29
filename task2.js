// task: Calculate days between two dates without using any Date functions in JS
const express = require("express");
const app = express();
const validateDate = (date) => {
  const dateSplit = date.split("/");
  if (dateSplit?.length > 3 && dateSplit?.length < 3) {
    return `Invalid Date`;
  }
  if (dateSplit[2] >= 1900 && dateSplit[2] <= 9999) {
    if (dateSplit[1] >= 1 && dateSplit[1] <= 12) {
      if (
        dateSplit[0] >= 1 &&
        dateSplit[0] <= 31 &&
        (dateSplit[1] == 1 ||
          dateSplit[1] == 3 ||
          dateSplit[1] == 5 ||
          dateSplit[1] == 7 ||
          dateSplit[1] == 8 ||
          dateSplit[1] == 10 ||
          dateSplit[1] == 12)
      )
        return { dateSplit, code: 1 };
      else if (
        dateSplit[0] >= 1 &&
        dateSplit[0] <= 30 &&
        (dateSplit[1] == 4 ||
          dateSplit[1] == 6 ||
          dateSplit[1] == 9 ||
          dateSplit[1] == 11)
      )
        return { dateSplit, code: 1 };
      else if (dateSplit[0] >= 1 && dateSplit[0] <= 28 && dateSplit[1] == 2)
        return { dateSplit, code: 1 };
      else if (
        dateSplit[0] == 29 &&
        dateSplit[1] == 2 &&
        (dateSplit[2] % 400 == 0 ||
          (dateSplit[2] % 4 == 0 && dateSplit[2] % 100 != 0))
      )
        return { dateSplit, code: 1 };
      else return "Day is invalid.\n";
    } else {
      return "Month is not valid.\n";
    }
  } else {
    return "Year is not valid.\n";
  }
};

const countDays = (...arguments) => {
  const [Date1, Date2] = Array.from(arguments).map((date) =>
    validateDate(date)
  );
  if (Date1.code !== 1 || Date2.code !== 1) {
    return `Invalid Dates`;
  }
  console.log(Date1.dateSplit);
  let difDays;
  let difMonth;
  let difYear;

  difDays = parseInt(Date1.dateSplit[0]) - parseInt(Date2.dateSplit[0]);
  difMonth = parseInt(Date1.dateSplit[1]) - parseInt(Date2.dateSplit[1]);
  difYear = parseInt(Date1.dateSplit[2]) - parseInt(Date2.dateSplit[2]);

  console.log(difDays, difMonth, difYear);
};
console.log(countDays("11/05/2024", "20/01/2024"));
app.listen(3003, () => {
  return "server is running on 3003";
});

// ------------- notes ---------
// date is valid  =>  date has (valid days + valid months)

//   // Calculate the difference in days
//   const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
//   const diffDays = Math.round(Math.abs((Date1 - Date2) / oneDay));

//   return diffDays;
// };

// // Example usage
// const days = countDays("2023-10-01", "2023-10-10");
// console.log(days); // Output should be 9
