/* =====================================================================
   app.js  —  what the page DOES.

   Everything below is the same three moves, over and over:

        FIND something   →   LISTEN for something   →   CHANGE something

   That is almost all of front-end JavaScript. Learn those three and you
   can read most of the code you will meet this semester.
   ===================================================================== */


/* --- 1. THE NUMBERS I CARE ABOUT --------------------------------------
   Latitude first, then longitude. Change HOME to your own hometown —
   right-click any spot on openstreetmap.org and choose "Show address"
   to read its coordinates. */

const USC  = [34.0224, -118.2851];   // USC campus, Los Angeles
const HOME = [22.5431, 114.0579];   // Shenzhen, China


/* --- 2. BUILD THE MAP (same as step 4) -------------------------------- */

const map = L.map("map").setView(USC, 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  referrerPolicy: "origin"
}).addTo(map);

L.marker(USC).addTo(map).bindPopup("I am studying here.");
L.marker(HOME).addTo(map).bindPopup("I am from here.");


/* --- 3. FIND the three things on the page I need to work with ----------
   "document" means the web page itself.
   getElementById("home-button") means: go into the page, find the one
   element labelled home-button, and hand it to me.

   Note the capital letters: getElementById. Capital E, capital I,
   capital d. JavaScript is case sensitive, and if you type
   getelementbyid it fails SILENTLY. This costs beginners a whole evening. */

const homeButton = document.getElementById("home-button");
const uscButton  = document.getElementById("usc-button");
const status     = document.getElementById("status");


/* --- 4. LISTEN for a click, then CHANGE things ------------------------
   addEventListener says: "when this thing happens, run this code."
   The code between the braces does not run now. It waits. It runs later,
   every time somebody clicks. That idea — code that waits for an event —
   is the heart of every interactive page you have ever used. */

homeButton.addEventListener("click", function () {
  map.flyTo(HOME, 11);                       // CHANGE the map
  status.textContent = "Flying home...";     // CHANGE the text
});


uscButton.addEventListener("click", function () {
  map.flyTo(USC, 13);
  status.textContent = "Back on campus.";
});

/* --- 5. BIRD EXPLORER ----------------------------------------------- */

const birdButton = document.getElementById("bird-button");
const birdImage = document.getElementById("bird-image");
const birdName = document.getElementById("bird-name");
const scientificName = document.getElementById("scientific-name");
const birdSource = document.getElementById("bird-source");
const birdDate = document.getElementById("bird-date");
const birdLocation = document.getElementById("bird-location");
const observationLink = document.getElementById("observation-link");
const birdCountText = document.getElementById("bird-count");

let birds = [];
let birdCount = 0;

async function loadBirds() {
  const url =
    "https://api.inaturalist.org/v1/observations" +
    "?taxon_id=3" +
    "&place_id=962" +
    "&photos=true" +
    "&quality_grade=research" +
    "&per_page=100";

  const response = await fetch(url);
  const data = await response.json();

  birds = data.results;

  console.log(birds);
}

function showRandomBird() {

  const randomIndex = Math.floor(Math.random() * birds.length);
  const bird = birds[randomIndex];
  const commonName =
    bird.taxon.preferred_common_name || "Unknown bird";

  const sciName = bird.taxon.name;
  const photoUrl =
    bird.photos[0].url.replace("square", "medium");


  birdName.textContent = commonName;
  scientificName.textContent = sciName;

  birdDate.textContent = bird.observed_on || "Unknown";
  birdLocation.textContent = bird.place_guess || "Location unavailable";

  birdImage.src = photoUrl;
  birdImage.alt = commonName;
  birdImage.classList.remove("placeholder");


  observationLink.href =
    "https://www.inaturalist.org/observations/" + bird.id;

  birdSource.hidden = false;
  birdButton.textContent = "Explore another bird";
  birdCount++;
  birdCountText.textContent =
    birdCount === 1 ? "1 bird" : birdCount + " birds";
}

birdButton.addEventListener("click", showRandomBird);
loadBirds();
/* =====================================================================
   THAT IS THE WHOLE PROGRAM. Roughly fifteen real lines.

   If something does not work, do NOT stare at the code and hope.
   Press F12 to open the browser's developer tools, click Console,
   and read the red message. It names the problem and the line number.
   ===================================================================== */
