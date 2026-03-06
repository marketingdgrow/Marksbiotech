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

      burger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });

      /* ================= MOBILE MEGA MENU CLICK ================= */
      document.querySelectorAll(".has-mega").forEach((menu) => {
        menu.addEventListener("click", (e) => {
          if (window.innerWidth <= 767) {
            e.stopPropagation();
            menu.classList.toggle("open");
          }
        });
      });

      /* ================= UNIQUE → COL3 (MOBILE ONLY) ================= */
      document.getElementById("unique").addEventListener("click", (e) => {
        if (window.innerWidth <= 767) {
          e.stopPropagation();
          const col3 = document.getElementById("col3");
          col3.style.display =
            col3.style.display === "block" ? "none" : "block";
        }
      });

      const uniqueItem = document.getElementById("unique");
      const col3 = document.getElementById("col3");

      uniqueItem.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        col3.classList.toggle("active");
      });

      /* Optional: close when clicking outside mega menu */
      document.addEventListener("click", function (e) {
        if (!e.target.closest(".mega-menu")) {
          col3.classList.remove("active");
        }
      });


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
  const slideWidth = container.clientWidth;

  window.addEventListener("resize", () => {
  track.style.transition = "none";
  track.style.transform = `translateX(-${container.clientWidth * index}px)`;
});

  track.style.transform = `translateX(-${slideWidth * index}px)`;

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
    track.style.transition = "transform 0.5s cubic-bezier(.77,0,.24,1)";
    track.style.transform = `translateX(-${slideWidth * index}px)`;
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
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    }

    if (allSlides[index] === lastClone) {
      track.style.transition = "none";
      index = allSlides.length - 2;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
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

// ----------  xenograft -------




 