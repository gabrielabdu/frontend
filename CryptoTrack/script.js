const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
const tableBody = document.getElementById("cryptoTable");
const loadingText = document.getElementById("loadingText");
const errorText = document.getElementById("errorText");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

let cryptoData = [];

// Load theme on start
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark", savedTheme === "dark");
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  fetchCrypto();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

async function fetchCrypto() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    cryptoData = data;
    renderTable(data);
    loadingText.classList.add("hidden");
  } catch (err) {
    loadingText.classList.add("hidden");
    errorText.classList.remove("hidden");
  }
}

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((coin, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>#${coin.market_cap_rank}</td>
      <td>
        <img src="${coin.image}" width="24" height="24" style="vertical-align:middle; margin-right:8px;">
        ${coin.name} (${coin.symbol.toUpperCase()})
      </td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td class="${coin.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>$${coin.market_cap.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", (e) => {
  const search = e.target.value.toLowerCase();
  const filtered = cryptoData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
  );
  renderTable(filtered);
});
