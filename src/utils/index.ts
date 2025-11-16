import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

export const flexibleDayPeriod = format(new Date(), 'BBBB', { locale: pt });

export const convertMetersPerSecondToKilometersPerHour = (
  metersBySec: number,
) => Math.round(metersBySec * 3.6);

export const getDevicePosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (positionErr) => {
        reject(positionErr);
      },
      { enableHighAccuracy: true },
    );
  });
};

/**
 *  Format hour in pt-BR with day period. E.g: '14:00 da tarde'
 */
export const formatHour = (timestampInSeconds: number) => {
  const timestampInMilliseconds = timestampInSeconds * 1000;
  const hour = format(new Date(timestampInMilliseconds), 'p', {
    locale: pt,
  });
  const dayPeriod = format(new Date(timestampInMilliseconds), 'BBBB', {
    locale: pt,
  });
  return `${hour} ${dayPeriod}`;
};

export const handlePeriodOfTheDayBodyStyle = () => {
  const body = document.body;
  const isNight =
    flexibleDayPeriod.includes('noite') ||
    flexibleDayPeriod.includes('madrugada');

  if (isNight) {
    body.className = 'night';
  } else {
    body.classList.remove('night');
  }
};
