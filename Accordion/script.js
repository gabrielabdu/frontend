const accordions = document.querySelectorAll(".accordion");

accordions.forEach(acc => {
  const header = acc.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    // Close other accordions
    accordions.forEach(other => {
      if (other !== acc) {
        other.classList.remove("active");
      }
    });

    // Toggle current one
    acc.classList.toggle("active");
  });
});
