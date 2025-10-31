
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

   
    tab.classList.add("active");
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add("active");
  });
});


const likeBtn = document.getElementById("likeBtn");
const shareBtn = document.getElementById("shareBtn");
const likesCount = document.getElementById("likesCount");
const shareCount = document.getElementById("shareCount");

let likes = 250000;
let shares = 30000;

likeBtn.addEventListener("click", () => {
  likes++;
  likesCount.textContent = likes.toLocaleString();
  likeBtn.textContent = "❤️ Liked";
  likeBtn.style.backgroundColor = "#001f4d";
});

shareBtn.addEventListener("click", () => {
  shares++;
  shareCount.textContent = shares.toLocaleString();
  shareBtn.textContent = "🔁 Shared";
  shareBtn.style.backgroundColor = "#001f4d";
});


const carousel = document.querySelector(".testimonial.carousel p");
const avatars = document.querySelectorAll(".carousel-author .avatar");
const prevBtn = document.querySelector(".carousel-author .prev");
const nextBtn = document.querySelector(".carousel-author .next");

const messages = [
  "From “Telegraph Road” to “Romeo and Juliet,” every track feels timeless. Their music never grows old.",
  "Mark Knopfler’s tone is unmatched — pure emotion in every note!",
  "I listen to “Brothers in Arms” almost daily. A perfect mix of peace and power."
];

let currentIndex = 0;

function showMessage(index) {
  carousel.textContent = messages[index];
  avatars.forEach((a, i) => {
    a.style.opacity = i === index ? "1" : "0.5";
    a.style.transform = i === index ? "scale(1.1)" : "scale(1)";
  });
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + messages.length) % messages.length;
  showMessage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % messages.length;
  showMessage(currentIndex);
});

showMessage(0);
