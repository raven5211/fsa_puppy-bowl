// === STATES ===
export const states = {
  /** @type {Player[]} */
  players: [],

  /** @type {Player | null} */
  selectedPlayer: null,

  /** @type {Team[]} */
  teams: [],

  /** @type {Map<number, boolean>} */
  groupsDetailsOpen: new Map(),

  currentSection: "allPlayers",
  sections: new Map(),
};
// === CLASSES ===
/**
 * class representing teams playing in the PuppyBowl
 */
export class Team {
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
export class Player {
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
