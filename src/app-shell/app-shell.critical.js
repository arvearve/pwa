// This file is inlined in index.html before the main scripts (end of <body>)

// animatedScrollLeft
import "./animated-scroll-left.critical.js";

// link rel=preload polyfill
import './../../node_modules/fg-loadcss/dist/cssrelpreload.min.js'

// DOM helpers ($ and $$)
import "./dom-helpers.critical.js";

//app shell
const screens = $("#screens");
const navbarTitle = $("#navbar-title");

const tabs = {
  accounts: $("#tab-accounts"),
  events: $("#tab-events"),
  cards: $("#tab-cards"),
  qr: $("#tab-qr"),
  together: $("#tab-together")
};

const initTab = (pageRef, index) => {
  const tab = tabs[pageRef];
  tab.addEventListener("click", () => {
    scrollInto(pageRef, index);
    updateTabHighlight(pageRef);
  });
};

const scrollInto = (pageRef, index) => {
  animatedScrollLeft(screens, window.innerWidth * index, 130, () => {
    updateTabTitle(pageRef);
  });
};

const updateTabHighlight = pageRef => {
  $(".tab.active").classList.remove("active");
  tabs[pageRef].classList.add("active");
};

const updateTabTitle = title => {
  navbarTitle.innerHTML = title;
};

initTab("accounts", 0);
initTab("events", 1);
initTab("cards", 2);
initTab("qr", 3);
initTab("together", 4);