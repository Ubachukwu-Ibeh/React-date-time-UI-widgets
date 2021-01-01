import Calenda from './calenda.js';

export const date = new Date(),
    today = date.getUTCDate(),
    year = date.getFullYear(),
    currentMonth = date.toLocaleString('default', {
        month: 'long'
    }),
calendar = new Calenda({
    month: currentMonth
}),
defaultDate = new Calenda({month: currentMonth}).getStructure(),
setToToday = (param, day) => param.getInfo(day, {
    dayNumber: true,
    suffix: true,
    dayOfWeek: true,
    monthOfYear: true,
    year: true
})