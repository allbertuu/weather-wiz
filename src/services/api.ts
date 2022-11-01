import axios from "axios";

export const openWeatherAPI = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/weather",
    params: {
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: "pt",
        units: "metric",
    },
});
