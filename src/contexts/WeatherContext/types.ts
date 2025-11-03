import { IOpenWeatherResponse } from '../../services/openWeather';

export interface IWeatherProvider {
  children: React.ReactNode;
}

export type TWeatherData = IOpenWeatherResponse | null;

export interface IWeatherContext {
  weatherData: TWeatherData;
  isGeolocationFound: boolean;
  setIsGeolocationFound?: React.Dispatch<React.SetStateAction<boolean>>;
  setWeatherData?: React.Dispatch<React.SetStateAction<TWeatherData>>;
}
