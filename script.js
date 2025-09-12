const APIkey = '5b61fd0faf584f2683d104945251209';
const baseURL = 'https://api.weatherapi.com/v1';


const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const resultDiv = document.getElementById('weather-result');
const city = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');
const localTime = document.getElementById('localtime');


form.addEventListener('submit', async(e) => {
    e.preventDefault();
        const cityName = cityInput.value.trim(); 

        if (!cityName){

            throw new Error('You must enter a city name!')
        }

    try {
         const url = `${baseURL}/current.json?key=${APIkey}&q=${cityName}`
         const response = await fetch(url);

         if (!response.ok){
            throw new Error ('City was not found.')
         }

         const data = await response.json();

         city.textContent = `${data.location.name}, ${data.location.country}`;
         localTime.textContent = `Local time: ${data.location.localtime}`;
         temperature.textContent = `Temperature: ${data.current.temp_c}°C`
         description.textContent = `Condition: ${data.current.condition.text}`
         weatherIcon.src = `${data.current.condition.icon}`

         resultDiv.classList.remove('hidden');

        
    } catch (error) {
        alert('Error occured:' + error.message)
        resultDiv.classList.add('hidden');
    }
})