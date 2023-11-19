// Function to retrieve player data based on player name
function getPlayerData(playerName) {
    // Simulated JSON data
    const players = {
        "Patrick Mahomes": {
            name: "Patrick Mahomes",
            position: "QB #15",
            team: "Kansas City Chiefs",
            age: 28,
            weight: 225,
            touchdowns: 17,
            passingYards: "4839/-",
            rushingYards: 258,
            imageSrc: "imgs/Patrick Mahomes.png"  
        },
        "Kyler murray": {
            name: "Kyler murray",
            position: "QB #1",
            team: "Arizona Cardinals",
            age: 26,
            weight: 207,
            touchdowns: 1,
            passingYards: "249/-",
            rushingYards: 33,
            imageSrc: "imgs/Kyler murray.png"  
        },
        "Saquon Barkley": {
            name: "Saquon Barkley",
            position: "RB #26",
            team: "New York Giants",
            age: 26,
            weight: 232,
            touchdowns: 3,
            passingYards: "-/105",
            rushingYards: 568,
            imageSrc: "imgs/Saquon Barkley.png"  
        },
        "Ezekiel Elliott": {
            name: "Ezekiel Elliott",
            position: "RB #15",
            team: "New England Patriots",
            age: 28,
            weight: 226,
            touchdowns: 2,
            passingYards: "-/108",
            rushingYards: 331,
            imageSrc: "imgs/Ezekiel Elliott.png"  
        },
        "Christian McCaffrey": {
            name: "Christian McCaffrey",
            position: "RB #23",
            team: "San Francisco 49ers",
            age: 27,
            weight: 210,
            touchdowns: 13,
            passingYards: "339/-",
            rushingYards: 747,
            imageSrc: "imgs/Christian McCaffrey.png"  
        },
        "Alvin Kamara": {
            name: "Alvin Kamara",
            position: "RB #41",
            team: "New Orleans Saints",
            age: 28,
            weight: 215,
            touchdowns: 3,
            passingYards: "-/305",
            rushingYards: 388,
            imageSrc: "imgs/Alvin Kamara.png"  
        },
        "Dak Prescott": {
            name: "Dak Prescott",
            position: "QB #4",
            team: "Dallas Cowboys",
            age: 30,
            weight: 238,
            touchdowns: 19,
            passingYards: "2415/-",
            rushingYards: 135,
            imageSrc: "imgs/Dak Prescott.png" 
        },
        "Derrick Henry": {
            name: "Derrick Henry",
            position: "RB #22",
            team: "Tennessee Titans",
            age: 29,
            weight: 247,
            touchdowns: 5,
            passingYards: "2/161",
            rushingYards: 625,
            imageSrc: "imgs/Derrick Henry.png"  
        },
        "Joe Burrow": {
            name: "Joe Burrow",
            position: "QB #9",
            team: "Cincinnati Bengals",
            age: 26,
            weight: 215,
            touchdowns: 2,
            passingYards: "2309/-",
            rushingYards: 88,
            imageSrc: "imgs/Joe Burrow.png"  
        },
        "Josh Allen": {
            name: "Josh Allen",
            position: "QB #17",
            team: "Buffalo Bills",
            age: 27,
            weight: 237,
            touchdowns: 26,
            passingYards: "2600/-",
            rushingYards: 246,
            imageSrc: "imgs/Josh Allen.png" 
        },
        "Josh Jacobs": {
            name: "Josh Jacobs",
            position: "RB #8",
            team: "Las Vegas Raiders",
            age: 25,
            weight: 223,
            touchdowns: 5,
            passingYards: "-/253",
            rushingYards: 622,
            imageSrc: "imgs/Josh Jacobs.png"  
        },
    };

    return players[playerName];
}

// Function to populate player information
function populatePlayerInfo(playerData, targetElements) {
    if (playerData) {
        for (const key in targetElements) {
            if (Object.prototype.hasOwnProperty.call(targetElements, key)) {
                const element = document.getElementById(targetElements[key]);

                if (key === "player-image") {
                    console.log("Image source:", playerData.imageSrc);
                    element.src = playerData.imageSrc;
                } else {
                    element.textContent = playerData[key];
                }
            }
        }
    } else {
        alert("Player not found");
    }
}

// Function to handle player search form submission
function handlePlayerSearch() {
    const playerName = document.getElementById("input").value;
    const playerData = getPlayerData(playerName);

    if (playerData) {
        // Store player data in localStorage
        localStorage.setItem('playerData', JSON.stringify(playerData));

        // Redirect to the "Player Profile" page
        window.location.href = "player-info.html";
    } else {
        alert("Player not found");
    }
}

// Check if we are on the "Player Profile" page and display player data
if (window.location.href.endsWith("player-info.html")) {
    // Retrieve player data from localStorage
    const playerDataString = localStorage.getItem('playerData');
    if (playerDataString) {
        const playerData = JSON.parse(playerDataString);

        const targetElements = {
            "player-image": "player-image",
            name: "player-name",
            position: "player-position",
            team: "player-team",
            age: "player-age",
            weight: "player-weight",
            touchdowns: "touchdowns",
            passingYards: "passing-yards",
            rushingYards: "rushing-yards"
        };

        populatePlayerInfo(playerData, targetElements);
    } else {
        alert("Player data not found");
    }
}

// Event listener for player search form on both pages
document.querySelector(".search-player-bar form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    handlePlayerSearch();
});

// Function to handle popular player image click
function handlePopularPlayerClick(playerName) {
    const playerData = getPlayerData(playerName);

    if (playerData) {
        // Store player data in localStorage
        localStorage.setItem('playerData', JSON.stringify(playerData));

        // Redirect to the "Player Profile" page
        window.location.href = "player-info.html";
    } else {
        alert("Player not found");
    }
}

// Add event listeners to popular player images
const popularPlayerImages = document.querySelectorAll(".popular-player");
popularPlayerImages.forEach(function (image) {
    image.addEventListener("click", function () {
        const playerName = image.nextElementSibling.textContent; // Assuming the player name is in the next sibling element (adjust if needed)
        handlePopularPlayerClick(playerName);
    });
});
