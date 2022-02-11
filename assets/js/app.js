let rootElement = document.documentElement;
let switcher = document.querySelector('.switcher');

switcher.addEventListener('click', () => {
    if (switcher.classList.contains('day')) {
        switcher.classList.remove('day');
        switcher.classList.add('night');
        rootElement.dataset.theme = "night";
    } else {
        switcher.classList.remove('night');
        switcher.classList.add('day');
        rootElement.dataset.theme = "day";
    }
})

/*
change theme by user local time
*/

// let userTime = new Date().toLocaleTimeString();

// if (userTime >= '17:00:00') {
//     switcher.classList.remove('day');
//     switcher.classList.add('night');
//     rootElement.dataset.theme = "night";
// } else {
//     switcher.classList.remove('night');
//     switcher.classList.add('day');
//     rootElement.dataset.theme = "day";
// }

let APIURL = "http://api.weatherapi.com/v1/forecast.json?key=6df6d61bc26e48b4833180547213009&days=5&q=";
let weatherForm = document.querySelector('.weather-form');
let dataContainer = document.querySelector('.data-from-api');
let loader = document.querySelector('.loader');

weatherForm.addEventListener('submit', (event) => {
    showLoader();
    let city = document.querySelector('.city').value;
    let NEWAPIURL = APIURL + city;


    fetch(NEWAPIURL)
        .then((response) => {
            hideLoader();
            if (response.status === 200) {
                return response.json();
            } else {
                return showError();
            }
        })

        .then((data) => {
            let view = '';
            // dataContainer.innerHTML = `<div class="main-info">Today (${data.location.localtime}) 
            // in ${data.location.name} is ${data.current.temp_c}<sup>o</sup>C </div>`

            view += `<div class="main-info">`;
            // icon weather
            view += `<div class="icon">`;
            view += `<img src="${data.current.condition.icon}" alt="${data.current.condition.text}">`
            view += `</div>`;
            //temp
            view += `<div class="temp">`;
            view += `<div class="temp-value" data-cel="${data.current.temp_c}" data-far="${data.current.temp_f}">`;
            view += data.current.temp_c;
            view += `</div>`;

            view += `<ul>
                <li class="change-temp active"><sup>o</sup>C</li>
                <li class="change-temp"><sup>o</sup>F</li>
            </ul>`;

            view += `</div>`;
            //info

            view += `<div class="info">
                <p>The amount of rainfall: ${data.current.precip_mm} mm</p>
                <p>Humidity: ${data.current.humidity} %</p>
                <p>Wind: ${data.current.wind_kph} km/h</p>
            </div>`;


            //close main-info
            view += `</div>`;
            view += `<div class="days-info">Next days weather: </div>`
            view += `<div class="days">`
            data.forecast.forecastday.forEach((day) => {
                view += `<div class="days">`;
                view += `<div class="date">${day.date}</div>`;
                view += `<div class="icon"><img src="${day.day.condition.icon}" alt="${day.day.condition.text}"></div>`;
                view += `<div class="temp">${day.day.avgtemp_c}<sup>o</sup>C</div>`;
                view += `</div>`;
            })
            view += `</div>`


            setTimeout(() => {
                dataContainer.innerHTML = view;
            }, 1000)
        });




    // console.log(NEWAPIURL);
    // alert(city);
    event.preventDefault();
})

function showError() {
    setTimeout(() => {
        dataContainer.innerHTML = `<div class="error">City not found or we have a problem with API</div>`;
    }, 1000)
}

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    setTimeout(() => {
        loader.style.display = "none";
    }, 1000)
}

