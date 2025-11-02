import { createContext, useCallback, useEffect, useState } from 'react';
import {
  IOpenWeatherResponse,
  IWeatherContext,
  IWeatherProvider,
} from './types';
import { openWeatherAPI } from '../../services/api';
import { getDevicePosition } from '../../utils';

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

  interface IDevicePosition {
    latitude: number;
    longitude: number;
  }

  const getCurrentLocalWeatherInformationByDevicePosition = async ({
    latitude,
    longitude,
  }: IDevicePosition) => {
    const res = await openWeatherAPI.get('/', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });

    return res.data as IOpenWeatherResponse;
  };

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
