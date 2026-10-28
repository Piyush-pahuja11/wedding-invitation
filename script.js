
/* =========================================
   PIYUSH & AMANDEEP — WEDDING INVITATION
   ========================================= */

/* PERSONALISE YOUR WEDDING INVITATION HERE */
const wedding = {
  bride: "Amandeep",
  groom: "Piyush",

  // December 1, 2026, at 7:00 PM India Standard Time
  date: "2026-12-01T19:00:00+05:30",
  dateLabel: "DECEMBER 1, 2026",

  city: "Yamuna Nagar",
  venue: "Saubhagya Resorts",
  address: "Near Tejli Stadium, Yamuna Nagar, Haryana",

  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Saubhagya+Resorts+Near+Tejli+Stadium+Yamuna+Nagar+Haryana",

  // Replace with your WhatsApp number including country code.
  // India example: 919876543210
  whatsappNumber: "YOUR_WHATSAPP_NUMBER",

  // Music file path relative to your website.
  musicUrl: "./pictures/audios/Satranga.mp3"
};


/* =========================================
   HELPER FUNCTIONS
   ========================================= */

const byId = (id) => document.getElementById(id);

function setText(id, value) {
  const element = byId(id);

  if (element) {
    element.textContent = value;
  }
}


/* =========================================
   APPLY WEDDING DETAILS
   ========================================= */

function applyWeddingDetails() {
  setText("brideHero", wedding.bride);
  setText("groomHero", wedding.groom);

  setText("welcomeBride", wedding.bride);
  setText("welcomeGroom", wedding.groom);

  setText("heroDate", wedding.dateLabel);
  setText("heroCity", wedding.city);

  setText(
    "initials",
    `${wedding.groom.charAt(0)} ♥ ${wedding.bride.charAt(0)}`
  );

  setText(
    "closingNames",
    `${wedding.groom} & ${wedding.bride}`
  );

  setText(
    "footerNames",
    `${wedding.groom} & ${wedding.bride}`
  );

  setText("venueName", wedding.venue);
  setText("venueAddress", wedding.address);

  const mapLink = byId("mapLink");

  if (mapLink) {
    mapLink.href = wedding.mapUrl;
    mapLink.target = "_blank";
    mapLink.rel = "noopener noreferrer";
  }

  document.title =
    `${wedding.groom} & ${wedding.bride} | Wedding Invitation`;

  const audio = byId("weddingMusic");

  if (audio && wedding.musicUrl) {
    const source = audio.querySelector("source");

    if (source) {
      source.src = wedding.musicUrl;
      audio.load();
    } else {
      audio.src = wedding.musicUrl;
      audio.load();
    }
  }
}


/* =========================================
   OPEN INVITATION
   Music starts ONLY after the button is clicked.
   ========================================= */

let invitationOpened = false;

async function openInvitation() {
  const screen = byId("welcomeScreen");

  if (!screen || invitationOpened) {
    return;
  }

  invitationOpened = true;

  // Start the closing animation.
  screen.classList.add("welcome-screen--closing");

  document.body.classList.remove("welcome-open");

  // Start music after the user's click.
  const audio = byId("weddingMusic");

  if (audio && wedding.musicUrl) {
    try {
      // await audio.play();

      const musicButton = byId("musicToggle");

      if (musicButton) {
        musicButton.setAttribute("aria-pressed", "true");

        const label = musicButton.querySelector("span");

        if (label) {
          label.textContent = "Music on";
        }
      }
    } catch (error) {
      console.warn(
        "Music could not autoplay. Check the audio file path or use the music button.",
        error
      );
    }
  }

  // Wait for the welcome screen animation to finish.
  window.setTimeout(() => {
    screen.hidden = true;

    const home = byId("home");

    if (home) {
      home.setAttribute("tabindex", "-1");
      home.focus({ preventScroll: true });
    }
  }, 650);
}


/* =========================================
   BACKGROUND MUSIC BUTTON
   Optional button with id="musicToggle"
   ========================================= */

function setupMusic() {
  const button = byId("musicToggle");
  const audio = byId("weddingMusic");

  if (!button || !audio) {
    return;
  }

  const label = button.querySelector("span");

  button.addEventListener("click", async () => {
    if (!wedding.musicUrl) {
      if (label) {
        label.textContent = "Add music URL in script.js";
      }

      return;
    }

    if (audio.paused) {
      try {
        await audio.play();

        if (label) {
          label.textContent = "Music on";
        }

        button.setAttribute("aria-pressed", "true");
      } catch (error) {
        console.error("Unable to play wedding music:", error);

        if (label) {
          label.textContent = "Tap to play";
        }
      }
    } else {
      audio.pause();

      if (label) {
        label.textContent = "Music off";
      }

      button.setAttribute("aria-pressed", "false");
    }
  });
}


