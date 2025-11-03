import { createContext, useCallback, useEffect, useState } from 'react';
import { IWeatherContext, IWeatherProvider } from './types';
import { getDevicePosition } from '../../utils';
import {
  getCurrentLocalWeatherInformationByDevicePosition,
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

  const fetchCurrentLocalWeatherInformationByDevicePosition =
    useCallback(async () => {
      const devicePosition = await getDevicePosition();

      if (devicePosition === null) {
        setIsDevicePositionFound(false);
        return;
      }

      setIsDevicePositionFound(true);

      const currentWeatherInformation =
        await getCurrentLocalWeatherInformationByDevicePosition({
          latitude: devicePosition.coords.latitude,
          longitude: devicePosition.coords.longitude,
        });

      setCurrentLocalWeatherInformation(currentWeatherInformation);
    }, []);

  useEffect(() => {
    fetchCurrentLocalWeatherInformationByDevicePosition();
  }, [fetchCurrentLocalWeatherInformationByDevicePosition]);

  useEffect(() => {
    setInterval(
      () => fetchCurrentLocalWeatherInformationByDevicePosition,
      fiveMinutesInMilliseconds,
    );
  }, [fetchCurrentLocalWeatherInformationByDevicePosition]);

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
