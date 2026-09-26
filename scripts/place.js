const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastmodified").textContent = document.lastModified;


const temperature = 8;
const windSpeed = 12;

function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    document.querySelector("#windchill").textContent = `${windChill.toFixed(1)}°C`;
} else {
    document.querySelector("#windchill").textContent = "N/A";
}