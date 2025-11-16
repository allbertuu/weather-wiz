import { useEffect, useState } from 'react';
import { formatHour } from '../../utils';
import styles from './styles.module.scss';
import { useWeather } from '../../hooks';

const GeolocationInfos: React.FC<unknown> = () => {
  const { weatherData } = useWeather();
  const [currentHour, setCurrentHour] = useState<string>(
    formatHour(new Date().getTime() / 1000),
  );
  const weatherDataUnknown = weatherData === null;

  const FIFTEEN_SECONDS_IN_MILLISECONDS = 15000;
  const localName = weatherData?.name;

  const updateHour = () => {
    setCurrentHour(formatHour(new Date().getTime() / 1000));
  };

  useEffect(() => {
    const intervalId = setInterval(updateHour, FIFTEEN_SECONDS_IN_MILLISECONDS);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (weatherDataUnknown) {
    return (
      <p className={styles.container}>
        {/* TODO: É possível obter a localização pelo Google Maps API, passando as
          coordenadas.
          https://developers.google.com/maps/documentation/geocoding/?hl=pt_BR#comecar
         */}
        Você está em <strong>algum lugar agradável</strong>, e são{' '}
        <time className={styles.hour}>{currentHour}</time>
      </p>
    );
  }

  return (
    <p className={styles.container}>
      Você está em <strong>{localName}</strong>, e são{' '}
      <time className={styles.hour}>{currentHour}</time>
    </p>
  );
};

export default GeolocationInfos;
