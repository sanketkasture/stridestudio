const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src.replace("w=300&h=200", "w=1000&h=700"); // load larger image
  });
});

function closeLightbox() {
  lightbox.style.display = "none";
  lightboxImg.src = "";
}
