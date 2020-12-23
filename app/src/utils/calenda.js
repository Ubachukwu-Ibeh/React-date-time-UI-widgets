"use strict";
const date = new Date(),
    dayWeekNum = date.getDay(),
    today = date.getUTCDate(),
    defMonth = date.getMonth(),
    defYear = date.getFullYear(),
    months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months30 = ['September', 'April', 'June', 'November'],
    getMonthLength = month => {
        switch (true) {
            case months30.includes(months[month]):
                return 30;
            case month === 1:
                return !(defYear % 4) ? 29 : 28;
            default:
                return 31;
        }
    },
    getStartingDay = (dayWeekNum, dayNum) => ((7 + dayWeekNum) - (dayNum - (7 * Math.floor(dayNum / 7)) - 1)) % 7;

let startingDay = getStartingDay(dayWeekNum, today);

class Calendar {
    constructor({
        month,
        year
    }) {
        
        this.monthIdx = months.indexOf(month);
        this.year = year;
        this.structure = {};
        this.info = {};

        this.getStructure = () => {
            let currentMonthLength = getMonthLength(this.monthIdx);
            const monthArr = Array(currentMonthLength + startingDay).fill(0);

            for (let i = startingDay; i < monthArr.length; i++) {
                monthArr[i] = i - (startingDay - 1);
            }
            let monthLimit = 0,
                week = 0
            while (week < 7) {
                monthLimit = 0;
                this.structure[daysOfWeek[week]] = [];

                while (monthArr[monthLimit + week] < currentMonthLength + 1) {
                    this.structure[daysOfWeek[week]].push(monthArr[monthLimit + week]);
                    monthLimit += 7;
                }
                week++;
            }
            return this;

        }
        return this;
    }
    getInfo = (day, options) => {
        for (const key in this.structure) {
            let daysArr = this.structure[key];
            for (let i = 0; i < daysArr.length; i++) {
                if (daysArr[i] === day) {
                    Object.keys(options).forEach(e => options[e] && (() => {
                        switch (e) {
                            case 'dayName':
                                return this.info[e] = key;
                            case 'monthName':
                                return this.info[e] = months[this.monthIdx];
                            case 'year':
                                return this.info[e] = this.year;
                        }
                    })());
                    return this.info;
                }
            }
        }
    }
    moveMonth = direction => {
        let currentMonthLength = getMonthLength(this.monthIdx);
        return direction === 'forward' ?
            (() => {
                startingDay = ((currentMonthLength - (((7 * Math.floor(currentMonthLength / 7)) - startingDay) + 1)) + 1) % 7; //get what the dayweeknum of any other day will be from the starting day
                return this.getStructure({
                    month: months[(this.monthIdx += 1) % 12],
                    year: this.year
                })
            })() :
            direction === 'backward' && (() => {
                const monthEndDayNum = startingDay - 1,
                    monthIdx = this.monthIdx,
                    monthEndDay = getMonthLength((monthIdx - 1 < 0 ? 11 : monthIdx));

                startingDay = getStartingDay(monthEndDayNum, monthEndDay);

                return this.getStructure({
                    month: months[(this.monthIdx -= 1) % 11],
                    year: this.year
                });
            })()

    }
}
console.log(new Calendar({
    month: 'December',
    year: 2020
}).moveMonth('backward').moveMonth('backward').getStructure().structure)
// }).getInfo(1, {
//     dayName: true,
//     monthName: true,
//     year: true
// }).result)