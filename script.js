let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity')
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');
let body = document.querySelector('body');

form.addEventListener('submit',(event) => {
    event.preventDefault();
    if(valueSearch.value != ''){
        searchWeather()
    }
})

let id = '1e5f2469016de380784d8240a53b2f06';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;
const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
    .then(responsive => responsive.json())
    .then(data => {
        console.log(data);
        if(data.cod == 200){
            city.querySelector('figcaption').innerText = data.name;
            if (data.sys.country) {
                city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/32.png';
            }            
            temperature.querySelector('img').src= 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@4x.png'
            temperature.querySelector('figcaption span').innerText = data.main.temp;
            description.innerText = data.weather[0].description;
            clouds.innerText = data.clouds.all;
            humidity.innerText = data.main.humidity;
            pressure.innerText = data.main.pressure;
            main.classList.remove('error');
        }else {
            main.classList.add('error');
            setTimeout(() => {
                main.classList.remove('error');
            }, 1000);
        }
        if (['01n', '02n', '03n', '04n', '09n', '10n', '11n', '13n', '50n'].includes(data.weather[0].icon)) {
            main.classList.add('night');
            body.classList.add('night');
        } else {
            main.classList.remove('night');
            body.classList.remove('night');
        }
        
        valueSearch.value = '';
    })
}

const initApp = () => {
    valueSearch.value = 'Washington';
    searchWeather();
}
initApp();