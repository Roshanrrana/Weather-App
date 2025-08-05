async function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  const apiKey = "65f00056e7da8911158ec03a62745801"; // Replace with your actual API key

  if (!cityInput) {
    document.getElementById("weatherResult").innerHTML = `
      <p class="text-danger"><i class="bi bi-x-circle me-1"></i> Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200 || data.cod !== 200) {
      document.getElementById("weatherResult").innerHTML = `
        <p class="text-danger"><i class="bi bi-exclamation-triangle-fill me-1"></i> City not found</p>`;
      return;
    }

    const weatherHTML = `
      <h3 class="fw-bold">${data.name}, ${data.sys.country}</h3>
      <span class="date-badge mb-2 d-inline-block">${new Date().toDateString()}</span>
      <p class="text-capitalize text-secondary">
        <i class="bi bi-cloud-fill text-info me-1"></i>${data.weather[0].description}
      </p>
      <div class="temp">${Math.round(data.main.temp)}°C</div>

      <div class="row mt-4">
        <div class="col-4">
          <div class="weather-card text-center">
            <i class="bi bi-wind"></i>
            <p class="mb-0">${data.wind.speed} km/h</p>
            <small>Wind</small>
          </div>
        </div>
        <div class="col-4">
          <div class="weather-card text-center">
            <i class="bi bi-droplet-half"></i>
            <p class="mb-0">${data.main.humidity}%</p>
            <small>Humidity</small>
          </div>
        </div>
        <div class="col-4">
          <div class="weather-card text-center">
            <i class="bi bi-eye"></i>
            <p class="mb-0">${data.visibility / 1000} km</p>
            <small>Visibility</small>
          </div>
        </div>
      </div>
    `;

    document.getElementById("weatherResult").innerHTML = weatherHTML;

  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("weatherResult").innerHTML = `
      <p class="text-danger"><i class="bi bi-bug-fill me-1"></i> Something went wrong. Please try again later.</p>`;
  }
}
