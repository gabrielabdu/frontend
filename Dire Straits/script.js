const likeBtn = document.getElementById("likeBtn");
const shareBtn = document.getElementById("shareBtn");
const likesCount = document.getElementById("likesCount");
const msgCount = document.getElementById("msgCount");
const shareCount = document.getElementById("shareCount");

let likes = 250000;
let messages = 80000;
let shares = 30000;

likeBtn.addEventListener("click", () => {
  likes += 1;
  likesCount.textContent = likes.toLocaleString() + " ❤️";
  likeBtn.textContent = "Liked!";
  likeBtn.style.backgroundColor = "#001f4d";
});

shareBtn.addEventListener("click", () => {
  shares += 1;
  shareCount.textContent = shares.toLocaleString() + " 🔁";
  shareBtn.textContent = "Shared!";
  shareBtn.style.backgroundColor = "#001f4d";
});

setInterval(() => {
  messages += Math.floor(Math.random() * 3);
  msgCount.textContent = messages.toLocaleString();
}, 3000);
