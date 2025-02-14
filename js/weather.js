const KEY = "b08332c778fcad97cc7aa0a56e974241";

const baseURL = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&units=metric`;

const weatherInput = document.getElementById("weather-search");


(function obtenerClimaPorCoordenadas() {

    axios.get(`${baseURL}&lat=35.671174&lon=139.774497`)   // Japón 35.671174, 139.774497
        .then(response => {
            console.log(response.data);
            const weather = response.data;

            pintarClima(weather);
        })
        .catch(errorsito => {
            console.log(errorsito);	
        })

})(); // IIFE para invocar inmediatamente la función


weatherInput.addEventListener("keyup", function(event) {

    if(event.key === "Enter") {
        
        const valorInput = event.target.value.toLowerCase();
        
        obtenerClimaPorNombreCiudad(valorInput);

    } 

})

function obtenerClimaPorNombreCiudad(ciudad) {
    
    axios.get(`${baseURL}&q=${ciudad}`)
                .then(response => {
                    const weather = response.data;
                    pintarClima(weather);
                })
                .catch(error => {
                    console.log(error);
                })

}


// obtenerClima();

function pintarClima(clima) {

    const weatherTempHTML = document.getElementById("weather-temp");
    const weatherLocationHTML = document.getElementById("weather-location");
    const weatherIconHTML = document.getElementById("weather-icon");

    weatherTempHTML.innerText = clima.main.temp;

    weatherLocationHTML.innerText = clima.name;

    const icon = clima.weather[0].icon;

    const img = document.createElement("img");
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    img.alt = "Icono del clima";

    weatherIconHTML.innerHTML = "";

    weatherIconHTML.appendChild(img);

}