const { DateTime } = luxon;
const form = document.getElementById("ageForm");
const result = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("birthdate").value.trim();
  const [day, month, year] = input.split("/").map(Number);

  // Basic validation
  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    result.textContent = "⚠️ Please enter a valid date (DD/MM/YYYY)";
    return;
  }

  const birthDate = DateTime.fromObject({ day, month, year });
  const now = DateTime.now();

  if (!birthDate.isValid || birthDate > now) {
    result.textContent = "⚠️ Please enter a valid past date.";
    return;
  }

  const diff = now.diff(birthDate, ["years", "months", "days"]).toObject();
  const years = Math.floor(diff.years);
  const months = Math.floor(diff.months);
  const days = Math.floor(diff.days);

  result.innerHTML = `You are <strong>${years} years ${months} months</strong> old`;
});
