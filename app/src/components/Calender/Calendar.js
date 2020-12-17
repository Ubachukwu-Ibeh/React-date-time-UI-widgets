import React, {useState} from 'react';
import styles from './calendar-styles/Calendar.module.css';
import Day from './Day.js';


function Calendar() {
    /** */
    const date = new Date();
    let [month, setMonth] = useState(date.getMonth()),
    getDay = date.getDay(),
    day = date.getUTCDate() - getDay,
    [year, setYear] = useState(date.getFullYear()),
    months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months30 = ['September', 'April', 'June', 'November'],
    monthLength = (() => {
        switch(true){
            case months30.includes(months[month]):
                return 30;
            case month === 1:
                return !(year % 4) ? 29 : 28;
            default:
                return 31;
        }
    })(),
    [staringDay, setStartingDay] = useState(1 - ((7 * Math.floor((1 - day) / 7)) + day));

    const switchMonth = (direction) => {
        // setDaysObject(prev => {
        //     const prevObj = {...prev};
        //     for (const key in prevObj) {
        //         prevObj[key] && (prevObj[key] = false);
        //     }
        //     return prevObj;
        // });
        // setDayOfWeek({});
        let currentMonth, prevMonth;
        const dir = direction === 'forward' ? 1 : -1;
        setMonth(prev => {
            const next = prev + dir;
            prevMonth = prev;
           return currentMonth = (next < 0 ? 11 : next) % 12;
        });
        setStartingDay(((monthLength - (((7 * Math.floor(monthLength / 7)) - staringDay) + 1)) + 1) % 7);
        setYear(prev => {
          return (prevMonth === 11 && currentMonth === 0) || (prevMonth === 0 && currentMonth === 11) ? prev + dir : prev;
        });
        
    }
    const monthArr = Array(monthLength + staringDay).fill(0);

    for(let i = staringDay; i < monthArr.length; i++){
        monthArr[i] = i - (staringDay - 1);
    }
    /** */

    
    const [daysObject, setDaysObject] = useState((()=>{
        const obj = {};
        for(let i = 0; i < monthArr.length; i++){
            obj[i] = false;   
        }
        return obj;
    })());
    const [dayOfWeek, setDayOfWeek] = useState({});

    // const [selectedMonth, setSelectedMonth] = useState(month);
    
    const digits = [];
    let limit = 0,
    weeks = 0;
    while(weeks < 7){
        limit = 0;
        digits[weeks] = [];
        while(monthArr[limit + weeks] < monthLength + 1){
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
                        mark: staringDay
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
                <span onClick={()=>switchMonth('backward')}>{'< '}</span>{months[month]}<span> {year}</span><span onClick={()=>switchMonth('forward')}>{' >'}</span>
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