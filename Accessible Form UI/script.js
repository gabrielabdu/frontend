// ===== Step Navigation =====
const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".btn-next");
const form = document.getElementById("profile-form");
const checkboxes = document.querySelectorAll(".task-list input");
const circle = document.getElementById("progress-circle");
const circleValue = document.getElementById("progress-value");

let currentStep = 0;

function updateProgress() {
  const completed = Array.from(checkboxes).filter(c => c.checked).length;
  const percent = Math.round((completed / checkboxes.length) * 100);
  circle.style.setProperty("--progress", percent);
  circleValue.textContent = `${percent}%`;
  circle.setAttribute("aria-valuenow", percent);
}

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      // Mark task completed
      document.getElementById(`step${currentStep + 1}`).checked = true;
      updateProgress();

      steps[currentStep].classList.remove("active");
      currentStep++;
      steps[currentStep].classList.add("active");
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById(`step${currentStep + 1}`).checked = true;
  updateProgress();
  alert("🎉 Your profile setup is complete!");
});

updateProgress();
