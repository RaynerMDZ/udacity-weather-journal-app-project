/* Global Variables */
const API_KEY = "65473b94c79c22336b818c678779ad47&units=imperial";

const zipcode = document.getElementById('zip');
const entryHolder = document.getElementById('entryHolder');
const feelings = document.getElementById('feelings');
let date = document.getElementById('date');
let temp = document.getElementById('temp');
let content = document.getElementById('content');

let data = {};
let displayData = {};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

const generateBtn = document.querySelector('#generate');

generateBtn.addEventListener('click', async () => {
    if (zipcode.value.length === 5) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode.value}&appid=${API_KEY}`;
            const response = await fetch(url);
            data = await response.json();

            await postData('/addData', data);

            displayData = await getData('/all');

            updateUI(displayData);

        } catch (error) {
            console.log(error);
        }
    } else {
        console.log({ error: 'Please enter a valid zipcode. (5 digits)' });
    }
});


// Post data to the server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Get data from the server
const getData = async (url = '') => {
    const response = await fetch(url);
    try {
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// kelvin to fahrenheit conversion
// const kelvinToFahrenheit = (temp) => {
//     return ((temp - 273.15) * 1.8 + 32).toFixed(2);
// }

const updateUI = (data) => {
    date.innerHTML = newDate;
    // temp.innerHTML = kelvinToFahrenheit(data.main.temp).toString() + ' &deg;F';
    temp.innerHTML = data.main.temp + ' &deg;F';
    content.innerHTML = data.weather[0].description;
}