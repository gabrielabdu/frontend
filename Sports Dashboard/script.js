// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Mock API data (replace with real API fetch if needed)
const teams = [
  { name: "Red Raptors", logo: "https://via.placeholder.com/200x120?text=Raptors", points: 20 },
  { name: "Blue Bulls", logo: "https://via.placeholder.com/200x120?text=Bulls", points: 15 },
  { name: "Green Giants", logo: "https://via.placeholder.com/200x120?text=Giants", points: 18 },
];

const players = [
  { name: "Alice Smith", photo: "https://via.placeholder.com/200?text=Alice", team: "Red Raptors" },
  { name: "Bob Johnson", photo: "https://via.placeholder.com/200?text=Bob", team: "Blue Bulls" },
  { name: "Charlie Lee", photo: "https://via.placeholder.com/200?text=Charlie", team: "Green Giants" },
];

const matches = [
  { teams: "Raptors vs Bulls", date: "2025-11-01", score: "3 - 2" },
  { teams: "Giants vs Bulls", date: "2025-11-03", score: "1 - 1" },
  { teams: "Raptors vs Giants", date: "2025-11-05", score: "0 - 2" },
];

// Featured match
document.getElementById("featuredMatch").textContent = `${matches[0].teams} | Score: ${matches[0].score}`;

// Render cards with animation
function renderCards(containerId, items, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    if(type === "team") card.innerHTML = `<img src="${item.logo}" alt="${item.name}"><h3>${item.name}</h3>`;
    else if(type === "player") card.innerHTML = `<img src="${item.photo}" alt="${item.name}"><h3>${item.name}</h3><p>${item.team}</p>`;
    else if(type === "match") card.innerHTML = `<h3>${item.teams}</h3><p>Date: ${item.date}</p><p>Score: ${item.score}</p>`;
    container.appendChild(card);
    setTimeout(() => card.classList.add("show"), index * 100);
  });
}

// Initial render
renderCards("teamsContainer", teams, "team");
renderCards("playersContainer", players, "player");
renderCards("matchesContainer", matches, "match");

// Team filter
const teamFilter = document.getElementById("teamFilter");
teams.forEach(t => teamFilter.innerHTML += `<option value="${t.name}">${t.name}</option>`);
teamFilter.addEventListener("change", () => {
  const filtered = teamFilter.value === "all" ? players : players.filter(p => p.team === teamFilter.value);
  renderCards("playersContainer", filtered, "player");
});

// Team Stats Chart
const ctx = document.getElementById('teamChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: teams.map(t => t.name),
    datasets: [{
      label: 'Points',
      data: teams.map(t => t.points),
      backgroundColor: ['#ff4c4c','#4c6eff','#4cff6e']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Team Points' }
    }
  }
});
