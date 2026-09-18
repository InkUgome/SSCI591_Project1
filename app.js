/* =====================================================================
   app.js  —  what the page DOES.

   Everything below is the same three moves, over and over:

        FIND something   →   LISTEN for something   →   CHANGE something

   That is almost all of front-end JavaScript. Learn those three and you
   can read most of the code you will meet this semester.
   ===================================================================== */


/* --- 1. Location --------------------------------------
   Latitude first, then longitude.  */

const USC  = [34.0224, -118.2851];   // USC campus, Los Angeles
const HOME = [22.5431, 114.0579];   // Shenzhen, China
const CATALINA = [33.3879, -118.4163]; // Catalina Island, Los Angeles


/* --- 2. Build the Map  -------------------------------- */

const map = L.map("map").setView(USC, 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  referrerPolicy: "origin"
}).addTo(map);

L.marker(USC).addTo(map).bindPopup("I am studying here.");
L.marker(HOME).addTo(map).bindPopup("I am from here.");
L.marker(CATALINA).addTo(map).bindPopup("Catalina Island GNSS Project");


/* --- 3. Get the map buttons and status text---------- */

const homeButton = document.getElementById("home-button");
const uscButton  = document.getElementById("usc-button");
const status     = document.getElementById("status");
const catalinaButton = document.getElementById("catalina-button");


L.polyline([HOME, USC], {
  color: "#990000",
  weight: 3,
  opacity: 0.8,
  dashArray: "8, 8"
}).addTo(map);

L.polyline([USC, CATALINA], {
  color: "#990000",
  weight: 3,
  opacity: 0.8
}).addTo(map);



/* --- 4. Button created */

homeButton.addEventListener("click", function () {
  map.flyTo(HOME, 11);                       
  status.textContent = "Flying home...";     
});


uscButton.addEventListener("click", function () {
  map.flyTo(USC, 13);
  status.textContent = "Back on campus.";
});

catalinaButton.addEventListener("click", function () {
  map.flyTo(CATALINA, 11);
  status.textContent = "Viewing my Catalina Island project.";
});

L.marker(CATALINA)
  .addTo(map)
  .bindPopup(
    '<b>Catalina Island GNSS Project</b><br>' +
    '<a href="https://storymaps.arcgis.com/stories/3ba7a102f54042ffa2325b62b083f669" target="_blank">' +
    'View StoryMap →</a>'
  );


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
   ===================================================================== */
