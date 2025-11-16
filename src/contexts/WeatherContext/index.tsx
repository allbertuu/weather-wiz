import { createContext, useCallback, useEffect, useState } from 'react';
import {
  fetchWeatherInformation,
  IOpenWeatherResponse,
} from '../../services/openWeather';
import { getDevicePosition } from '../../utils';

export interface IWeatherProvider {
  children: React.ReactNode;
}
export interface IWeatherContext {
  weatherData: IOpenWeatherResponse | null;
  isGeolocationFound: boolean;
  isLoadingWeatherInformation: boolean;
}

export const CurrentLocalWeatherInformationContext = createContext(
  {} as IWeatherContext,
);

export function CurrentLocalWeatherInformationProvider({
  children,
}: IWeatherProvider) {
  const [currentLocalWeatherInformation, setCurrentLocalWeatherInformation] =
    useState<IOpenWeatherResponse | null>(null);
  const [isDevicePositionFound, setIsDevicePositionFound] = useState(false);
  const [isLoadingWeatherInformation, setIsLoadingWeatherInformation] =
    useState(true);
  const fiveMinutesInMilliseconds = 300000;

  const handleGetDevicePosition = async () => {
    try {
      const devicePosition = await getDevicePosition();
      return devicePosition;
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        alert(
          error.code === 1 // permission denied
            ? 'Permissão de localização negada. Habilite a localização para obter dados meteorológicos.'
            : `Erro ao obter localização: ${error.message}`,
        );
        return;
      }

      alert(`Erro ao obter localização: ${String(error)}`);
    }
  };

  const handleFetchWeatherInformation = async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      const currentWeatherInformation = await fetchWeatherInformation({
        latitude,
        longitude,
      });
      return currentWeatherInformation;
    } catch (error) {
      if (error instanceof Error) {
        alert(`Erro ao buscar dados de clima: ${error.message}`);
        return;
      }

      alert(`Erro ao buscar dados de clima: ${String(error)}`);
    }
  };

  const getWeatherInformation = useCallback(async () => {
    const devicePosition = await handleGetDevicePosition();
    const isDevicePositionUnknown = devicePosition === undefined;

    if (isDevicePositionUnknown) {
      setIsDevicePositionFound(false);
      return;
    }

    setIsDevicePositionFound(true);

    const currentWeatherInformation = await handleFetchWeatherInformation({
      latitude: devicePosition.coords.latitude,
      longitude: devicePosition.coords.longitude,
    });

    if (currentWeatherInformation) {
      setCurrentLocalWeatherInformation(currentWeatherInformation);
    }

    // Set loading to false after data is fetched
    setIsLoadingWeatherInformation(false);
  }, []);

  useEffect(() => {
    getWeatherInformation();
  }, [getWeatherInformation]);

  useEffect(() => {
    setInterval(() => getWeatherInformation, fiveMinutesInMilliseconds);
  }, [getWeatherInformation]);

  return (
    <CurrentLocalWeatherInformationContext.Provider
      value={{
        weatherData: currentLocalWeatherInformation,
        isGeolocationFound: isDevicePositionFound,
        isLoadingWeatherInformation,
      }}
    >
      {children}
    </CurrentLocalWeatherInformationContext.Provider>
  );
}
