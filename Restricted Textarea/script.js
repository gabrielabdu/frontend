const textarea = document.getElementById("message");
const charCount = document.getElementById("charCount");
const maxChars = 250;

textarea.addEventListener("input", () => {
  const length = textarea.value.length;
  charCount.textContent = length;

  if (length >= maxChars) {
    textarea.classList.add("limit");
    charCount.parentElement.classList.add("limit");
  } else {
    textarea.classList.remove("limit");
    charCount.parentElement.classList.remove("limit");
  }
});
