import { createContext, useCallback, useEffect, useState } from 'react';
import { IWeatherContext, IWeatherProvider } from './types';
import { getDevicePosition } from '../../utils';
import {
  fetchWeatherInformation,
  IOpenWeatherResponse,
} from '../../services/openWeather';

export const CurrentLocalWeatherInformationContext = createContext(
  {} as IWeatherContext,
);

export function CurrentLocalWeatherInformationProvider({
  children,
}: IWeatherProvider) {
  const [currentLocalWeatherInformation, setCurrentLocalWeatherInformation] =
    useState<IOpenWeatherResponse | null>(null);
  const [isDevicePositionFound, setIsDevicePositionFound] = useState(false);
  const fiveMinutesInMilliseconds = 300000;

  const handleFetchWeatherInformation = useCallback(async () => {
    const devicePosition = await getDevicePosition();

    if (devicePosition === null) {
      setIsDevicePositionFound(false);
      return;
    }

    setIsDevicePositionFound(true);

    try {
      const currentWeatherInformation = await fetchWeatherInformation({
        latitude: devicePosition.coords.latitude,
        longitude: devicePosition.coords.longitude,
      });
      setCurrentLocalWeatherInformation(currentWeatherInformation);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        return;
      }

      alert(String(error));
    }
  }, []);

  useEffect(() => {
    handleFetchWeatherInformation();
  }, [handleFetchWeatherInformation]);

  useEffect(() => {
    setInterval(() => handleFetchWeatherInformation, fiveMinutesInMilliseconds);
  }, [handleFetchWeatherInformation]);

  return (
    <CurrentLocalWeatherInformationContext.Provider
      value={{
        weatherData: currentLocalWeatherInformation,
        isGeolocationFound: isDevicePositionFound,
      }}
    >
      {children}
    </CurrentLocalWeatherInformationContext.Provider>
  );
}
