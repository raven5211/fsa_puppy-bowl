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

const PLAYER_RESOURCE = "/players";
const PLAYER_API = BASE + COHORT + PLAYER_RESOURCE;

const TEAM_RESOURCE = "/teams";
const TEAM_API = BASE + COHORT + TEAM_RESOURCE;

/////////////////////////////
// === STATES ===
/** @type {Player[]} */
const players = [];

/** @type {Team[]} */
const teams = [];

////////////////////////////
// === API FUNCTIONS ===
/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */
const fetchAllPlayers = async () => {
  //TODO
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
  //TODO
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
  //TODO
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
  //TODO
};

// === COMPONENT FUNCTIONS ===

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
  // TODO
};

/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need?

  render();
};

init();
