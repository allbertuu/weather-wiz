import { CloudMoon, Moon, CloudSun, Sun } from "phosphor-react";
import { flexibleDayPeriod } from "../../utils";
import styles from "./styles.module.scss";

const Greetings: React.FC<any> = () => {
    return (
        <div className={styles.container}>
            {flexibleDayPeriod.includes("noite") && (
                <>
                    <h1>Boa noite</h1>
                    <CloudMoon />
                </>
            )}
            {flexibleDayPeriod.includes("madrugada") && (
                <>
                    <h1>Boa madrugada</h1>
                    <Moon />
                </>
            )}
            {flexibleDayPeriod.includes("manhã") && (
                <>
                    <h1>Bom dia</h1>
                    <CloudSun />
                </>
            )}
            {flexibleDayPeriod.includes("tarde") && (
                <>
                    <h1>Boa tarde</h1>
                    <Sun />
                </>
            )}
        </div>
    );
};

export default Greetings;
