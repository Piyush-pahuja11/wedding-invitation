/* PERSONALISE YOUR WEDDING INVITATION HERE. */
const wedding = {
  bride: "Amandeep",
  groom: "Piyush",
  // Countdown target: December 1, 2026, at 7:00 PM India time.
  // Update this if your actual ceremony begins at another time.
  date: "2026-12-01T19:00:00+05:30",
  dateLabel: "DECEMBER 1, 2026",
  city: "Yamuna Nagar",
  venue: "Saubhagya Resorts",
  address: "Near Tejli Stadium, Yamuna Nagar, Haryana",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Saubhagya+Resorts+Near+Tejli+Stadium+Yamuna+Nagar+Haryana",
  // IMPORTANT: Enter the receiving WhatsApp number with country code, digits only.
  // Example format: "919876543210" (India) or "14165551234" (Canada).
  whatsappNumber: "YOUR_WHATSAPP_NUMBER",
  // Optional: add a direct MP3 URL for background music.
  musicUrl: ""
};

const byId = (id) => document.getElementById(id);
const setText = (id, value) => {
  const element = byId(id);
  if (element) element.textContent = value;
};

function applyWeddingDetails() {
  setText("brideHero", wedding.bride);
  setText("groomHero", wedding.groom);
  setText("welcomeBride", wedding.bride);
  setText("welcomeGroom", wedding.groom);
  setText("heroDate", wedding.dateLabel);
  setText("heroCity", wedding.city);
  setText("initials", `${wedding.groom.charAt(0)} ♥ ${wedding.bride.charAt(0)}`);
  setText("closingNames", `${wedding.groom} & ${wedding.bride}`);
  setText("footerNames", `${wedding.groom} & ${wedding.bride}`);
  setText("venueName", wedding.venue);
  setText("venueAddress", wedding.address);
  const mapLink = byId("mapLink");
  if (mapLink) mapLink.href = wedding.mapUrl;

  document.title = `${wedding.groom} & ${wedding.bride} | Wedding Invitation`;
  const audio = byId("weddingMusic");
  if (audio) {
    const source = audio.querySelector("source");
    if (source && wedding.musicUrl) source.src = wedding.musicUrl;
    audio.load();
  }
}

function openInvitation() {
  const screen = byId("welcomeScreen");
  if (!screen) return;
  screen.classList.add("welcome-screen--closing");
  document.body.classList.remove("welcome-open");
  window.setTimeout(() => {
    screen.hidden = true;
    byId("home")?.setAttribute("tabindex", "-1");
    byId("home")?.focus({ preventScroll: true });
  }, 650);
}

function updateCountdown() {
  const target = new Date(wedding.date).getTime();
  if (Number.isNaN(target)) return;

  let remaining = target - Date.now();
  if (remaining <= 0) {
    setText("days", "00");
    setText("hours", "00");
    setText("minutes", "00");
    setText("seconds", "00");
    const heading = document.querySelector(".countdown-section h2");
    if (heading) heading.innerHTML = "Today is <em>the beginning</em>";
    const eyebrow = document.querySelector(".countdown-section .eyebrow");
    if (eyebrow) eyebrow.textContent = "THE DAY WE HAVE BEEN WAITING FOR";
    return;
  }

  const day = 86400000, hour = 3600000, minute = 60000;
  const days = Math.floor(remaining / day); remaining %= day;
  const hours = Math.floor(remaining / hour); remaining %= hour;
  const minutes = Math.floor(remaining / minute);
  const seconds = Math.floor((remaining % minute) / 1000);
  setText("days", days);
  setText("hours", String(hours).padStart(2, "0"));
  setText("minutes", String(minutes).padStart(2, "0"));
  setText("seconds", String(seconds).padStart(2, "0"));
}

function setupMusic() {
  const button = byId("musicToggle");
  const music = byId("weddingMusic");
  if (!button || !music) return;
  const label = button.querySelector("span");

  button.addEventListener("click", async () => {
    if (!wedding.musicUrl) {
      if (label) label.textContent = "Add music URL in script.js";
      return;
    }
    if (music.paused) {
      try {
        await music.play();
        if (label) label.textContent = "Music on";
        button.setAttribute("aria-pressed", "true");
      } catch {
        if (label) label.textContent = "Tap to play";
      }
    } else {
      music.pause();
      if (label) label.textContent = "Music off";
      button.setAttribute("aria-pressed", "false");
    }
  });
}

function setupRsvp() {
  const choices = [...document.querySelectorAll(".rsvp-choice")];
  const sendButton = byId("sendRsvp");
  const guestName = byId("guestName");
  const help = byId("rsvpHelp");
  let selectedResponse = "Attending";

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      selectedResponse = choice.dataset.response || "Attending";
      choices.forEach((item) => {
        const selected = item === choice;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      if (help) help.textContent = `Selected: ${selectedResponse}. WhatsApp will open with your reply ready to send.`;
    });
  });

  sendButton?.addEventListener("click", () => {
    const number = String(wedding.whatsappNumber || "").replace(/\D/g, "");
    if (!number || number === "YOUR_WHATSAPP_NUMBER") {
      if (help) help.textContent = "Please add your WhatsApp number in script.js first (country code + number, digits only).";
      return;
    }
    const name = guestName?.value.trim();
    const greeting = name ? `Hello, this is ${name}.` : "Hello!";
    const message = `${greeting} My RSVP for Piyush and Amandeep's wedding on December 1, 2026: ${selectedResponse}.`;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

function setupRevealAnimations() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".section, .quote-band").forEach((section) => section.classList.add("visible"));
    return;
  }
  const sections = document.querySelectorAll(".section, .quote-band");
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach((section) => {
    section.classList.add("reveal-section");
    observer.observe(section);
  });
}

function initWeddingInvitation() {
  document.body.classList.add("welcome-open");
  applyWeddingDetails();
  updateCountdown();
  setupMusic();
  setupRsvp();
  setupRevealAnimations();
  byId("openInvitation")?.addEventListener("click", openInvitation);
  byId("welcomeScreen")?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") openInvitation();
  });
  window.setInterval(updateCountdown, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWeddingInvitation, { once: true });
} else {
  initWeddingInvitation();
}
