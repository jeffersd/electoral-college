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
        const newPriority = calculatePriority(state.state, state["population estimate"], state.seats);
        //const newPriority = calculatePriority(state.state, state.population, state.seats);

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

const data = require("./state_data.json");
const newStates = initializeSeats(data);

const remainingElectoralVotes = (535 - 100 - 50); // 385

for (let i = 0; i < remainingElectoralVotes; i++) {
    getNextState(newStates);
}

//console.log("break ------ now these states would get new electoral votes -----");

let redCount = 0,
    blueCount = 0,
    swingCount = 0;

for (let i = 0; i < 65; i++) {
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
        swingCount++;
    }
}

console.log(`red state increase: ${redCount}\nblue state increase: ${blueCount}\nswing state increase: ${swingCount}`);
