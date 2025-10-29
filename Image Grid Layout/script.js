// JavaScript for interactive layout switching and hover animations

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleLayout");
  const gridContainer = document.querySelector(".grid-container");

  toggleButton.addEventListener("click", () => {
    gridContainer.classList.toggle("alt-layout");

    if (gridContainer.classList.contains("alt-layout")) {
      toggleButton.textContent = "Restore Original Layout";
    } else {
      toggleButton.textContent = "Change Layout";
    }
  });

  // Small hover pulse animation for user feedback
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      item.style.transition = "transform 0.3s ease";
      item.style.transform = "scale(1.05)";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1)";
    });
  });
});
