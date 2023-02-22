// Array of prayer times in 24-hour format
const prayerTimes = [  ['Fajr', '05:30'],
  ['Dhuhr', '12:30'],
  ['Asr', '15:30'],
  ['Maghrib', '18:00'],
  ['Isha', '20:00'],
];

// Get current time in 24-hour format
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// Get time remaining for the next prayer
function getTimeRemaining() {
  const currentTime = getCurrentTime();
  let nextPrayerTime;
  let timeRemaining;
  for (let i = 0; i < prayerTimes.length; i++) {
    if (prayerTimes[i][1] > currentTime) {
      nextPrayerTime = prayerTimes[i][1];
      break;
    }
  }
  if (nextPrayerTime) {
    const [nextPrayerHour, nextPrayerMinute] = nextPrayerTime.split(':');
    const now = new Date();
    const nextPrayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nextPrayerHour, nextPrayerMinute);
    timeRemaining = Math.floor((nextPrayerDate - now) / 1000);
  }
  return timeRemaining;
}

// Format time remaining in hours, minutes, and seconds
function formatTimeRemaining(timeRemaining) {
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update prayer times table
function updatePrayerTimes() {
  const currentTime = getCurrentTime();
  let prayerTimesHtml = '';
  for (let i = 0; i < prayerTimes.length; i++) {
    const prayerName = prayerTimes[i][0];
    const prayerTime = prayerTimes[i][1];
    const isCurrentPrayer = (prayerTime <= currentTime && i === prayerTimes.length - 1) || (prayerTime <= currentTime && prayerTimes[i+1][1] > currentTime);
    const prayerTimeClass = isCurrentPrayer ? 'table-primary' : '';
    prayerTimesHtml += `<tr class="${prayerTimeClass}">
                          <td>${prayerName}</td>
                          <td>${prayerTime}</td>
                        </tr>`;
  }
  document.getElementById('prayer-times').innerHTML = prayerTimesHtml;
}

// Update countdown 
function updateCountdown() {
  const timeRemaining = getTimeRemaining();
  if (timeRemaining !== undefined) {
    const countdownHtml = formatTimeRemaining(timeRemaining);
    document.getElementById('countdown').innerHTML = countdownHtml;
  }
}

// prayer times and countdown timer update
setInterval(() => {
  updatePrayerTimes();
  updateCountdown();
}, 1000);
