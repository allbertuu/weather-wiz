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

  const [weather, setWeather] = useState(null);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  if (location === false) {
    return (
      <h1>Você precisa habilitar a localização no browser o/</h1>
    )
  }
  else if (!weather) {
    return (
      <h2>Carregando o clima...</h2>
    )
  }
  else {
    return (
      <div className='container'>
        <div className="title">
          <h1>Seu clima</h1>
          <CloudIcon fontSize="large" />
        </div>
        <div className='card'>
          <h2>{weather['weather'][0]['description']}</h2>
          <ul>
            <li>Temperatura atual: {weather['main']['temp']}°</li>
            <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li>Temperatura minima: {weather['main']['temp_min']}°</li>
            <li>Pressão: {weather['main']['pressure']} hpa</li>
            <li>Umidade: {weather['main']['humidity']}%</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default App;
