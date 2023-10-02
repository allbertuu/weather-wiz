import { useEffect } from "react";
import { handlePeriodOfTheDayBodyStyle } from "./utils";
import "./styles/App.scss";
import {
    GeolocationInfos,
    Greetings,
    Spinner,
    SupportCreator,
    WeatherCard,
} from "./components";
import { useWeather } from "./hooks";

function App() {
    const { weatherData, isGeolocationFound } = useWeather();

    useEffect(() => {
        handlePeriodOfTheDayBodyStyle();
    }, []);

    if (!isGeolocationFound) {
        return (
            <div className="container">
                <h3>
                    Você precisa habilitar <br />a localização no browser :)
                </h3>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className="container">
                <h2>Observando o céu...</h2>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container">
            <SupportCreator />

            <header className="header">
                <Greetings />

                <GeolocationInfos localName={weatherData.name} />
            </header>

            <WeatherCard />
        </div>
    );
}

export default App;
