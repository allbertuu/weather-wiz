import { format } from "date-fns";
import { pt } from "date-fns/locale";

const flexibleDayPeriod = format(new Date(), "BBBB", { locale: pt });

const convertMetersPerSecondToKilometersPerHour = (metersBySec: number) =>
    Math.round(metersBySec * 3.6);

/**
 *  Format hour in pt-BR with day period. E.g: '14:00 da tarde'
 */
const formatHour = (timestampInSeconds: number) => {
    const timestampInMilliseconds = timestampInSeconds * 1000;
    const hour = format(new Date(timestampInMilliseconds), "p", {
        locale: pt,
    });
    const dayPeriod = format(new Date(timestampInMilliseconds), "BBBB", {
        locale: pt,
    });
    return `${hour} ${dayPeriod}`;
};

const handlePeriodOfTheDayBodyStyle = () => {
    const body = document.body;

    if (
        flexibleDayPeriod.includes("noite") ||
        flexibleDayPeriod.includes("madrugada")
    ) {
        body.className = "night";
    } else {
        body.classList.remove("night");
    }
};

export {
    flexibleDayPeriod,
    convertMetersPerSecondToKilometersPerHour,
    formatHour,
    handlePeriodOfTheDayBodyStyle,
};
