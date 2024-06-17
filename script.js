
const cityform = document.querySelector("form");
const cityinput = document.querySelector(".cityinput");
const weather = document.querySelector(".weather");
const iconid = document.querySelector(".icon");
const apiKey = "dd1768926c14c99f09e541a7071554de";
document.addEventListener('DOMContentLoaded', function() {
  
    cityinput.addEventListener('blur', function() {
      if (cityinput.value === '') {
        cityinput.placeholder = 'Enter a city';
      }
    });
  
    cityinput.addEventListener('focus', function() {
      cityinput.placeholder = '';
    });
  });
document.addEventListener("DOMContentLoaded", function() {
    const toronto = "Toronto";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${toronto}&appid=${apiKey}`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const defaulttemperature = data.main.temp;
            const defaulthumidity = data.main.humidity;
            const defaultcityname = data.name;
            const defaultwindspeed = data.wind.speed; 

            weather.innerHTML = `
                <img class="icon" src="image/rainy.png" alt="icon">
                <h2 class="temperature">${(defaulttemperature - 273.15).toFixed(1)}°C</h2>
                <h2 class="cityname">${defaultcityname}</h2>
                <p class="condition">${weatherDescription}</p>
                <p class="humidity">Humidity: ${defaulthumidity}%</p>
                <p class="wind_speed">Wind Speed: ${defaultwindspeed}kph</p>`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
})

cityform.addEventListener("submit", async event =>{
    event.preventDefault()
    const city = cityinput.value;

    if(!city || !isNaN(city)){
        showerror("please enter a valid city name");
        
    }
    else{
        try {
            const data = await getweather(city);
            console.log(data);
            updateUI(data);   
        } 
        catch (error) {
            showerror("please enter a valid city name");
            
        }
    }

})


async function getweather(city){
    const base = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${city}&appid=${apiKey}`;
    const response = await fetch(base + query);
    if (response.ok){
        const data = await response.json();
        return data;
    }
    else{
        throw new Error('Weather data could not be fetched');

    }
}
/*async function gethourlyforecast(city){
    const base = `https://pro.openweathermap.org/data/2.5/forecast/hourly`;
    const query =`?q=${city}&appid=${apiKey}`;
    const response = await fetch(base + query);
    if (response.ok){
        const data = await response.json();
        return data;
    }
    else{
        throw new Error('Weather data could not be fetched');

    }
     
}*/
function updateUI(data){
    const condition = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const cityname = data.name;
    const windspeed = data.wind.speed;
    const icon_main= data.weather[0].main;

    weather.innerHTML = `
        <img class="icon" src="${getweatherIcon(icon_main)}" alt="icon">
        <h2 class="temperature">${(temperature - 273.15).toFixed(1)}°C</h2>
        <h2 class="cityname">${cityname}</h2>
        <p class="condition">${condition}</p>
        <p class="humidity">Humidity: ${humidity}%</p>
        <p class="wind_speed">Wind Speed: ${windspeed}kph</p>`;
    
}

function getweatherIcon(weatherid){
    if(weatherid == "Clouds" ){
        iconid.src= "image/cloudy.png";
    }
    else if(weatherid == "Clear" ){
        iconid.src= "image/sun.png";
    }
    else if(weatherid == "Rain" ){
        iconid.src= "image/rainy.png";
    }
    else if(weatherid == "Drizzle" ){
        iconid.src= "image/drizzle.png";
    }
    else if(weatherid == "Thunderstorm" ){
        iconid.src= "image/storm-thunder.png";
    }
    else if(weatherid == "Snow" ){
        iconid.src= "image/snow.png";
    }
    return iconid.src;
}

function showerror(message){
    const displayerror = document.createElement("p");
    displayerror.textContent = message;
    displayerror.classList.add("displayerror");
    weather.textContent = "";
    weather.style.display = "flex";
    weather.appendChild(displayerror);
}




