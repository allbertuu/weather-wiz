import { format } from "date-fns";
import { pt } from "date-fns/locale";

export const flexibleDayPeriod = format(new Date(), "BBBB", { locale: pt });
export const currentHour = format(new Date(), "p", { locale: pt });

export const convertMSToKmH = (metersBySec: number) =>
    Math.round(metersBySec * 3.6);

export const formatHour = (timestamp: number) =>
    `${format(new Date(timestamp * 1000), "p", { locale: pt })} ${format(
        new Date(timestamp * 1000),
        "BBBB",
        { locale: pt }
    )}`;

export const handlePeriodOfTheDayBodyStyle = () => {
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
