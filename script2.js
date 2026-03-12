// ======================================
// GSAP + SCROLLTRIGGER SETUP
// ======================================
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

/* ================= BURGER ================= */
const burger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-main-menu");

function setMobileMenuState(isOpen) {
  if (!navMenu) return;
  navMenu.classList.toggle("active", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
}

if (burger && navMenu) {
  burger.addEventListener("click", () => {
    setMobileMenuState(!navMenu.classList.contains("active"));
  });
}

const uniqueLink = document.querySelector("#unique > a");
const col3 = document.getElementById("col3");
const uniqueItem = document.getElementById("unique");
const dentalMega = uniqueItem ? uniqueItem.closest(".has-mega") : null;
let col3OriginalParent = null;
let col3OriginalNextSibling = null;

if (col3) {
  col3OriginalParent = col3.parentElement;
  col3OriginalNextSibling = col3.nextElementSibling;
}

function setCol3State(isOpen) {
  if (!col3) return;
  col3.classList.toggle("active", isOpen);
  if (dentalMega) {
    dentalMega.classList.toggle("col3-open", isOpen);
  }
}

function placeCol3ForViewport() {
  if (!col3 || !col3OriginalParent) return;

  if (col3.parentElement !== col3OriginalParent) {
    if (
      col3OriginalNextSibling &&
      col3OriginalNextSibling.parentElement === col3OriginalParent
    ) {
      col3OriginalParent.insertBefore(col3, col3OriginalNextSibling);
    } else {
      col3OriginalParent.appendChild(col3);
    }
  }

  if (window.innerWidth > 767) {
    setCol3State(false);
  }
}

function showDesktopCol3() {
  if (window.innerWidth > 767) {
    setCol3State(true);
  }
}

function hideDesktopCol3() {
  if (window.innerWidth > 767) {
    setCol3State(false);
  }
}

/* ================= MOBILE MEGA MENU CLICK ================= */
if (navMenu) {
  navMenu.addEventListener("click", (e) => {
    if (window.innerWidth > 767) return;

    if (uniqueLink && col3 && e.target.closest("#unique > a")) {
      e.preventDefault();
      e.stopPropagation();
      setCol3State(!col3.classList.contains("active"));
      return;
    }

    // Keep submenu area clickable; do not toggle parent mega.
    if (e.target.closest(".mega-menu")) {
      return;
    }

    const currentMega = e.target.closest(".has-mega");
    if (currentMega && navMenu.contains(currentMega)) {
      e.preventDefault();
      e.stopPropagation();

      const shouldOpen = !currentMega.classList.contains("open");

      navMenu.querySelectorAll(".has-mega.open").forEach((menu) => {
        if (menu !== currentMega) {
          menu.classList.remove("open");
        }
      });

      currentMega.classList.toggle("open", shouldOpen);

      if (
        col3 &&
        (!shouldOpen || (uniqueItem && !currentMega.contains(uniqueItem)))
      ) {
        setCol3State(false);
      }
      return;
    }

    // Close drawer only for top-level links.
    const link = e.target.closest("a");
    if (link && !link.closest(".mega-menu")) {
      setMobileMenuState(false);
    }
  });
}

if (uniqueItem && col3) {
  uniqueItem.addEventListener("mouseenter", showDesktopCol3);
  uniqueItem.addEventListener("focusin", showDesktopCol3);
}

if (dentalMega && col3) {
  dentalMega.addEventListener("mouseleave", hideDesktopCol3);
}

if (uniqueLink && col3) {
  uniqueLink.addEventListener("click", (e) => {
    if (window.innerWidth > 767) {
      e.preventDefault();
      e.stopPropagation();
      setCol3State(true);
    }
  });
}

/* Optional: close when clicking outside mega menu */
document.addEventListener("click", function (e) {
  if (window.innerWidth <= 767) {
    if (!e.target.closest(".has-mega")) {
      document.querySelectorAll(".has-mega.open").forEach((menu) => {
        menu.classList.remove("open");
      });

      setCol3State(false);
    }

    if (navMenu && navMenu.classList.contains("active") && !e.target.closest(".site-header")) {
      setMobileMenuState(false);
    }
  } else if (!e.target.closest(".has-mega") && col3) {
    setCol3State(false);
  }
});

window.addEventListener("resize", () => {
  placeCol3ForViewport();

  if (window.innerWidth > 767) {
    setMobileMenuState(false);

    document.querySelectorAll(".has-mega.open").forEach((menu) => {
      menu.classList.remove("open");
    });

    setCol3State(false);
  }
});

placeCol3ForViewport();
// ======================================
// HERO SECTION (ON LOAD)
// ======================================
gsap.from(".hero-title", {
  y: 40,
  opacity: 0,
  duration: 0.9,
  ease: "power3.out",
});

gsap.from(".hero-subtitle", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  delay: 0.15,
  ease: "power3.out",
});

