import { createContext, useCallback, useEffect, useState } from 'react';
import {
  IOpenWeatherResponse,
  IWeatherContext,
  IWeatherProvider,
} from './types';
import { openWeatherAPI } from '../../services/api';

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

  const getCurrentLocalWeatherInformationByDevicePosition = async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    return await openWeatherAPI.get('/', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
  };

  const fetchCurrentLocalWeatherInformationByDevicePosition =
    useCallback(() => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setIsDevicePositionFound(true);

          const res = await getCurrentLocalWeatherInformationByDevicePosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          setCurrentLocalWeatherInformation(res.data);
        },
        null,
        { enableHighAccuracy: true },
      );
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
