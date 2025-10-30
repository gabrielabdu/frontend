const navItems = document.querySelectorAll('.nav-item');
const infoCard = document.getElementById('info-card');

// Sports info database (no image URLs now)
const sportsData = {
  football: {
    title: "⚽ Football",
    desc: "Football (soccer) is the most popular sport in the world. It unites people through legendary tournaments like the World Cup and the Champions League."
  },
  basketball: {
    title: "🏀 Basketball",
    desc: "Basketball is a fast-paced and exciting game that emphasizes teamwork and athleticism. The NBA is home to some of the world’s greatest athletes."
  },
  tennis: {
    title: "🎾 Tennis",
    desc: "Tennis combines strategy, speed, and endurance. Players compete in major tournaments such as Wimbledon, Roland Garros, and the US Open."
  },
  f1: {
    title: "🏎️ Formula 1",
    desc: "Formula 1 showcases speed and engineering mastery. Elite drivers and teams compete on famous circuits like Monaco and Silverstone."
  }
};

// Tooltip interactivity
navItems.forEach(item => {
  const tooltip = item.querySelector('.tooltip');
  const info = item.getAttribute('data-tooltip');

  item.addEventListener('mouseenter', () => {
    tooltip.textContent = info;
  });

  item.addEventListener('mouseover', () => {
    tooltip.style.backgroundColor = randomColor();
  });

  item.addEventListener('mouseleave', () => {
    tooltip.style.backgroundColor = '#222';
  });

  // Click interaction to show info card
  item.addEventListener('click', () => {
    const sportKey = item.getAttribute('data-sport');
    showInfoCard(sportKey);
  });
});

// Utility: Random bright color for tooltip
function randomColor() {
  const colors = ['#FF5733', '#33C3FF', '#8E44AD', '#28B463', '#F4D03F'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Show info card (no image)
function showInfoCard(sportKey) {
  const sport = sportsData[sportKey];
  infoCard.innerHTML = `
    <h2>${sport.title}</h2>
    <p>${sport.desc}</p>
    <button class="close-btn">Close</button>
  `;
  infoCard.style.display = 'block';

  const closeBtn = infoCard.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    infoCard.style.display = 'none';
  });
}
