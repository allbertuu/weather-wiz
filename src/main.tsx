import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { CurrentLocalWeatherInformationProvider } from './contexts/WeatherContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CurrentLocalWeatherInformationProvider>
      <App />
    </CurrentLocalWeatherInformationProvider>
  </React.StrictMode>,
);
