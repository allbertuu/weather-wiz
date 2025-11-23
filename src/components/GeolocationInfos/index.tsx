import { useEffect, useState } from 'react';
import { formatHour } from '../../utils';
import styles from './styles.module.scss';

const GeolocationInfos = ({ placeName }: { placeName?: string }) => {
  // Formato: HH:MM
  const defaultHour = formatHour(new Date().getTime() / 1000);
  const [currentHour, setCurrentHour] = useState<string>(defaultHour);

  const local = placeName || 'algum lugar agradável';

  const FIFTEEN_SECONDS_IN_MILLISECONDS = 15000;

  const updateHour = () => {
    setCurrentHour(formatHour(new Date().getTime() / 1000));
  };

  useEffect(() => {
    const intervalId = setInterval(updateHour, FIFTEEN_SECONDS_IN_MILLISECONDS);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <p className={styles.container}>
      Você está em <strong>{local}</strong>, e são{' '}
      <time className={styles.hour}>{currentHour}</time>
    </p>
  );
};

export default GeolocationInfos;
