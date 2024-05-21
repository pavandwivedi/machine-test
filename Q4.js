function fillMissingMonths(data) {
    // Create a dictionary for fast lookups
    const dataDict = {};
    data.forEach(item => {
        dataDict[item.month] = item.value;
    });
   
    // Create the complete list with all months
    const completeData = [];
    for (let month = 1; month <= 12; month++) {
        if (dataDict.hasOwnProperty(month)) {
            completeData.push({ month: month, value: dataDict[month] });
        } else {
            completeData.push({ month: month, value: 0 });
        }
    }

    return completeData;
}

// Example input
const data = [
    { month: 4, value: 80 },
    { month: 6, value: 10 },
    { month: 9, value: 20 },
    { month: 12, value: 50 }
];

// Call the function with the example input
const filledData = fillMissingMonths(data);
console.log(filledData);
