import { useState, useEffect } from 'react';
import axios from 'axios';
// icons 
import { CloudIcon, WaterIcon, ThermostatIcon, ArrowUpIcon, ArrowDownIcon, DoubleArrowDownIcon } from './assets/icons';
// styles
import './App.css';

function App() {

  const [location, setLocation] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  const [weatherData, setWeatherData] = useState(null);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeatherData(res.data);
  }

  if (location === false) {
    return (
      <h3>Você precisa habilitar <br />a localização no browser o/</h3>
    )
  }
  else if (!weatherData) {
    return (
      <h2>Carregando o clima...</h2>
    )
  }
  else {
    return (
      <div className='container'>
        <div className="header">
          <div className="title">
            <h1>Seu clima</h1>
            <CloudIcon fontSize="large" />
          </div>
          <small>Localização: <i>{weatherData['name']}</i></small>
        </div>
        <div className='card'>
          <h2>{weatherData['weather'][0]['description']}</h2>
          <ul>
            <li><ThermostatIcon fontSize='inherit' />Temperatura atual: {weatherData['main']['temp']}°</li>
            <li><ArrowUpIcon fontSize='inherit' />Temperatura máxima: {weatherData['main']['temp_max']}°</li>
            <li><ArrowDownIcon fontSize='inherit' />Temperatura minima: {weatherData['main']['temp_min']}°</li>
            <li><DoubleArrowDownIcon fontSize='inherit' />Pressão: {weatherData['main']['pressure']} hpa</li>
            <li><WaterIcon fontSize='inherit' />Umidade: {weatherData['main']['humidity']}%</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default App;