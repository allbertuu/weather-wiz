import { useContext } from 'react';
import { CurrentLocalWeatherInformationContext } from '../contexts/WeatherContext';

const useWeather = () => useContext(CurrentLocalWeatherInformationContext);

export default useWeather;
