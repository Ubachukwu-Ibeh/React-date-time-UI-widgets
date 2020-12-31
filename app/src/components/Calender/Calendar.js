import React, { useState } from 'react';
import styles from './calendar-styles/Calendar.module.scss';
import Day from './Day.js';
import Calenda from "../../utils/calenda.js";

const date = new Date(),
    today = date.getUTCDate(),
    year = date.getFullYear(),
    currentMonth = date.toLocaleString('default', {
        month: 'long'
    });
const calendar = new Calenda({
    month: currentMonth
});
const setToToday = (param, day) => {
    // console.log(param)
    return param.getInfo(day, {
        dayNumber: true,
        suffix: true,
        dayOfWeek: true,
        monthOfYear: true,
        year: true
    })
}

const Calendar = () => {
    let [monthData, setMonthData] = useState(calendar.getStructure()),
        [day, setDay] = useState(undefined),
        [isSetToToday, setIsSetToToday] = useState(false);

    
    const defaultDay = () => {
        const defaultDate = new Calenda({month: currentMonth}).getStructure();
        setMonthData(prev => ({...prev, ...defaultDate}));
        setDay(prev  => ({...prev, ...setToToday(defaultDate, today)}));
        setIsSetToToday(prev => !prev);
    }
    
    const switchMonth = (str) => {
        setMonthData(prev => ({...prev, ...prev.moveMonth(str).getStructure()}));
        setDay(prev  => ({...prev, ...setToToday(monthData, day && !isSetToToday ? day.dayNumber : today)}))
    }

    const setDayData = {
        setDay: setDay,
        monthData: monthData,
        setToToday: setToToday
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
        style={{marginBottom: day && '0px'}}
        >
            <div className={styles.monthYear}>
                <div onClick={()=>switchMonth('backward')}></div>
                    <p>{day ? day.monthOfYear : currentMonth}<span> {day ? day.year : year}</span></p>
                <div onClick={()=>switchMonth('forward')}></div>
            </div>

            <div className={styles.daysCont}>
            {
                Object.keys(monthData.structure).map((e, i) => <div 
                key={i}
                className={styles.weekCont}
                >
                    <p 
                    key={`week${i}`} 
                    className={styles.dayOfWeek}>
                        {e}
                    </p>
                    {
                    monthData.structure[e].map(a => 
                    <Day 
                    key={`day${a}`} 
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