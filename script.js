const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".photo-card");
const count = document.getElementById("photoCount");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

const colourButton = document.getElementById("colourButton");
const colourDropdown = document.getElementById("colourDropdown");
const colourOptions = colourDropdown.querySelectorAll("button");


function updateCount(){
  const visible = [...cards].filter(
    card => !card.classList.contains("hidden")
  ).length;

  count.textContent = String(visible).padStart(2, "0") + " PHOTOS";
}


// MAIN FILTERS
filters.forEach(button => {

  button.addEventListener("click", () => {

    // Don't run normal filter code for the COLOURS dropdown button
    if (button === colourButton) {
      colourDropdown.classList.toggle("show");
      return;
    }

    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    cards.forEach(card => {

      card.classList.toggle(
        "hidden",
        filter !== "all" &&
        card.dataset.category !== filter
      );

    });

    updateCount();

    colourDropdown.classList.remove("show");
  });

});


// COLOUR DROPDOWN
colourOptions.forEach(option => {

  option.addEventListener("click", () => {

    const selectedColour = option.dataset.colour;

    filters.forEach(b => b.classList.remove("active"));
    colourButton.classList.add("active");

    cards.forEach(card => {

      if (selectedColour === "all") {

        card.classList.remove("hidden");

      } else {

        card.classList.toggle(
          "hidden",
          card.dataset.colour !== selectedColour
        );

      }

    });

    colourButton.innerHTML =
      selectedColour === "all"
        ? 'COLOURS <span>▾</span>'
        : selectedColour + ' <span>▾</span>';

    updateCount();

    colourDropdown.classList.remove("show");
  });

});


// CLOSE DROPDOWN WHEN CLICKING OUTSIDE
document.addEventListener("click", (event) => {

  if (!event.target.closest(".colour-filter")) {
    colourDropdown.classList.remove("show");
  }

});


// LIGHTBOX
cards.forEach(card => {

  card.addEventListener("click", () => {

    lightboxImage.src = card.querySelector("img").src;

    lightboxImage.alt =
      card.querySelector("img").alt;

    lightboxTitle.textContent =
      card.querySelector("h3").textContent;

    lightbox.classList.add("show");

  });

});


// CLOSE LIGHTBOX
document
  .querySelector(".close")
  .addEventListener("click", () => {

    lightbox.classList.remove("show");

  });


// CLOSE LIGHTBOX BY CLICKING OUTSIDE IMAGE
lightbox.addEventListener("click", event => {

  if (event.target === lightbox) {
    lightbox.classList.remove("show");
  }

});


