import { createContext, useCallback, useEffect, useState } from 'react';
import { IWeatherContext, IWeatherProvider, TWeatherData } from './types';
import { openWeatherAPI } from '../../services/api';

export const WeatherContext = createContext({} as IWeatherContext);

export function WeatherProvider({ children }: IWeatherProvider) {
  const [weatherData, setWeatherData] = useState<TWeatherData>({});
  const [isGeolocationFound, setIsGeolocationFound] = useState(false);
  const FIVE_MINUTES_IN_MILLISECONDS = 300000;

  const getWeather = async (lat: number, long: number) => {
    return await openWeatherAPI.get('/', {
      params: {
        lat,
        lon: long,
      },
    });
  };

  const fetchWeatherByPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setIsGeolocationFound(true);
        const res = await getWeather(
          position.coords.latitude,
          position.coords.longitude,
        );
        setWeatherData(res.data);
      },
      null,
      { enableHighAccuracy: true },
    );
  }, []);

  useEffect(() => {
    fetchWeatherByPosition();
  }, [fetchWeatherByPosition]);

  useEffect(() => {
    setInterval(() => fetchWeatherByPosition, FIVE_MINUTES_IN_MILLISECONDS);
  }, [fetchWeatherByPosition]);

  return (
    <WeatherContext.Provider value={{ weatherData, isGeolocationFound }}>
      {children}
    </WeatherContext.Provider>
  );
}
