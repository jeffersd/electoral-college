function initializeSeats (states) {
    return states.map((state) => {
        state.seats = 1;

        return state;
    });
}

function calculateElectoralVotes () {
}

function calculatePriority (state, population, seats) {
    return population / Math.sqrt(seats * (seats + 1))
}

function getNextState (states) {
    // for each state, find the one with the highest priority
    let maxState = {
        priority: 0,
    };

    states.forEach((state) => {
        const newPriority = calculatePriority(state.state, state["2020 population"], state.seats);

        if (maxState.priority < newPriority) {
            maxState = state;
            //maxState = JSON.parse(JSON.stringify(state));
            maxState.priority = newPriority;
            //console.log(state);
        }
    });
    //console.log("state with the highest priority:");
    //console.log(maxState.state);

    // // console.log(maxState.priority);

    maxState.seats = maxState.seats + 1;
    //console.log("new seats:", maxState.seats);

    return maxState;
}

function calculateAdditionalElectoralVotes (stateData, newElectoralVotes) {
    let redCount = 0,
        blueCount = 0,
        purpleCount = 0;

    console.log("------ now these states would get new electoral votes -----");

    for (let i = 0; i < newElectoralVotes; i++) {
        let newState = getNextState(newStates);



        if (newState.state === "Maine") {
            console.log("maine is here!");
            console.log(newState.color);
        }
        if (newState.state === "Puerto Rico") {
            console.log("Puerto Rico is here!");
            console.log(newState.color);
        }


        if (newState.color === "red") {
            redCount++;
        } else if (newState.color === "blue") {
            blueCount++;
        } else {
            purpleCount++;
        }
    }

    console.log(`red state increase: ${redCount}`);
    console.log(`blue state increase: ${blueCount}`);
    console.log(`purple state increase: ${purpleCount}`);
}



//start
const stateData = require("./state_data.json");
const newStates = initializeSeats(stateData);
const remainingElectoralVotes = (535 - 100 - stateData.length); // 385

for (let i = 0; i < remainingElectoralVotes; i++) {
    getNextState(newStates);
}

console.log(JSON.stringify(newStates, null, 2));
