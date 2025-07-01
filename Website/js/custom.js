const video = document.getElementById("myVideo");
const toggleBtn = document.getElementById("toggleBtn");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
  } else {
    video.pause();
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
  }
});

// Update icon if user uses video controls
video.addEventListener("play", () => {
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
});

video.addEventListener("pause", () => {
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
});

/*-------Accordion-----------*/
const accordionButtons = document.querySelectorAll(".accordion-button");
const image = document.getElementById("accordionImage");

accordionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const newImg = this.getAttribute("data-img");
    if (newImg) {
      image.src = newImg;
    }
  });
});

/*---------------------Testimonials Card --------------------------*/

const track = document.getElementById("carouselTrack");
const cards = document.querySelectorAll(".testimonial-card");
let currentIndex = 0;

function getVisibleCards() {
  return window.innerWidth <= 768 ? 1 : 3;
}

function slideCarousel(direction) {
  const visibleCards = getVisibleCards();
  const maxIndex = cards.length - visibleCards;

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const moveX = -(currentIndex * (100 / visibleCards));
  track.style.transform = `translateX(${moveX}%)`;
}

// Optional: Reset currentIndex on resize
window.addEventListener("resize", () => {
  currentIndex = 0;
  slideCarousel(0);
});

// Initialize position
slideCarousel(0);

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
