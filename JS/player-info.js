// Function to retrieve player data based on player name
function getPlayerData(playerName) {
    try {
        return $.ajax({
            url: 'http://localhost:3000/api/players',
            method: 'GET',
            dataType: 'json',
        });
    } catch (error) {
        console.error('Error fetching player data:', error);
        return null;
    }
}

// Function to populate player information
function populatePlayerInfo(playerData, targetElements) {
    if (playerData) {
        console.log("Player Data:", playerData);

        for (const key in targetElements) {
            if (Object.prototype.hasOwnProperty.call(targetElements, key)) {
                const element = $('#' + targetElements[key]);
                console.log("Element:", element);

                if (key === "player-image") {
                    console.log("Image source:", playerData.imageSrc);
                    element.attr('src', playerData.imageSrc);
                } else {
                    element.text(playerData[key]);
                }
            }
        }
    } else {
        alert("Player not found");
    }
}

// Function to handle player search form submission
function handlePlayerSearch() {
    const playerName = $("#input").val();
    getPlayerData(playerName)
        .done(function(players) {
            const playerData = players[playerName];
            if (playerData) {
                // Store player data in localStorage
                localStorage.setItem('playerData', JSON.stringify(playerData));

                // Redirect to the "Player Info" page
                window.location.href = "player-info.html";
            } else {
                alert("Player not found");
            }
        })
        .fail(function(error) {
            console.error('Error handling player search:', error);
            alert("An error occurred while fetching player data");
        });
}

// Check if we are on the "Player Info" page and display player data
if (window.location.href.endsWith("player-info.html")) {
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
$(".search-player-bar form").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    handlePlayerSearch();
});

// Function to handle popular player image click
function handlePopularPlayerClick(playerName) {
    getPlayerData(playerName)
        .done(function(players) {
            const playerData = players[playerName];
            if (playerData) {
                // Store player data in localStorage
                localStorage.setItem('playerData', JSON.stringify(playerData));

                // Redirect to the "Player Info" page
                window.location.href = "player-info.html";
            } else {
                alert("Player not found");
            }
        })
        .fail(function(error) {
            console.error('Error handling popular player click:', error);
            alert("An error occurred while fetching player data");
        });
}

// Add event listeners to popular player images
$(".popular-player").click(function () {
    const playerName = $(this).next().text();
    console.log("Popular player image clicked for:", playerName);
    handlePopularPlayerClick(playerName);
});
