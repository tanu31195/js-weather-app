/*
 * Created by Tanushka Bandara (https://tanu31195.github.io)
 * Last Modified on 9/14/19, 6:29 PM
 * Copyright (c) 2019. All rights reserved.
 */

// ` backtick = Template literals are string literals allowing embedded expressions

window.addEventListener('load', () => {
    let latitude;
    let longitude;
    const temperatureDegree = document.querySelector('.temperature-degree');
    const temperatureDescription = document.querySelector('.temperature-description');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/3f38a1da6ea8b7e4266ec25f85bd1c79/${latitude},${longitude}`;

                fetch(api).then(response => {
                    return response.json();
                })
                    .then(data => {
                        console.log(data);
                        const {temperature: fahrenheit, summary, icon} = data.currently;
                        let celsius = Math.floor((fahrenheit - 32) * (5 / 9));
                        // Setting DOM Elements from the API
                        temperatureDegree.textContent = celsius;
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        //Temperature Conversion

                        setIcon(icon, document.querySelector('.icon'));

                        //Change temperature to Celsius/Fahrenheit
                        temperatureSection.addEventListener("click", () => {
                            if (temperatureSpan.textContent === "F") {
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = celsius;
                            } else {
                                temperatureSpan.textContent = "F";
                                temperatureDegree.textContent = fahrenheit;
                            }
                        })
                    })
            });
    }

    function setIcon(icon, iconIdD) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();       //partly-cloudy-day to PARTLY_CLOUDY_DAY
        skycons.play();
        return skycons.set(iconIdD, Skycons[currentIcon]);
    }

    // else {
    //     //Please allow location
    // }
});


// currently: {time: 1569154797, summary: "Possible Light Rain and Humid", icon: "rain", nearestStormDistance: 0,…}
// apparentTemperature: 83.03
// cloudCover: 0.22
// dewPoint: 76.44
// humidity: 0.92
// icon: "rain"
// nearestStormDistance: 0
// ozone: 259.9
// precipIntensity: 0.028
// precipProbability: 0.57
// precipType: "rain"
// pressure: 1008.88
// summary: "Possible Light Rain and Humid"
// temperature: 78.96
// time: 1569154797
// uvIndex: 0
// visibility: 0.055
// windBearing: 234
// windGust: 19.24
// windSpeed: 10.71
