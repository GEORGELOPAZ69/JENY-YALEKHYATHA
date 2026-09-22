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


// ESC KEY
document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    lightbox.classList.remove("show");
  }

});

function getStars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function renderReviews() {

  const list = document.getElementById("reviewList");

  list.innerHTML = "";

  if (reviews.length === 0) {

    list.innerHTML = `
      <div class="empty-gallery">
        Customer reviews will appear here.
      </div>
    `;

    document.getElementById("averageStars").textContent = "★★★★★";
    document.getElementById("averageRating").textContent =
      "5.0 / 5 · 0 reviews";

    return;
  }

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.rating),
    0
  );

  const average = total / reviews.length;

  document.getElementById("averageStars").textContent =
    getStars(Math.round(average));

  document.getElementById("averageRating").textContent =
    average.toFixed(1) +
    " / 5 · " +
    reviews.length +
    (reviews.length === 1 ? " review" : " reviews");

  reviews.forEach(review => {

    const card = document.createElement("div");

    card.className = "review-card";

    card.innerHTML = `
      <div class="review-top">
        <div class="reviewer">
          ${escapeHtml(review.name)}
        </div>

        <div class="review-date">
          ${review.date || ""}
        </div>
      </div>

      <div class="review-stars">
        ${getStars(Number(review.rating))}
      </div>

      <p>
        ${escapeHtml(review.text)}
      </p>
    `;

    list.appendChild(card);
  });
}
