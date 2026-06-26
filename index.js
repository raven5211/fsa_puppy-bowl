// === CLASSES AND TYPE DECLARATIONS ===

/**
 * class representing teams playing in the PuppyBowl
 */
class Team {
  /**
   * @param {number} id - The unique identifier for the team
   * @param {string} name - The name of the team
   * @param {number} score - The current score of the team
   * @param {Player[]} players - A list of players on the team
   */
  constructor(id, name, score, players) {
    /**
     * The unique identifier for the team
     * @type {number}
     */
    this.id = id;

    /**
     * The name of the team
     * @type {string}
     */
    this.name = name;

    /**
     * The current score of the team
     * @type {number}
     */
    this.score = score;

    /**
     * A list of players on the team
     * @type {Player[]}
     */
    this.players = players;
  }
}

/**
 * class representing players playing in the PuppyBowl
 */
class Player {
  /**
   * @param {number} id - The unique identifier for the puppy
   * @param {string} name - The name of the puppy
   * @param {string} breed - The breed of the puppy
   * @param {Status} status - The status of the puppy.
   * @param {string} imageUrl - The URL to an image of the puppy
   * @param {number | null} teamId - The ID of the team this puppy is on, or null if not on a team
   */
  constructor(id, name, breed, status, imageUrl, teamId) {
    /**
     * The unique identifier for the puppy
     * @type {number}
     */
    this.id = id;

    /**
     * The name of the puppy
     * @type {string}
     */
    this.name = name;

    /**
     * The breed of the puppy
     * @type {string}
     */
    this.breed = breed;

    /**
     * The status of the puppy.
     * @type {Status} - enum: {"bench", "field"}
     *    - "bench": The puppy is currently on the bench. (default)
     *    - "field": The puppy is currently playing in the field.
     */
    this.status = status;

    /**
     * The URL to an image of the puppy
     * @type {string}
     */
    this.imageUrl = imageUrl;

    /**
     * The ID of the team this puppy is on, or null if not on a team
     * @type {number | null}
     */
    this.teamId = teamId;
  }
}

/**
 * Enum for puppy status.
 * @readonly
 * @enum {string}
 */
const Status = {
  /** The puppy is currently on the bench. (default) */
  BENCH: "bench",
  /** The puppy is currently playing in the field. */
  FIELD: "field",
};

//////////////////////////////
// === API INFO ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2605-RAVEN";

const PLAYERS_RESOURCE = "/players";
const PLAYERS_API = BASE + COHORT + PLAYERS_RESOURCE;

const TEAMS_RESOURCE = "/teams";
const TEAMS_API = BASE + COHORT + TEAMS_RESOURCE;

/////////////////////////////
// === STATES ===
/** @type {Player[]} */
let players = [];

/** @type {Player | null} */
let selectedPlayer = null;

/** @type {Team[]} */
let teams = [];

/** @type {Map<number, boolean>} */
let groupsDetailsOpen = new Map();

////////////////////////////
// === API FUNCTIONS ===
/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(PLAYERS_API);
    const responseData = await response.json();
    const playersData = responseData.data.players;

    const newPlayers = [];
    for (const player of playersData) {
      const newPlayer = Object.assign(new Player(), player);
      newPlayers.push(newPlayer);
    }

    players = newPlayers;
    groupsDetailsOpen.set(0, false);
  } catch (error) {
    console.log("Failed to fetch players:", error);
  }
};

/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 * @param {number} playerId
 */
/**
 * Note: In order to call fetchSinglePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to fetch, we cannot call fetchSinglePlayer()
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${PLAYERS_API}/${playerId}`);
    const responseData = await response.json();
    const playerData = responseData.data.player;

    selectedPlayer = Object.assign(new Player(), playerData);
  } catch (error) {
    console.log("Failed to fetch player:", error);
  }
};

/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * What does that sound like we need?
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */

const addNewPlayer = async (newPlayer) => {
  try {
    const response = await fetch(PLAYERS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    });

    await fetchAllPlayers();
    await fetchAllTeams();
    render();
  } catch (error) {
    console.log("Failed to add player:", error);
  }
};

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to remove, we cannot call removePlayer()
 */

