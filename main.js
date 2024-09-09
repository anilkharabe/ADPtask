import axios from "axios";

const res = await axios.get(`https://interview.adpeai.com/api/v2/get-task`);
console.log(res.data.transactions.length);

let startDate = new Date("2023-01-01");
let endDate = new Date("2023-12-31");

let filteredDataYearWise = res.data.transactions.filter((a) => {
  let date = new Date(a.timeStamp);
  return date >= startDate && date <= endDate;
});

let employeeListWithAmount = {};

filteredDataYearWise.forEach((item) => {
  if (employeeListWithAmount[item.employee.id]) {
    employeeListWithAmount[item.employee.id] += item.amount;
  } else {
    employeeListWithAmount[item.employee.id] = item.amount;
  }
});

let highestAmountEmployeeDetails;

let highestAmount = -Infinity;

for (const key in employeeListWithAmount) {
  if (employeeListWithAmount[key] > highestAmount) {
    highestAmountEmployeeDetails = {
      employeeId: key,
      amount: employeeListWithAmount[key],
    };
    highestAmount = employeeListWithAmount[key];
  }
}

let txnList = [];

filteredDataYearWise.forEach((item) => {
  if (item.type === "alpha") {
    txnList.push(item.transactionID);
  }
});

let requestPayload = {
  id: res.data.id,
  result: txnList,
};

console.log("requestPayload", requestPayload);
requestPayload = JSON.stringify(requestPayload);

// axios
//   .post("https://interview.adpeai.com/api/v2/submit-task", requestPayload)
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
