/* EDIT THE DETAILS IN THIS OBJECT TO PERSONALISE YOUR INVITATION. */
const wedding = {
  bride: "Amandeep",
  groom: "Piyush",
  // Use ISO format with your local time zone offset, e.g. 2026-12-01T16:00:00-05:00
  date: "2026-12-01T16:00:00-05:00",
  dateLabel: "DECEMBER 1, 2026",
  city: "Yamuna nagar",
  venue: "Saubhagya Resorts",
  address: "Lal Dwara Road, Near Tejli Stadium, Jagadhri,",
  mapUrl:
    "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg5MgYIARBFGDsyBggCEEUYPDIGCAMQRRg8MgYIBBBFGDwyBggFEEUYQTIGCAYQLhhA0gEIMjcxOGowajmoAgCwAgE&um=1&ie=UTF-8&fb=1&gl=ca&sa=X&geocode=KYenmu80-g45MdClCJhwl0H-&daddr=Lal+Dwara+Road,+Near+Tejli+Stadium,+Jagadhri,+Haryana+135001,+India",
  // Optional direct MP3 URL. Browsers require a user tap before playing audio.
  musicUrl: "",
};
const byId = (id) => document.getElementById(id);
function setText(id, value) {
  const el = byId(id);
  if (el) el.textContent = value;
}
function applyWeddingDetails() {
  setText("brideHero", wedding.bride);
  setText("groomHero", wedding.groom);
  setText("heroDate", wedding.dateLabel);
  setText("heroCity", wedding.city);
  setText(
    "initials",
    `${wedding.groom.charAt(0)} ♥ ${wedding.bride.charAt(0)}`
  );
  setText("closingNames", `${wedding.groom} & ${wedding.bride}`);
  setText("footerNames", `${wedding.groom} & ${wedding.bride}`);
  setText("venueName", wedding.venue);
  setText("venueAddress", wedding.address);
  byId("mapLink").href = wedding.mapUrl;
  document.title = `${wedding.bride} & ${wedding.groom} | Wedding Invitation`;
  const audio = byId("weddingMusic");
  if (wedding.musicUrl) audio.querySelector("source").src = wedding.musicUrl;
  audio.load();
}
function updateCountdown() {
  const target = new Date(wedding.date).getTime();
  if (Number.isNaN(target)) return;
  let remaining = Math.max(0, target - Date.now());
  const day = 86400000,
    hour = 3600000,
    minute = 60000;
  const days = Math.floor(remaining / day);
  remaining %= day;
  const hours = Math.floor(remaining / hour);
  remaining %= hour;
  const minutes = Math.floor(remaining / minute);
  const seconds = Math.floor((remaining % minute) / 1000);
  setText("days", days);
  setText("hours", String(hours).padStart(2, "0"));
  setText("minutes", String(minutes).padStart(2, "0"));
  setText("seconds", String(seconds).padStart(2, "0"));
  if (target <= Date.now()) setText("days", "0");
}
const musicButton = byId("musicToggle");
const music = byId("weddingMusic");
musicButton.addEventListener("click", async () => {
  const label = musicButton.querySelector("span");
  if (!wedding.musicUrl) {
    label.textContent = "Add music URL in script.js";
    return;
  }
  if (music.paused) {
    try {
      await music.play();
      label.textContent = "Music on";
    } catch {
      label.textContent = "Tap to play";
    }
  } else {
    music.pause();
    label.textContent = "Music off";
  }
});
applyWeddingDetails();
updateCountdown();
setInterval(updateCountdown, 1000);
// Subtle reveal animation as sections enter the screen.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".section, .quote-band").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity .8s ease, transform .8s ease";
    observer.observe(el);
  });
  const style = document.createElement("style");
  style.textContent =
    ".visible{opacity:1!important;transform:translateY(0)!important}";
  document.head.appendChild(style);
}
