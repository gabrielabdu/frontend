const datepicker = document.querySelector('.datepicker');
const input = datepicker.querySelector('input');
const calendarBtn = datepicker.querySelector('.calendar-btn');
const calendar = datepicker.querySelector('.calendar');
const monthYear = datepicker.querySelector('.month-year');
const yearSelect = datepicker.querySelector('.year-select');
const prevBtn = datepicker.querySelector('.prev');
const nextBtn = datepicker.querySelector('.next');
const calendarGrid = datepicker.querySelector('.calendar-grid');
const themeToggle = document.getElementById('themeToggle');

let selectedDate = null;
let currentDate = new Date();

/* === Populate Year Dropdown === */
const populateYears = () => {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 50; y <= currentYear + 10; y++) {
    const option = document.createElement('option');
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
};

/* === Render Calendar === */
const renderCalendar = (date) => {
  calendarGrid.querySelectorAll('.day:not(.day-label)').forEach(d => d.remove());

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = date.toLocaleString('default', { month: 'long' });
  yearSelect.value = year;

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.classList.add('day', 'empty');
    calendarGrid.appendChild(empty);
  }

  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.textContent = i;

    const today = new Date();
    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      day.classList.add('today');
    }

    if (selectedDate &&
      i === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()) {
      day.classList.add('selected');
    }

    day.addEventListener('click', () => {
      selectedDate = new Date(year, month, i);
      input.value = `${String(i).padStart(2,'0')} / ${String(month+1).padStart(2,'0')} / ${year}`;
      calendar.classList.remove('open');
      renderCalendar(currentDate);
    });

    calendarGrid.appendChild(day);
  }
};

/* === Events === */
calendarBtn.addEventListener('click', () => {
  calendar.classList.toggle('open');
});

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

yearSelect.addEventListener('change', () => {
  currentDate.setFullYear(yearSelect.value);
  renderCalendar(currentDate);
});

document.addEventListener('click', (e) => {
  if (!datepicker.contains(e.target)) calendar.classList.remove('open');
});

/* === Dark Mode Toggle === */
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

/* === Initialize === */
populateYears();
renderCalendar(currentDate);
