import moment from "moment";

let body = document.body;

function translateDayOfTheWeek(dayOfTheWeek = "") {
    switch (dayOfTheWeek) {
        case "Sunday":
            return "Domingo";
        case "Monday":
            return "Segunda";
        case "Tuesday":
            return "Terça";
        case "Wednesday":
            return "Quarta";
        case "Thursday":
            return "Quinta";
        case "Friday":
            return "Sexta";
        case "Saturday":
            return "Sábado";
        default:
            return "Don't have found any day to translate";
    }
}

const translatedDayOfWeek = translateDayOfTheWeek(moment().format("dddd"));

export const currentTime = moment().format("LT");
export const dayOfTheWeekABBR = translatedDayOfWeek.slice(0, 3);
export const dayOfTheWeek = translatedDayOfWeek;

function getTimeFormatAM_PM() {
    let lastIndex = currentTime[currentTime.length - 1];
    let penultimateIndex = currentTime[currentTime.length - 2];
    return penultimateIndex + lastIndex;
}

function getHour() {
    let arrTime = currentTime.split(":");
    let extractedHour = arrTime[0];
    return extractedHour;
}

export function handleBodyStyles() {
    let hour = getHour();
    let timeFormat = getTimeFormatAM_PM();

    if (timeFormat === "PM") {
        if (hour >= "6") {
            body.className = "night";
        }
    } else if (timeFormat === "AM") {
        if (hour < "6") {
            body.className = "night";
        } else if (hour >= "6") {
            body.classList.remove("night");
        }
    }
}
