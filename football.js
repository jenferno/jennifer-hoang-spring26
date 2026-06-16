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

function setLoading(isLoading) {
    scorersButton.disabled = isLoading;
    leaguesButton.disabled = isLoading;
}

function hasApiErrors(data) {
    return data.errors && Object.keys(data.errors).length > 0;
}

function getFlagUrl(nationality) {
    const countryCode = flagCodes[nationality];

    if (!countryCode) {
        return "";
    }

    return `https://flagcdn.com/24x18/${countryCode}.png`;
}

function createFlagImage(flagUrl, altText) {
    if (!flagUrl) {
        return "";
    }

    return `
        <img
            src="${flagUrl}"
            alt="${altText}"
            class="country-flag"
        >
    `;
}

function fetchTopScorers() {
    clearDisplay();
    setLoading(true);

    dataTitle.textContent = "Top Scorers";
    dataDescription.textContent = "Premier League top scorers by goals.";

    fetch(`${baseUrl}/players/topscorers?league=39&season=2023`, {
        headers: {
            "x-apisports-key": apiKey
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("API request failed.");
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data);

            footballDataList.innerHTML = "";
            statusMessage.textContent = "";

            if (hasApiErrors(data)) {
                showError("API error. Check your API key, endpoint, or request limit.");
                return;
            }

            if (!data.response || data.response.length === 0) {
                showError("No top scorer data is available.");
                return;
            }

            for (let i = 0; i < data.response.length; i++) {
                const playerData = data.response[i];
                const player = playerData.player;
                const stats = playerData.statistics[0];

                const flagUrl = getFlagUrl(player.nationality);

                const flagImage =
                    createFlagImage(flagUrl, `${player.nationality} flag`);

                renderListItem(`
                    <div class="player-card-header">
                        <img
                            src="${player.photo}"
                            alt="${player.name}"
                            class="player-photo"
                        >

                        <div>
                            <h3>${player.name}</h3>

                            <p class="nationality">
                                ${flagImage}
                                ${player.nationality}
                            </p>
                        </div>
                    </div>

                    <p>
                        <img
                            src="${stats.team.logo}"
                            alt="${stats.team.name} logo"
                            class="team-logo"
                        >
                        <strong>Team:</strong> ${stats.team.name}
                    </p>

                    <p><strong>Goals:</strong> ${stats.goals.total ?? "N/A"}</p>
                    <p><strong>Assists:</strong> ${stats.goals.assists ?? 0}</p>
                    <p><strong>Appearances:</strong> ${stats.games.appearences ?? "N/A"}</p>
                `);
            }
        })
        .catch(function (error) {
            console.error("Top scorers error:", error);
            showError("Unable to load top scorers.");
        })
        .finally(function () {
            setLoading(false);
        });
}

function fetchCurrentLeagues() {
    clearDisplay();
    setLoading(true);

    dataTitle.textContent = "Current Leagues";
    dataDescription.textContent =
        "Displaying active football leagues sorted by the most recent season.";

    fetch(`${baseUrl}/leagues?current=true`, {
        headers: {
            "x-apisports-key": apiKey
        }
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("API request failed.");
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data);

            footballDataList.innerHTML = "";
            statusMessage.textContent = "";

            if (hasApiErrors(data)) {
                showError("API error. Check your API key, endpoint, or request limit.");
                return;
            }

            if (!data.response || data.response.length === 0) {
                showError("No league data is available.");
                return;
            }

            const sortedLeagues = data.response.sort(function (a, b) {
                const seasonA = a.seasons[a.seasons.length - 1].year;
                const seasonB = b.seasons[b.seasons.length - 1].year;

                return seasonB - seasonA;
            });

            const leaguesToDisplay = sortedLeagues.slice(0, 20);

            for (let i = 0; i < leaguesToDisplay.length; i++) {
                const item = leaguesToDisplay[i];

                const latestSeason =
                    item.seasons[item.seasons.length - 1];

                const flagImage =
                    createFlagImage(
                        item.country.flag,
                        `${item.country.name} flag`
                    );

                renderListItem(`
                    <h3>${item.league.name}</h3>

                    <p>
                        ${flagImage}
                        <strong>Country:</strong> ${item.country.name}
                    </p>

                    <p><strong>Type:</strong> ${item.league.type}</p>
                    <p><strong>Latest Season:</strong> ${latestSeason.year}</p>
                    <p><strong>Season Start:</strong> ${latestSeason.start}</p>
                    <p><strong>Season End:</strong> ${latestSeason.end}</p>
                `);
            }
        })
        .catch(function (error) {
            console.error("Leagues error:", error);
            showError("Unable to load current leagues.");
        })
        .finally(function () {
            setLoading(false);
        });
}

scorersButton.addEventListener("click", fetchTopScorers);
leaguesButton.addEventListener("click", fetchCurrentLeagues);