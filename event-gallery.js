(() => {
  const galleries = Array.from(document.querySelectorAll("[data-event-gallery]"));
  if (!galleries.length) return;

  const body = document.body;
  const lightbox = createLightbox();
  let currentImages = [];
  let currentIndex = 0;
  let pageScrollY = 0;

  galleries.forEach((gallery) => {
    const windowEl = gallery.querySelector("[data-gallery-window]");
    const prevBtn = gallery.querySelector("[data-gallery-prev]");
    const nextBtn = gallery.querySelector("[data-gallery-next]");
    const slides = Array.from(gallery.querySelectorAll("[data-gallery-image]"));

    if (!windowEl || !slides.length) return;

    const scrollStep = () => Math.max(windowEl.clientWidth * 0.86, 280);

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        windowEl.scrollBy({ left: -scrollStep(), behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        windowEl.scrollBy({ left: scrollStep(), behavior: "smooth" });
      });
    }

    slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        currentImages = slides.map((item) => {
          const image = item.querySelector("img");
          return image
            ? {
                src: image.getAttribute("src") || "",
                alt: image.getAttribute("alt") || "Event image",
              }
            : { src: "", alt: "Event image" };
        });
        currentIndex = index;
        openLightbox();
      });
    });
  });

  function createLightbox() {
    const wrapper = document.createElement("div");
    wrapper.className = "event-lightbox";
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.innerHTML = `
      <button class="event-lightbox-close" type="button" aria-label="Close image viewer">&times;</button>
      <button class="event-lightbox-nav prev" type="button" aria-label="Previous image">&#10094;</button>
      <figure class="event-lightbox-figure">
        <img src="" alt="" class="event-lightbox-image" />
        <figcaption class="event-lightbox-caption"></figcaption>
      </figure>
      <button class="event-lightbox-nav next" type="button" aria-label="Next image">&#10095;</button>
    `;
    document.body.appendChild(wrapper);

    wrapper.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (
        target.classList.contains("event-lightbox") ||
        target.classList.contains("event-lightbox-close")
      ) {
        closeLightbox();
      } else if (target.classList.contains("event-lightbox-nav")) {
        const direction = target.classList.contains("next") ? 1 : -1;
        updateLightboxImage(currentIndex + direction);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!wrapper.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        updateLightboxImage(currentIndex + 1);
      } else if (event.key === "ArrowLeft") {
        updateLightboxImage(currentIndex - 1);
      }
    });

    return wrapper;
  }

  function openLightbox() {
    if (!currentImages.length) return;
    pageScrollY = window.scrollY || window.pageYOffset;
    body.style.top = `-${pageScrollY}px`;
    body.classList.add("event-lightbox-open");
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    updateLightboxImage(currentIndex);
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("event-lightbox-open");
    body.style.top = "";
    window.scrollTo(0, pageScrollY);
  }

  function updateLightboxImage(nextIndex) {
    if (!currentImages.length) return;
    if (nextIndex < 0) nextIndex = currentImages.length - 1;
    if (nextIndex >= currentImages.length) nextIndex = 0;
    currentIndex = nextIndex;

    const imageData = currentImages[currentIndex];
    const imageEl = lightbox.querySelector(".event-lightbox-image");
    const captionEl = lightbox.querySelector(".event-lightbox-caption");

    if (imageEl instanceof HTMLImageElement) {
      imageEl.src = imageData.src;
      imageEl.alt = imageData.alt;
    }
    if (captionEl) {
      captionEl.textContent = imageData.alt;
    }
  }
})();
