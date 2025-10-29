const API_KEY = '0d74a22d2729237471820d1ecf56f39f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

const movieGrid = document.getElementById('movieGrid');
const loadingText = document.getElementById('loadingText');
const errorText = document.getElementById('errorText');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');

// Load theme and fetch popular movies
document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', theme === 'dark');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  fetchMovies(`${BASE_URL}/trending/movie/week?language=en-US`);
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      fetchMovies(`${BASE_URL}/search/movie?query=${query}&language=en-US`);
    }
  }
});

async function fetchMovies(url) {
  try {
    loadingText.classList.remove('hidden');
    errorText.classList.add('hidden');
    movieGrid.innerHTML = '';

    const res = await fetch(`${url}&api_key=${API_KEY}`);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      loadingText.textContent = 'No results found.';
      return;
    }

    loadingText.classList.add('hidden');
    renderMovies(data.results);
  } catch (error) {
    console.error(error);
    loadingText.classList.add('hidden');
    errorText.classList.remove('hidden');
  }
}

function renderMovies(movies) {
  movieGrid.innerHTML = '';
  movies.forEach((movie) => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    card.innerHTML = `
      <img src="${
        movie.poster_path
          ? IMG_PATH + movie.poster_path
          : 'https://via.placeholder.com/300x450'
      }" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</p>
        <p class="rating">⭐ ${movie.vote_average.toFixed(1)}</p>
      </div>
    `;
    movieGrid.appendChild(card);
  });
}
