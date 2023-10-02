import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const useWeather = () => useContext(WeatherContext);

export default useWeather;
