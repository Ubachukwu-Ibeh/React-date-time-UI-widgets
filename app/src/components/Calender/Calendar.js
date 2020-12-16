import React, {useState} from 'react';
import styles from './calendar-styles/Calendar.module.css';
import Day from './Day.js';

const date = new Date(),
month = date.getMonth(),
getDay = date.getDay(),
day = date.getUTCDate() - getDay,
today = 1 - ((7 * Math.floor((1 - day) / 7)) + day),
year = date.getFullYear(),
months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
monthArr = Array(31 + today).fill(0);

for(let i = today; i < monthArr.length; i++){
     monthArr[i] = i - (today - 1);
}

function Calendar() {
    const [daysObject, setDaysObject] = useState((()=>{
        const obj = {};
        for(let i = 0; i < 42; i++){
            obj[i] = false;   
        }
        return obj;
    })());
    const [dayOfWeek, setDayOfWeek] = useState({});
    
    const digits = [];
    let limit = 0,
    weeks = 0;
    while(weeks < 7){
        limit = 0;
        digits[weeks] = [];
        while(limit < 31){
            digits[weeks].push(
            <Day 
                key={limit + weeks}
                data={
                    {
                        daysObject: daysObject, 
                        setDaysObject: setDaysObject, 
                        id: monthArr[limit + weeks],
                        setDayOfWeek: setDayOfWeek,
                        dayOfWeek: daysOfWeek[weeks],
                        mark: today
                    }
                }
             />
            );
            limit += 7;
        }
        weeks++;
        }
   
    return (
    <>
        <div 
        className={`${styles.card}`}
        style={
            {
                marginBottom: dayOfWeek && '0px'
            }
        }
        >
            <p 
            className={styles.monthYear}
            >
                {'< '}{months[month]}<span> {year}</span>{' >'}
            </p>
          
            <div 
            className={styles.daysCont}
            >
            {
                digits.map((e, i) => 
                <div 
                key={i}
                className={styles.weekCont}
                >
                    <p 
                    key={i} 
                    className={styles.dayOfWeek}>
                        {daysOfWeek[i]}
                    </p>
                    {e}
                </div>
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
            {dayOfWeek.dayOfWeek} <span>{`${dayOfWeek.dayNum}${dayOfWeek.prefix}`}</span> {months[month]}<span> {year}</span>
        </p>
    </>
    )
}
export default React.memo(Calendar);