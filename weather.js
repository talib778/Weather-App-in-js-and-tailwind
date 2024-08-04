const input = document.querySelector("input");
const search = document.getElementById("search_btn");
const wea_img = document.getElementById("w_img");
const temperature = document.getElementById("temperature");
const t_description = document.getElementById("t_description");
const humidity = document.getElementById("humidity");
const w_speed = document.getElementById("w_speed");
const error_box = document.getElementById("error_box");
const w_body=document.getElementById("weather_body");
const front_box=document.getElementById("front_box");

async function checkWeather(city) {
  const api_key = "f040ecde88829dab0664ae05895ef9bc";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json());
  if (weather_data.cod==='404') {
    error_box.style.display="flex";
    w_body.style.display="none";
    front_box.style.display="none";
   return;
 }  
 error_box.style.display="none"
 w_body.style.display="flex";
  temperature.innerHTML = `${Math.round(
    weather_data.main.temp - 273.15
  )}<img src="./images/centigrade.png" class="w-10">`;
  t_description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%<br>Humidity`;
  w_speed.innerHTML = `${weather_data.wind.speed}km/h<br>Wind Speed`;
  if (weather_data.cod==="404") {
     error_box.style.display="flex";
    return;
  }
  switch (weather_data.weather[0].description) {
    case "smoke":
      wea_img.src = "./images/smoke.png";
      wea_img.style.width = "150px";
      break;
    case "overcast clouds":
      wea_img.src = "./images/rain_cloud.png";
      wea_img.style.width = "150px";
      break;
    case "haze":
      wea_img.src = "./images/haze.png";
      wea_img.style.width="250px"
      break;
  }
}
search.addEventListener("click", () => {
  checkWeather(input.value);
});
