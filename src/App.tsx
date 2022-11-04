import {
    CaretDoubleDown,
    CloudMoon,
    CloudSun,
    Drop,
    SunHorizon,
    Thermometer,
    ThermometerCold,
    ThermometerHot,
    Waves,
    Wind,
} from "phosphor-react";
import { useState, useEffect } from "react";
import { openWeatherAPI } from "./services/api";
import {
    convertMSToKmH,
    currentHour,
    flexibleDayPeriod,
    getHour,
    handleBodyStyles,
} from "./utils";
import "./styles/App.scss";
import { SupportCreator } from "./components/SupportCreator";

function App() {
    const [isGeolocationFound, setIsGeolocationFound] = useState(false);
    const [weatherData, setWeatherData] = useState<any | null>(null);

    useEffect(() => {
        handleBodyStyles();

        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude);
            setIsGeolocationFound(true);
        });
    }, []);

    const getWeather = async (lat: number, long: number) => {
        const res = await openWeatherAPI.get("/", {
            params: {
                lat: lat,
                lon: long,
            },
        });
        setWeatherData(res.data);
    };

    if (!isGeolocationFound) {
        return (
            <div className="container">
                <h3>
                    Você precisa habilitar <br />a localização no browser :)
                </h3>
            </div>
        );
    } else if (!weatherData) {
        return (
            <div className="container">
                <h2>Observando o céu...</h2>
                <div className="spinner">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <SupportCreator />

                <header className="header">
                    <div className="title">
                        {flexibleDayPeriod.includes("noite") ? (
                            <>
                                <h1>Boa noite</h1>
                                <CloudMoon />
                            </>
                        ) : (
                            <>
                                <h1>Bom dia</h1>
                                <CloudSun />
                            </>
                        )}
                    </div>
                    <p className="localizationInfos">
                        {weatherData.name}, {currentHour} {flexibleDayPeriod}
                    </p>
                </header>

                <div className="card">
                    <h2>{weatherData.weather[0].description}</h2>
                    <ul>
                        <li>
                            <SunHorizon size={22} />
                            Nascer do sol: {getHour(weatherData.sys.sunrise)}
                        </li>
                        <li>
                            <SunHorizon size={22} />
                            Pôr do sol: {getHour(weatherData.sys.sunset)}
                        </li>
                        <li>
                            <Thermometer size={22} />
                            Temperatura atual: {weatherData.main.temp}°
                        </li>
                        <li>
                            <ThermometerHot size={22} />
                            Temperatura máxima: {weatherData.main.temp_max}°
                        </li>
                        <li>
                            <ThermometerCold size={22} />
                            Temperatura minima: {weatherData.main.temp_min}°
                        </li>
                        <li>
                            <Waves size={22} />
                            Sensação térmica: {weatherData.main.feels_like}°
                        </li>
                        <li>
                            <CaretDoubleDown size={22} />
                            Pressão: {weatherData.main.pressure} hpa
                        </li>
                        <li>
                            <Wind size={22} />
                            Velocidade do vento:{" "}
                            {convertMSToKmH(weatherData.wind.speed)} km/h
                        </li>
                        <li>
                            <Drop size={22} />
                            Umidade: {weatherData.main.humidity}%
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
