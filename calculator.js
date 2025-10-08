
function calculateAge() {
  const birthDateInput = document.getElementById('birthDate');
  const birthDate = new Date(birthDateInput.value);
  
  if (!birthDateInput.value) {
    alert('الرجاء إدخال تاريخ الميلاد');
    return;
  }

  const now = new Date();
  const diff = now - birthDate;

  // حساب العمر بالتفصيل
  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
  const days = Math.floor((diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  const totalDays = Math.floor(diff / (24 * 60 * 60 * 1000));
  const totalHours = Math.floor(diff / (60 * 60 * 1000));
  const totalMinutes = Math.floor(diff / (60 * 1000));
  const totalSeconds = Math.floor(diff / 1000);

  const t = translations[currentLanguage] || translations['ar'];

  // عرض العمر الرئيسي
  document.getElementById('ageDisplay').innerHTML = `
    ${years} ${t.years} ${months} ${t.months} ${days} ${t.days}
  `;

  // عرض التفاصيل
  document.getElementById('detailsGrid').innerHTML = `
    <div class="detail-item">
      <div>${t.years}</div>
      <div class="detail-value">${years}</div>
    </div>
    <div class="detail-item">
      <div>${t.months}</div>
      <div class="detail-value">${months}</div>
    </div>
    <div class="detail-item">
      <div>${t.days}</div>
      <div class="detail-value">${totalDays.toLocaleString()}</div>
    </div>
    <div class="detail-item">
      <div>${t.hours}</div>
      <div class="detail-value">${totalHours.toLocaleString()}</div>
    </div>
    <div class="detail-item">
      <div>${t.minutes}</div>
      <div class="detail-value">${totalMinutes.toLocaleString()}</div>
    </div>
    <div class="detail-item">
      <div>${t.seconds}</div>
      <div class="detail-value">${totalSeconds.toLocaleString()}</div>
    </div>
  `;

  // عرض البرج
  const zodiac = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate());
  document.getElementById('zodiacDisplay').innerHTML = `
    <div class="zodiac-icon">${zodiac.icon}</div>
    <div>${zodiac.name}</div>
  `;

  // حساب عيد الميلاد القادم
  const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil((nextBirthday - now) / (24 * 60 * 60 * 1000));
  const nextAge = years + 1;

  document.getElementById('birthdayDisplay').innerHTML = `
    <div>${t.nextAge}: ${nextAge} ${t.years}</div>
    <div class="countdown">${daysUntilBirthday} ${t.daysUntilBirthday}</div>
  `;

  // عرض العمر على الكواكب
  const planets = [
    { name: 'Mercury', years: (years * 365.25 / 87.97).toFixed(1) },
    { name: 'Venus', years: (years * 365.25 / 224.7).toFixed(1) },
    { name: 'Earth', years: years.toFixed(1) },
    { name: 'Mars', years: (years * 365.25 / 687).toFixed(1) },
    { name: 'Jupiter', years: (years * 365.25 / 4333).toFixed(1) },
    { name: 'Saturn', years: (years * 365.25 / 10759).toFixed(1) },
    { name: 'Uranus', years: (years * 365.25 / 30687).toFixed(1) },
    { name: 'Neptune', years: (years * 365.25 / 60190).toFixed(1) }
  ];

  document.getElementById('planetsGrid').innerHTML = planets.map(planet => {
    const translatedPlanet = t[planet.name] || planet.name;
    return `
      <div class="planet-item">
        <div>${translatedPlanet}</div>
        <div class="planet-age">${planet.years} ${t.years}</div>
      </div>
    `;
  }).join('');

  // إحصائيات الأرض
  const earthRotations = years;
  const moonRotations = years * 12;

  document.getElementById('earthStats').innerHTML = `
    <div class="detail-item">
      <div>${t.earthRotations}</div>
      <div class="detail-value">${earthRotations}</div>
    </div>
    <div class="detail-item">
      <div>${t.moonRotations}</div>
      <div class="detail-value">${moonRotations}</div>
    </div>
  `;

  // معلومات صحية
  const heartbeats = (totalDays * 100000).toLocaleString();
  const idealWeight = "60-80 kg";
  const idealHeight = "160-180 cm";

  document.getElementById('healthInfo').innerHTML = `
    <div class="detail-item">
      <div>${t.idealWeight}</div>
      <div class="detail-value">${idealWeight}</div>
    </div>
    <div class="detail-item">
      <div>${t.idealHeight}</div>
      <div class="detail-value">${idealHeight}</div>
    </div>
    <div class="detail-item">
      <div>${t.heartbeats}</div>
      <div class="detail-value">${heartbeats}</div>
    </div>
  `;

  // إظهار النتائج
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
}

function getZodiacSign(month, day) {
  const zodiacSigns = [
    { name: 'Capricorn', icon: '♑', start: [12, 22], end: [1, 19] },
    { name: 'Aquarius', icon: '♒', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', icon: '♓', start: [2, 19], end: [3, 20] },
    { name: 'Aries', icon: '♈', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', icon: '♉', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', icon: '♊', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', icon: '♋', start: [6, 21], end: [7, 22] },
    { name: 'Leo', icon: '♌', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', icon: '♍', start: [8, 23], end: [9, 22] },
    { name: 'Libra', icon: '♎', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', icon: '♏', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', icon: '♐', start: [11, 22], end: [12, 21] }
  ];
  
  for (const sign of zodiacSigns) {
    if ((month === sign.start[0] && day >= sign.start[1]) || 
        (month === sign.end[0] && day <= sign.end[1])) {
      const t = translations[currentLanguage] || translations['ar'];
      const translatedName = t[sign.name] || sign.name;
      return { name: translatedName, icon: sign.icon };
    }
  }
  
  const t = translations[currentLanguage] || translations['ar'];
  const translatedCapricorn = t['Capricorn'] || 'Capricorn';
  return { name: translatedCapricorn, icon: '♑' };
}
