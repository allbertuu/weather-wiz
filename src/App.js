import { useState, useEffect } from 'react';
import axios from 'axios';
// icons 
import CloudIcon from '@mui/icons-material/Cloud';
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
      <h1>Você precisa habilitar a localização no browser o/</h1>
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
            <li>Temperatura atual: {weatherData['main']['temp']}°</li>
            <li>Temperatura máxima: {weatherData['main']['temp_max']}°</li>
            <li>Temperatura minima: {weatherData['main']['temp_min']}°</li>
            <li>Pressão: {weatherData['main']['pressure']} hpa</li>
            <li>Umidade: {weatherData['main']['humidity']}%</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default App;