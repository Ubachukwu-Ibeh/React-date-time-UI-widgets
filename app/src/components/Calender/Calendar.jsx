import React, { useState } from 'react';
import styles from './calendar-styles/Calendar.module.scss';
import Day from './Day';
import {
    today,
    calendar,
    currentMonth,
    year,
    defaultDate,
    setToToday
} from "../../utils/calendarDefaults.js";

const Calendar = () => {
    let [monthData, setMonthData] = useState(calendar.getStructure()),
        [day, setDay] = useState(undefined),
        [isSetToToday, setIsSetToToday] = useState(false);

    const defaultDay = () => {
        setMonthData(() => ({ ...defaultDate }));
        setDay(() => ({ ...setToToday(defaultDate, today) }));
        setIsSetToToday(prev => !prev);
    }
    const switchMonth = (str) => {
        setMonthData(prev => ({ ...prev.moveMonth(str).getStructure() }));
        setDay(() => {
            const res = setToToday(monthData, day && !isSetToToday ? day.dayNumber : today);
            return res ? { ...res } : { ...setToToday(monthData, 1) };//default to day 1 if day is not available in next month;
        })
        // setIsSetToToday(prev => !prev);
    }
    const setDayData = {
        setDay: setDay,
        monthData: monthData,
        setToToday: setToToday,
        dayNumber: day && day.dayNumber,
        setIsSetToToday: setIsSetToToday
    }
    return (
        <div className={styles.main}>
            <p
                className={`${styles.today} ${isSetToToday ? styles.isSetToToday : ''}`}
                onClick={defaultDay}
            >
                {isSetToToday ? 'Today' : 'Today?'}
            </p>
            <div
                className={`${styles.card}`}
                style={{ marginBottom: day && '0px' }}
            >
                <div className={styles.monthYear}>
                    <div onClick={() => switchMonth('backward')}></div>
                    <p>{day ? day.monthOfYear : currentMonth}<span> {day ? day.year : year}</span></p>
                    <div onClick={() => switchMonth('forward')}></div>
                </div>
                <div className={styles.daysCont}>
                    {
                        Object.keys(monthData.structure).map((e, i) =>
                            <div
                                key={i}
                                className={styles.weekCont}
                            >
                                <p
                                    key={`week${i}`}
                                    className={styles.dayOfWeek}
                                >
                                    {e}
                                </p>
                                {
                                    monthData.structure[e].map((a, i) =>
                                        <Day
                                            key={`day${i}`}
                                            id={a}
                                            setDayData={setDayData}
                                        />)
                                }
                            </div>)
                    }
                </div>
            </div>
            {
                day &&
                <p
                    className={`${styles.finalDate}`}
                >
                    {day.dayOfWeek} <span>{`${day.dayNumber}${day.suffix}`}</span> {day.monthOfYear}<span> {day.year}</span>
                </p>
            }
        </div>
    )
}
export default React.memo(Calendar);