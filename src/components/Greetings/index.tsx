import { CloudMoon, Moon, CloudSun, Sun, Cloud } from 'phosphor-react';
import styles from './styles.module.scss';

type dayPeriods = { name: string; title: string; icon: JSX.Element }[];

const Greetings = ({ currentDayPeriod }: { currentDayPeriod: string }) => {
  const dayPeriods: dayPeriods = [
    { name: 'noite', title: 'Boa noite', icon: <CloudMoon /> },
    { name: 'madrugada', title: 'Boa madrugada', icon: <Moon /> },
    { name: 'manhã', title: 'Bom dia', icon: <CloudSun /> },
    { name: 'tarde', title: 'Boa tarde', icon: <Sun /> },
  ];

  const currentPeriod = dayPeriods.find((period) =>
    currentDayPeriod.toLowerCase().includes(period.name),
  );

  const isCurrentPeriodUnknown = currentPeriod === undefined;

  if (isCurrentPeriodUnknown) {
    return (
      <div className={styles.container}>
        <h1>Bem-vindo(a)</h1>
        <Cloud />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{currentPeriod.title}</h1>
      {currentPeriod.icon}
    </div>
  );
};

export default Greetings;
