import axios, { AxiosError } from 'axios';

interface IOpenWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type IOpenWeatherResponse = IOpenWeatherData;

interface IDevicePosition {
  latitude: number;
  longitude: number;
}

export const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    appid: import.meta.env.VITE_OPEN_WEATHER_KEY,
    lang: 'pt',
    units: 'metric',
  },
});

export const fetchWeatherInformation = async ({
  latitude,
  longitude,
}: IDevicePosition) => {
  try {
    const res = await api.get('/', {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });

    const weatherInformation = res.data as IOpenWeatherResponse;
    return weatherInformation;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `Erro ao buscar dados de clima: ${error.response.data.message}`,
        );
      }

      throw new Error(`Erro ao buscar dados de clima: ${error.message}`);
    }

    if (error instanceof Error) {
      throw new Error(
        `Erro desconhecido ao buscar dados de clima: ${error.message}`,
      );
    }

    throw new Error(
      `Erro desconhecido ao buscar dados de clima: ${String(error)}`,
    );
  }
};