gsap.from(".hero-description", {
  y: 25,
  opacity: 0,
  duration: 0.7,
  delay: 0.3,
  ease: "power3.out",
});

gsap.from(".hero-line", {
  scaleX: 0,
  transformOrigin: "left",
  duration: 0.6,
  delay: 0.45,
  ease: "power2.out",
});

gsap.from(".hero-image", {
  x: 60,
  opacity: 0,
  duration: 1,
  delay: 0.25,
  ease: "power3.out",
});

// ======================================
// SCROLL PIN CARDS
// ======================================
// ======================================
// INFINITE SMOOTH SLIDER
// ======================================

window.addEventListener("DOMContentLoaded", function () {

  const container = document.querySelector(".over-stack-container");
  if (!container) return;

  const slides = container.querySelectorAll(".card");
  if (slides.length === 0) return;

  const track = document.createElement("div");
  track.className = "slider-track";

  // Clone first & last
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  track.appendChild(lastClone);
  slides.forEach(slide => track.appendChild(slide));
  track.appendChild(firstClone);

  container.appendChild(track);

  const allSlides = track.querySelectorAll(".card");

  let index = 1;
  let slideWidth = container.clientWidth;

  function setTrackPosition(withTransition = false) {
    slideWidth = container.clientWidth;
    track.style.transition = withTransition
      ? "transform 0.5s cubic-bezier(.77,0,.24,1)"
      : "none";
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  window.addEventListener("resize", () => {
    setTrackPosition(false);
  });

  setTrackPosition(false);

  // Arrows
  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = "‹";
  prevBtn.className = "slider-btn prev-btn";

  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = "›";
  nextBtn.className = "slider-btn next-btn";

  container.appendChild(prevBtn);
  container.appendChild(nextBtn);

  function moveToSlide() {
    setTrackPosition(true);
  }

  function nextSlide() {
    if (index >= allSlides.length - 1) return;
    index++;
    moveToSlide();
  }

  function prevSlide() {
    if (index <= 0) return;
    index--;
    moveToSlide();
  }

  track.addEventListener("transitionend", () => {
    if (allSlides[index] === firstClone) {
      index = 1;
      setTrackPosition(false);
    }

    if (allSlides[index] === lastClone) {
      index = allSlides.length - 2;
      setTrackPosition(false);
    }
  });

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // AUTO LOOP
  let auto = setInterval(nextSlide, 2000);

  container.addEventListener("mouseenter", () => clearInterval(auto));
  container.addEventListener("mouseleave", () => {
    auto = setInterval(nextSlide, 2000);
  });

});



// ======================================
// SECTION 1 SCROLL REVEAL
// ======================================
gsap.from(".section-left img", {
  scrollTrigger: {
    trigger: ".section1",
    start: "top 85%",
    end: "top 30%",
    scrub: true,
  },
  x: -60,
  opacity: 0,
  ease: "power3.out",
});

gsap.from(".section-right h2, .section-right p", {
  scrollTrigger: {
    trigger: ".section1",
    start: "top 85%",
    end: "top 30%",
    scrub: true,
  },
  y: 30,
  opacity: 0,
  stagger: 0.15,
  ease: "power3.out",
});

// ======================================
// EXPAND CARDS
// ======================================
const cardex = document.querySelectorAll(".ex-card");
if (cardex.length) {
  let activeCard = cardex[0];

  gsap.set(cardex, { width: 70 });
  gsap.set(activeCard, { width: 360 });
  activeCard.classList.add("active");

  cardex.forEach((card) => {
    card.addEventListener("click", () => {
      if (card === activeCard) {
        gsap.to(card, { width: 70, duration: 0.4, ease: "power3.out" });
        card.classList.remove("active");
        activeCard = null;
        return;
      }

      if (activeCard) {
        gsap.to(activeCard, { width: 70, duration: 0.4, ease: "power3.out" });
        activeCard.classList.remove("active");
      }

      gsap.to(card, { width: 360, duration: 0.6, ease: "power4.out" });
      card.classList.add("active");
      activeCard = card;
    });
  });
}

// ----------  xenograft -------




 
// ======================================
// ABOUT TEAM CARDS (HOVER + CLICK TOGGLE)
// ======================================
const teamCards = document.querySelectorAll(".team-card");
const hoverCapable = window.matchMedia("(hover: hover)").matches;

if (teamCards.length) {
  teamCards.forEach((card) => {
    let isLocked = false;

    // Hover preview flip on desktop/laptop pointers.
    card.addEventListener("mouseenter", () => {
      if (!hoverCapable || isLocked) return;
      card.classList.add("is-flipped");
    });

    card.addEventListener("mouseleave", () => {
      if (!hoverCapable || isLocked) return;
      card.classList.remove("is-flipped");
    });

    // Click toggles persistent flip state for all cards.
    card.addEventListener("click", () => {
      isLocked = !isLocked;
      card.classList.toggle("is-flipped", isLocked);
    });
  });
}
