// === imports ===
import { states, Player, Team } from "./puppyBowlStatesAndClasses.js";

// === API INFO ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2605-RAVEN";

const PLAYERS_RESOURCE = "/players";
const PLAYERS_API = BASE + COHORT + PLAYERS_RESOURCE;

const TEAMS_RESOURCE = "/teams";
const TEAMS_API = BASE + COHORT + TEAMS_RESOURCE;

// === API FUNCTIONS ===
/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */
export const fetchAllPlayers = async () => {
  try {
    const response = await fetch(PLAYERS_API);
    const responseData = await response.json();
    const playersData = responseData.data.players;

    const newPlayers = [];
    for (const player of playersData) {
      const newPlayer = Object.assign(new Player(), player);
      newPlayers.push(newPlayer);
    }

    states.players = newPlayers;
    states.groupsDetailsOpen.set(0, false);
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
export const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${PLAYERS_API}/${playerId}`);
    const responseData = await response.json();
    const playerData = responseData.data.player;

    states.selectedPlayer = Object.assign(new Player(), playerData);
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

export const addNewPlayer = async (newPlayer) => {
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

export const removePlayer = async (playerId) => {
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
export const fetchAllTeams = async () => {
  try {
    const response = await fetch(TEAMS_API);
    const responseData = await response.json();
    const teamsData = responseData.data.teams;

    const newTeams = [];
    for (const team of teamsData) {
      const newTeam = Object.assign(new Team(), team);
      newTeams.push(newTeam);
      states.groupsDetailsOpen.set(newTeam.id, false);
    }

    states.teams = newTeams;
  } catch (error) {
    console.log("Failed to fetch teams:", error);
  }
};
