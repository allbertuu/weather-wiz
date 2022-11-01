import { CaretDoubleDown, Cloud, Drop, Thermometer, ThermometerCold, ThermometerHot, Wind } from "phosphor-react";
import { useState, useEffect } from "react";
// icons
// import {
//     CloudIcon,
//     WaterIcon,
//     ThermostatIcon,
//     ArrowUpIcon,
//     ArrowDownIcon,
//     DoubleArrowDownIcon,
//     EmojiIcon,
//     SpeedIcon,
// } from "./assetsasd/icons";
// styles
import "./App.css";
// scripts
// import {
//     handleBodyStyles,
//     currentTime,
//     dayOfTheWeek,
//     dayOfTheWeekABBR,
// } from "./assetsasd/scripts/main";
import { openWeatherAPI } from "./services/api";
import { convertMSToKmH } from "./utils";

function App() {
    const [location, setLocation] = useState(false);

    useEffect(() => {
        // handleBodyStyles();

        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude);
            setLocation(true);
        });
    }, []);

    const [weatherData, setWeatherData] = useState<any | null>(null);

    const getWeather = async (lat: number, long: number) => {
        const res = await openWeatherAPI.get("/", {
            params: {
                lat: lat,
                lon: long,
            },
        });
        setWeatherData(res.data);
    };

    if (!location) {
        return (
            <div className="container">
                <h3>
                    Você precisa habilitar <br />a localização no browser o/
                </h3>
            </div>
        );
    } else if (!weatherData) {
        return (
            <div className="container">
                <h2>Carregando o clima...</h2>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="header">
                    <div className="title">
                        <h1>Seu clima</h1>
                        <Cloud size={32} />
                    </div>
                    <small>
                        Localização: <i>{weatherData.name}</i>
                        <br />
                        {/* Horário: {currentTime},{" "}
                        <abbr title={dayOfTheWeek}>{dayOfTheWeekABBR}</abbr> */}
                    </small>
                </div>
                <div className="card">
                    <h2>{weatherData.weather[0].description}</h2>
                    <ul>
                        <li>
                            <Thermometer size={16} />
                            Temperatura atual: {weatherData.main.temp}°
                        </li>
                        <li>
                            <ThermometerHot size={32} />
                            Temperatura máxima: {weatherData.main.temp_max}°
                        </li>
                        <li>
                            <ThermometerCold size={32} />
                            Temperatura minima: {weatherData.main.temp_min}°
                        </li>
                        <li>
                            <Wind size={32} />
                            Sensação térmica: {weatherData.main.feels_like}°
                        </li>
                        <li>
                            <CaretDoubleDown size={32} />
                            Pressão: {weatherData.main.pressure} hpa
                        </li>
                        <li>
                            <Wind size={32} />
                            Velocidade do vento:{" "}
                            {convertMSToKmH(weatherData.wind.speed)} km/h
                        </li>
                        <li>
                            <Drop size={32} />
                            Umidade: {weatherData.main.humidity}%
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
