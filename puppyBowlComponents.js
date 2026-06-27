// === imports ===
import { states, Team, Player } from "./puppyBowlStatesAndClasses.js";
import { render } from "./index.js";

////////////////////////////////////////////////
// === versions of main (depending on screen size) ===
export function MainLarge() {
  const $main = document.createElement("main");
  $main.classList.add("largeMode");
  $main.innerHTML = `
    <h1>THE PUPPY BOWL</h1>
    <div id="sections">
      <Section1></Section1>
      <Section2></Section2>
    </div>
  `;

  $main.querySelector("Section1").replaceWith(Section1());
  $main.querySelector("Section2").replaceWith(Section2());

  return $main;
}

export function MainSmall() {
  const $main = document.createElement("main");
  $main.classList.add("smallMode");
  $main.innerHTML = `
    <header>
      <h1>THE PUPPY BOWL</h1>
      <TabBar></TabBar>
    </header>
    <section></section>
  `;

  $main.querySelector("TabBar").replaceWith(TabBar());
  $main
    .querySelector("section")
    .replaceWith(states.sections.get(states.currentSection)());

  return $main;
}

////////////////////////////////////////////////
// === major sections ===
export function Section1() {
  const $section = document.createElement("section");
  $section.id = "allPlayers";
  $section.innerHTML = `
    <h2>Teams</h2>
    <TeamsList></TeamsList>
    <hr />
    <h3>Add a new player</h3>
    <createForm></createForm>
  `;

  $section.querySelector("TeamsList").replaceWith(TeamsList());

  return $section;
}

export function Section2() {
  const $section = document.createElement("section");
  $section.id = "selectedPlayer";
  $section.innerHTML = `
    <h2>Player Info</h2>
    <PlayerInfo></PlayerInfo>
    <DeleteButton></DeleteButton>
  `;

  $section.querySelector("PlayerInfo").replaceWith(PlayerInfo());
  return $section;
}

////////////////////////////////////////////////
// === tab bar ===
function TabBar() {
  const $div = document.createElement("div");
  $div.classList.add("tabBar");
  $div.innerHTML = `
    <TabButton1></TabButton1>
    <TabButton2></TabButton2>
  `;

  $div.querySelector("TabButton1").replaceWith(TabButton("allPlayers"));
  $div.querySelector("TabButton2").replaceWith(TabButton("selectedPlayer"));

  return $div;
}

function TabButton(sectionName) {
  const $button = document.createElement("button");
  $button.classList.add("tabButton");

  if (sectionName === "allPlayers") {
    $button.innerHTML = "All Players";
  } else if (sectionName === "selectedPlayer") {
    $button.innerHTML = "Selected Player";
  }

  $button.addEventListener("click", () => {
    if (states.currentSection !== sectionName) {
      states.currentSection = sectionName;
      render();
    }
  });

  return $button;
}

////////////////////////////////////////////////
// === Section 1 components
/**
 * creates a div element that represents all teams and unafiliated players
 * @returns {HTMLDivElement}
 */
function TeamsList() {
  const $div = document.createElement("div");
  $div.id = "teamsList";

  const freeAgents = states.players.filter((player) => player.teamId === null);
  const sections = [...states.teams, freeAgents];

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
      const playerArr = group.players.map(PlayerCard);
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

  $details.open = states.groupsDetailsOpen.get(groupId);
  $details.addEventListener("toggle", (event) => {
    if (event.newState === "open") {
      states.groupsDetailsOpen.set(groupId, true);
    } else {
      states.groupsDetailsOpen.set(groupId, false);
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

  if (
    states.selectedPlayer !== null &&
    player.id === states.selectedPlayer.id
  ) {
    $div.classList.add("selected");
  }

  $div.id = player.id;
  $div.innerHTML = `
    <img src=${player.imageUrl} />
    <p>${player.name}</p>
  `;

  $div.addEventListener("click", (event) => {
    event.preventDefault();

    states.selectedPlayer = states.players.find(
      (player) => player.id == $div.id,
    );
    $div.classList.add("selected");
    states.currentSection = "selectedPlayer";
    render();
  });

  return $div;
}

////////////////////////////////////////////////
// === Section 2 components ===
/**
 * creates an HTML element to represent the selected player
 * @returns {HTMLParagraphElement | HTMLDivElement}
 */
function PlayerInfo() {
  if (!states.selectedPlayer) {
    const $p = document.createElement("p");
    $p.classList.add("playerInfoDefault");
    $p.innerHTML = "Please select a player to see their info.";
    return $p;
  }

  const $div = document.createElement("div");
  $div.classList.add("playerInfo");

  const imgURL = states.selectedPlayer.imageUrl;
  const name = states.selectedPlayer.name;
  const id = states.selectedPlayer.id;
  const breed = states.selectedPlayer.breed;
  const team = states.teams.find(
    (team) => team.id === states.selectedPlayer.teamId,
  ).name;
  const status = states.selectedPlayer.status;

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
