import {
  Thermometer,
  Waves,
  CaretDoubleDown,
  Wind,
  Cloud,
  Drop,
  SunHorizon,
} from 'phosphor-react';
import {
  convertMetersPerSecondToKilometersPerHour,
  formatHour,
} from '../../utils';
import './styles.scss';
import { IOpenWeatherResponse } from '../../services/openWeather';

const WeatherCard = ({
  weatherData,
}: {
  weatherData: IOpenWeatherResponse | null;
}) => {
  const isCurrentWeatherInformationEmpty = weatherData === null;

  if (isCurrentWeatherInformationEmpty) {
    return (
      <div className="weather-card">
        Houve um problema ao buscar os dados de clima para sua localização.
      </div>
    );
  }

  const windSpeed = convertMetersPerSecondToKilometersPerHour(
    weatherData.wind.speed,
  );
  const sunriseHour = formatHour(weatherData.sys.sunrise);
  const sunsetHour = formatHour(weatherData.sys.sunset);
  const lastUpdateDate = new Date(weatherData.dt * 1000);
  const formattedLastUpdate = `
    ${lastUpdateDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    })} às 
    ${lastUpdateDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

  return (
    <div className="weather-card">
      <h2>{weatherData.weather[0].description}</h2>
      <p>Última atualização dos dados em: {formattedLastUpdate}</p>
      <ul>
        <li>
          <Thermometer size={22} />
          <div>
            <strong>Temperatura atual:</strong> {weatherData.main.temp}°
          </div>
        </li>
        <li>
          <Waves size={22} />
          <div>
            <strong>Sensação térmica:</strong> {weatherData.main.feels_like}°
          </div>
        </li>
        <li>
          <CaretDoubleDown size={22} />
          <div>
            <strong>Pressão:</strong> {weatherData.main.pressure} hpa
          </div>
        </li>
        <li>
          <Wind size={22} />
          <div>
            <strong>Velocidade do vento:</strong> {windSpeed} km/h
          </div>
        </li>
        <li>
          <Cloud size={22} />
          <div>
            <strong>Nº de nuvens:</strong> {weatherData.clouds.all}
          </div>
        </li>
        <li>
          <Drop size={22} />
          <div>
            <strong>Umidade:</strong> {weatherData.main.humidity}%
          </div>
        </li>
        <li>
          <SunHorizon size={22} />
          <div>
            <strong>Nascer do sol:</strong> {sunriseHour}
          </div>
        </li>
        <li>
          <SunHorizon size={22} />
          <div>
            <strong>Pôr do sol:</strong> {sunsetHour}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default WeatherCard;
