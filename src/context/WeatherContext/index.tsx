import { createContext, useEffect, useState } from "react";
import { IWeatherContext, IWeatherProvider } from "./types";
import { openWeatherAPI } from "../../services/api";

export const WeatherContext = createContext({} as IWeatherContext);

export function WeatherProvider({ children }: IWeatherProvider) {
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [isGeolocationFound, setIsGeolocationFound] = useState(false);
    const FIVE_MINUTES_IN_MILLISECONDS = 300000;

    const getWeather = async (lat: number, long: number) => {
        const res = await openWeatherAPI.get("/", {
            params: {
                lat: lat,
                lon: long,
            },
        });
        return res;
    };

    const fetchWeatherByPosition = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                setIsGeolocationFound(true);
                const res = await getWeather(
                    position.coords.latitude,
                    position.coords.longitude
                );
                setWeatherData(res.data);
            },
            null,
            { enableHighAccuracy: true }
        );
    };

    useEffect(() => {
        fetchWeatherByPosition();
    }, []);

    useEffect(() => {
        setInterval(() => fetchWeatherByPosition, FIVE_MINUTES_IN_MILLISECONDS);
    }, []);

    return (
        <WeatherContext.Provider value={{ weatherData, isGeolocationFound }}>
            {children}
        </WeatherContext.Provider>
    );
}