const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${PLAYERS_API}/${playerId}`, {
      method: "DELETE",
    });

    await fetchAllPlayers();
    render();
  } catch (error) {
    console.log("Failed to remove player:", error);
  }
};

/**
 * Fetches all Teams from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */
const fetchAllTeams = async () => {
  try {
    const response = await fetch(TEAMS_API);
    const responseData = await response.json();
    const teamsData = responseData.data.teams;

    const newTeams = [];
    for (const team of teamsData) {
      const newTeam = Object.assign(new Team(), team);
      newTeams.push(newTeam);
      groupsDetailsOpen.set(newTeam.id, false);
    }

    teams = newTeams;
  } catch (error) {
    console.log("Failed to fetch teams:", error);
  }
};

// === COMPONENT FUNCTIONS ===
/**
 * creates a div element that represents all teams and unafiliated players
 * @returns {HTMLDivElement}
 */
function TeamsList() {
  const $div = document.createElement("div");
  $div.id = "teamsList";

  const freeAgents = players.filter((player) => player.teamId === null);
  const sections = [...teams, freeAgents];

  const $teams = sections.map(TeamGrid);
  $div.replaceChildren(...$teams);

  return $div;
}

/**
 * creates a div element that represents a group of players
 * @param {Team | Player[]} group
 * @returns {HTMLDetailsElement}
 */
function TeamGrid(group) {
  const $details = document.createElement("details");
  $details.classList.add("TeamGrid");

  $details.innerHTML = `
    <TeamName></TeamName>
    <PlayerGrid></PlayerGrid>
  `;

  const $TeamName = document.createElement("summary");
  const $PlayerGrid = document.createElement("div");
  $PlayerGrid.classList.add("PlayerGrid");
  if (group instanceof Team) {
    $details.id = group.id;
    $TeamName.innerHTML = `${group.name}`;
    $details.querySelector("TeamName").replaceWith($TeamName);

    if (group.players.length === 0) {
      const $p = document.createElement("p");
      $p.innerHTML = "There are no players in this group yet...";
      $details.querySelector("PlayerGrid").replaceWith($p);
    } else {
      playerArr = group.players.map(PlayerCard);
      $PlayerGrid.replaceChildren(...playerArr);
      $details.querySelector("PlayerGrid").replaceWith($PlayerGrid);
    }
  } else if (
    Array.isArray(group) &&
    (group[0] instanceof Player || group.length === 0)
  ) {
    $details.id = "FreeAgents";
    $TeamName.innerHTML = "Free Agents";
    $details.querySelector("TeamName").replaceWith($TeamName);

    if (group.length === 0) {
      const $p = document.createElement("p");
      $p.innerHTML = "There are no players in this group yet...";
      $details.querySelector("PlayerGrid").replaceWith($p);
    } else {
      playerArr = group.map(PlayerCard);
      $PlayerGrid.replaceChildren(...playerArr);
      $details.querySelector("PlayerGrid").replaceWith($PlayerGrid);
    }
  } else {
    console.log("ERROR: TeamGrid(group): invalid group type");
    return null;
  }

  const groupId = group instanceof Team ? group.id : 0;

  $details.open = groupsDetailsOpen.get(groupId);
  $details.addEventListener("toggle", (event) => {
    if (event.newState === "open") {
      groupsDetailsOpen.set(groupId, true);
    } else {
      groupsDetailsOpen.set(groupId, false);
    }
  });

  return $details;
}

/**
 * creates a div element that represents a player
 * @param {Player} player
 * @returns {HTMLDivElement}
 */
function PlayerCard(player) {
  const $div = document.createElement("div");
  $div.classList.add("PlayerCard");

  if (selectedPlayer !== null && player.id === selectedPlayer.id) {
    $div.classList.add("selected");
  }

  $div.id = player.id;
  $div.innerHTML = `
    <img src=${player.imageUrl} />
    <p>${player.name}</p>
  `;

  $div.addEventListener("click", (event) => {
    event.preventDefault();

    // if (selectedPlayer !== null) {
    //   document.querySelector(".selected").classList.remove("selected");
    // }
    selectedPlayer = players.find((player) => player.id == $div.id);
    $div.classList.add("selected");
    render();
  });

  return $div;
}

/**
 * creates an HTML element to represent the selected player
 * @returns {HTMLParagraphElement | HTMLDivElement}
 */
function PlayerInfo() {
  if (!selectedPlayer) {
    const $p = document.createElement("p");
    $p.classList.add("playerInfoDefault");
    $p.innerHTML = "Please select a player to see their info.";
    return $p;
  }

  const $div = document.createElement("div");
  $div.classList.add("playerInfo");

  const imgURL = selectedPlayer.imageUrl;
  const name = selectedPlayer.name;
  const id = selectedPlayer.id;
  const breed = selectedPlayer.breed;
  const team = teams.find((team) => team.id === selectedPlayer.teamId).name;
  const status = selectedPlayer.status;

  $div.innerHTML = `
    <img src="${imgURL}" />
    <div>
      <p><b>Name:</b> ${name}</p>
      <p><b>ID:</b> ${id}</p>
      <p><b>Breed:</b> ${breed}</p>
      <p><b>Team:</b> ${team}</p>
      <p><b>Status</b>: ${status}</p>
    </div>
  `;

  return $div;
}

// === RENDER AND INIT
/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. The page should show
 *    specific details about the player clicked such as: name, id, breed, status, image, and team or unassigned if no team
 * - Remove from roster. When a button is clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const render = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>THE PUPPY BOWL</h1>
    <main>
      <section id="allPlayers">
        <h2>Teams</h2>
        <TeamsList></TeamsList>
        <hr />
        <h3>Add a new player</h3>
        <createForm></createForm>
      </section>
      <section id="selectedPlayer">
        <h2>Player Info</h2>
        <PlayerInfo></PlayerInfo>
        <deleteButton></deleteButton>
      </section>
    </main>
  `;

  $app.querySelector("TeamsList").replaceWith(TeamsList());
  $app.querySelector("PlayerInfo").replaceWith(PlayerInfo());
};

/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need?
  await fetchAllPlayers();
  await fetchAllTeams();
  render();
};

init();
