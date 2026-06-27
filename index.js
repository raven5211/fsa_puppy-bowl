// === import ===
import { states } from "./puppyBowlStatesAndClasses.js";
import {
  MainLarge,
  MainSmall,
  Section1,
  Section2,
} from "./puppyBowlComponents.js";
import { fetchAllPlayers, fetchAllTeams } from "./puppyBowlFunctions.js";

////////////////////////////
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
export function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <main></main>
  `;

  $app.querySelector("main").replaceWith(MainLarge(), MainSmall());
}

/**
 * Initializes the app by calling render
 */
async function init() {
  //fetch from APIs
  await fetchAllPlayers();
  await fetchAllTeams();

  //set up sections data
  states.sections.set("allPlayers", Section1);
  states.sections.set("selectedPlayer", Section2);

  //render
  render();
}

await init();
