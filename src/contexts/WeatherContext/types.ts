import { IOpenWeatherResponse } from '../../services/openWeather';

export interface IWeatherProvider {
  children: React.ReactNode;
}
export interface IWeatherContext {
  weatherData: IOpenWeatherResponse | null;
  isGeolocationFound: boolean;
}
