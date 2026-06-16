const apiKey = "ed4a96e313e0845e452f8c1d0dc79507";
const baseUrl = "https://v3.football.api-sports.io";

const dataTitle = document.querySelector("#data-title");
const dataDescription = document.querySelector("#data-description");
const statusMessage = document.querySelector("#status-message");
const footballDataList = document.querySelector("#football-data-list");

const scorersButton = document.querySelector("#show-scorers");
const leaguesButton = document.querySelector("#show-leagues");

const flagCodes = {
    England: "gb-eng",
    France: "fr",
    Spain: "es",
    Germany: "de",
    Brazil: "br",
    Argentina: "ar",
    Portugal: "pt",
    Netherlands: "nl",
    Norway: "no",
    Egypt: "eg",
    Belgium: "be",
    Italy: "it",
    Uruguay: "uy",
    Sweden: "se",
    Denmark: "dk",
    Croatia: "hr",
    Morocco: "ma",
    Senegal: "sn"
};

function clearDisplay() {
    footballDataList.innerHTML = "";
    statusMessage.textContent = "Loading...";
}

function showError(message) {
    footballDataList.innerHTML = "";
    statusMessage.textContent = message;
}

function renderListItem(htmlContent) {
    const listItem = document.createElement("li");
    listItem.innerHTML = htmlContent;
    footballDataList.appendChild(listItem);
}

function getFlagUrl(nationality) {
    const countryCode = flagCodes[nationality];

    if (!countryCode) {
        return "";
    }

    return `https://flagcdn.com/24x18/${countryCode}.png`;
}

function fetchTopScorers() {
    clearDisplay();

    dataTitle.textContent = "Top Scorers";
    dataDescription.textContent = "Premier League top scorers by goals.";

    fetch(`${baseUrl}/players/topscorers?league=39&season=2023`, {
        headers: {
            "x-apisports-key": apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            footballDataList.innerHTML = "";
            statusMessage.textContent = "";

            if (!data.response || data.response.length === 0) {
                showError("No top scorer data is available.");
                return;
            }

            for (let i = 0; i < data.response.length; i++) {
                const playerData = data.response[i];
                const player = playerData.player;
                const stats = playerData.statistics[0];

                const flagUrl = getFlagUrl(player.nationality);

                const flagImage = flagUrl
                    ? `<img src="${flagUrl}" alt="${player.nationality} flag" class="country-flag">`
                    : "";

                renderListItem(`
                    <div class="player-card-header">
                        <img src="${player.photo}" alt="${player.name}" class="player-photo">

                        <div>
                            <h3>${player.name}</h3>

                            <p class="nationality">
                                ${flagImage}
                                ${player.nationality}
                            </p>
                        </div>
                    </div>

                    <p>
                        <img src="${stats.team.logo}" alt="${stats.team.name} logo" class="team-logo">
                        <strong>Team:</strong> ${stats.team.name}
                    </p>

                    <p><strong>Goals:</strong> ${stats.goals.total}</p>
                    <p><strong>Assists:</strong> ${stats.goals.assists ?? 0}</p>
                    <p><strong>Appearances:</strong> ${stats.games.appearences}</p>
                `);
            }
        })
        .catch(error => {
            console.error("Top scorers error:", error);
            showError("Unable to load top scorers.");
        });
}

function fetchCurrentLeagues() {
    clearDisplay();

    dataTitle.textContent = "Current Leagues";
    dataDescription.textContent = "Currently active football leagues.";

    fetch(`${baseUrl}/leagues?current=true`, {
        headers: {
            "x-apisports-key": apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            footballDataList.innerHTML = "";
            statusMessage.textContent = "";

            if (!data.response || data.response.length === 0) {
                showError("No league data is available.");
                return;
            }

            for (let i = 0; i < data.response.length; i++) {
                const item = data.response[i];

                renderListItem(`
                    <h3>${item.league.name}</h3>

                    <p>
                        <img src="${item.country.flag}" alt="${item.country.name} flag" class="country-flag">
                        <strong>Country:</strong> ${item.country.name}
                    </p>

                    <p><strong>Type:</strong> ${item.league.type}</p>
                    <p><strong>Season:</strong> ${item.seasons[0].year}</p>
                `);
            }
        })
        .catch(error => {
            console.error("Leagues error:", error);
            showError("Unable to load current leagues.");
        });
}

scorersButton.addEventListener("click", fetchTopScorers);
leaguesButton.addEventListener("click", fetchCurrentLeagues);