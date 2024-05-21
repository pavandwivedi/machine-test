function removeDuplicates(arr) {
    // Create a map to track unique objects by their id and value
    const uniqueMap = new Map();
    
    // Loop through the array and add unique items to the map
    arr.forEach(item => {
        const key = `${item.id}-${item.value}`;
        if (!uniqueMap.has(key)) {
            uniqueMap.set(key, item);
        }
    });

    // Convert the map values back to an array
    const uniqueArray = Array.from(uniqueMap.values());

    return uniqueArray;
}

// Example input
const arr = [
    {id: 1, value: 'xyz'},
    {id: 2, value: 'abc'},
    {id: 1, value: 'xyz'},
    {id: 3, value: 'pqr'},
    {id: 3, value: 'pqr'}
];

// Call the function with the example input
const uniqueArr = removeDuplicates(arr);
console.log(uniqueArr);
