import React, {useState} from 'react';
import styles from './calendar-styles/calendar.module.css';
import Day from './Day.js';

const date = new Date(),
month = date.getMonth(),
getDay = date.getDay(),
day = date.getUTCDate() - getDay,
today = 1 - ((7 * Math.floor((1 - day) / 7)) + day),
year = date.getFullYear(),
months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
    const [daysObject, setDaysObject] = useState((()=>{
        const obj = {};
        for(let i = 0; i < 42; i++){
            obj[i] = false;   
        }
        return obj;
    })());
    const [dayOfWeek, setDayOfWeek] = useState({});
    return (
        <>
        <div 
        className={`${styles.card} ${dayOfWeek && styles.removeBottomMargin}`}
        >
            <p 
            className={styles.monthYear}
            >
                {'< '}{months[month]}<span> {year}</span>{' >'}
            </p>
            <p>
                {
                    daysOfWeek.map((e, i) => <span key={i} className={styles.dayOfWeek}>{e}</span>)
                }
            </p>
            <div 
            className={styles.daysCont}
            >
            {
                Object.keys(daysObject).map((e, i) => 
                <Day 
                key={i} 
                data={
                   {
                       daysObject: daysObject, 
                       setDaysObject: setDaysObject, 
                       id:(()=>{
                        if(i >= today){
                            return i - (today - 1);
                        }
                       })(),
                       setDayOfWeek: setDayOfWeek,
                       dayOfWeek: daysOfWeek[i % 7],
                       mark: today
                   }
               }
               />
               )
            }
            </div>
        </div>
        <p 
        className={`${styles.monthYear} ${styles.finalDate}`} 
        style={
            {
                opacity: !dayOfWeek.prefix ? 0 : 1
            }
        }
        >
            {dayOfWeek.dayOfWeek} <span>{`${dayOfWeek.dayNum}${dayOfWeek.prefix}`}</span> {months[month - 1]}<span> {year}</span>
        </p>
        </>
    )
}
