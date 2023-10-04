import { useContext } from 'react';
import { WeatherContext } from '../contexts/WeatherContext';

const useWeather = () => useContext(WeatherContext);

export default useWeather;