/* =========================================
   WEDDING COUNTDOWN
   ========================================= */

function updateCountdown() {
  const target = new Date(wedding.date).getTime();

  if (Number.isNaN(target)) {
    return;
  }

  let remaining = target - Date.now();

  if (remaining <= 0) {
    setText("days", "00");
    setText("hours", "00");
    setText("minutes", "00");
    setText("seconds", "00");

    const heading = document.querySelector(
      ".countdown-section h2"
    );

    if (heading) {
      heading.innerHTML = "Today is <em>the beginning</em>";
    }

    const eyebrow = document.querySelector(
      ".countdown-section .eyebrow"
    );

    if (eyebrow) {
      eyebrow.textContent =
        "THE DAY WE HAVE BEEN WAITING FOR";
    }

    return;
  }

  const day = 86400000;
  const hour = 3600000;
  const minute = 60000;

  const days = Math.floor(remaining / day);
  remaining %= day;

  const hours = Math.floor(remaining / hour);
  remaining %= hour;

  const minutes = Math.floor(remaining / minute);

  const seconds = Math.floor(
    (remaining % minute) / 1000
  );

  setText("days", String(days).padStart(2, "0"));
  setText("hours", String(hours).padStart(2, "0"));
  setText("minutes", String(minutes).padStart(2, "0"));
  setText("seconds", String(seconds).padStart(2, "0"));
}


/* =========================================
   RSVP — WHATSAPP
   ========================================= */

function setupRsvp() {
  const choices = [
    ...document.querySelectorAll(".rsvp-choice")
  ];

  const sendButton = byId("sendRsvp");
  const guestName = byId("guestName");
  const help = byId("rsvpHelp");

  let selectedResponse = "Attending";

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      selectedResponse =
        choice.dataset.response || "Attending";

      choices.forEach((item) => {
        const selected = item === choice;

        item.classList.toggle("is-selected", selected);

        item.setAttribute(
          "aria-pressed",
          String(selected)
        );
      });

      if (help) {
        help.textContent =
          `Selected: ${selectedResponse}. WhatsApp will open with your reply ready to send.`;
      }
    });
  });

  if (!sendButton) {
    return;
  }

  sendButton.addEventListener("click", () => {
    const number = String(
      wedding.whatsappNumber || ""
    ).replace(/\D/g, "");

    if (
      !number ||
      wedding.whatsappNumber === "YOUR_WHATSAPP_NUMBER"
    ) {
      if (help) {
        help.textContent =
          "Please add your WhatsApp number in script.js, including country code.";
      }

      return;
    }

    const name = guestName
      ? guestName.value.trim()
      : "";

    const greeting = name
      ? `Hello, this is ${name}.`
      : "Hello!";

    const message =
      `${greeting} My RSVP for ${wedding.groom} and ${wedding.bride}'s wedding on ${wedding.dateLabel}: ${selectedResponse}.`;

    const url =
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
}


/* =========================================
   SECTION REVEAL ANIMATIONS
   ========================================= */

function setupRevealAnimations() {
  const sections = document.querySelectorAll(
    ".section, .quote-band"
  );

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => {
      section.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  sections.forEach((section) => {
    section.classList.add("reveal-section");
    observer.observe(section);
  });
}


/* =========================================
   INITIALIZE THE WEDDING WEBSITE
   ========================================= */

function initWeddingInvitation() {
  // Display the welcome screen initially.
  document.body.classList.add("welcome-open");

  // Populate wedding information.
  applyWeddingDetails();

  // Start the countdown.
  updateCountdown();

  // Configure music controls without autoplaying.
  setupMusic();

  // Configure RSVP.
  setupRsvp();

  // Configure section animations.
  setupRevealAnimations();

  // Attach the Open Invitation button.
  const openButton = byId("openInvitation");

  if (openButton) {
    openButton.addEventListener(
      "click",
      openInvitation
    );
  } else {
    console.error(
      'Open Invitation button not found. Check for id="openInvitation" in your HTML.'
    );
  }

  // Allow Escape to open the invitation.
  const welcomeScreen = byId("welcomeScreen");

  if (welcomeScreen) {
    welcomeScreen.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Escape" &&
          !invitationOpened
        ) {
          openInvitation();
        }
      }
    );
  }

  // Refresh the countdown every second.
  window.setInterval(updateCountdown, 1000);
}


/* =========================================
   RUN WHEN THE HTML IS READY
   ========================================= */

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initWeddingInvitation,
    { once: true }
  );
} else {
  initWeddingInvitation();
}
