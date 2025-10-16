document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("cookiePopup");
  const acceptBtn = document.getElementById("acceptCookies");
  const closeBtn = document.getElementById("closePopup");

  if (!localStorage.getItem("cookieConsent")) {
    popup.classList.add("show");
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    popup.classList.remove("show");
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.remove("show");
  });
});
