import { useEffect } from 'react';
import {
  GeolocationInfos,
  Greetings,
  Spinner,
  SupportCreator,
  WeatherCard,
} from './components';
import { useWeather } from './hooks';
import './styles/App.scss';
import { flexibleDayPeriod, handlePeriodOfTheDayBodyStyle } from './utils';

function App() {
  const { isGeolocationFound, isLoadingWeatherInformation, weatherData } =
    useWeather();
  const isDevicePositionUnknown = isGeolocationFound === false;

  useEffect(() => {
    handlePeriodOfTheDayBodyStyle();
  }, []);

  if (isDevicePositionUnknown) {
    return (
      <div className="container">
        <h3>
          Você precisa habilitar <br />a localização no browser :)
        </h3>
      </div>
    );
  }

  if (isLoadingWeatherInformation) {
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
        <Greetings currentDayPeriod={flexibleDayPeriod} />

        {weatherData ? (
          <GeolocationInfos placeName={weatherData.name} />
        ) : (
          <GeolocationInfos />
        )}
      </header>

      <WeatherCard weatherData={weatherData} />
    </div>
  );
}

export default App;
