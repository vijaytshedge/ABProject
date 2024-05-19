function distributeCalls(result) {
    // Extract the array of experiences from the result object
    const arr_exps = result.arr_exps;

    // Calculate the total percentage
    const totalPercentage = arr_exps.reduce((total, exp) => total + parseFloat(exp.percentage), 0);

    // Generate a random number between 0 and totalPercentage
    const random = Math.random() * totalPercentage;

    // Iterate over the experiences to find the one that corresponds to the random number
    let accumulatedPercentage = 0;
    for (const exp of arr_exps) {
        accumulatedPercentage += parseFloat(exp.percentage);
        if (random < accumulatedPercentage) {
            // Return the name of the selected experience
            return exp.name;
        }
    }

    // In case of any issue, return null
    return null;
}

// Example usage:
const result = {
    arr_exps: [
        { name: 1, percentage: "10%" },
        { name: 2, percentage: "30%" },
        { name: 3, percentage: "60%" }
    ]
};


for (let i=0; i<10; i++) {
    const selectedExp = distributeCalls(result);
    console.log("Selected experience:", selectedExp);
}
