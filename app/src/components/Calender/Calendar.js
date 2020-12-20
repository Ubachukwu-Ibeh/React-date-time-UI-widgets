import React, {useState} from 'react';
import styles from './calendar-styles/Calendar.module.css';
import Day from './Day.js';

const date = new Date(),
    getDay = date.getDay(),
    day = date.getUTCDate() - getDay;

function Calendar() {

    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months30 = ['September', 'April', 'June', 'November'];
    
    let [month, setMonth] = useState(date.getMonth()),
    
    [year, setYear] = useState(date.getFullYear());
    
    const getMonthLength = (month) => {
        switch(true){
            case months30.includes(months[month]):
                return 30;
            case month === 1:
                return !(year % 4) ? 29 : 28;
            default:
                return 31;
        }
    };
    let [staringDay, setStartingDay] = useState(1 - ((7 * Math.floor((1 - day) / 7)) + day));

    const currentMonthLength = getMonthLength(month);

    const switchMonth = (direction) => {
        let currentMonth, prevMonth;
        const dir = direction === 'forward' ? 1 : -1;
        setMonth(prev => {
            const next = prev + dir;
            prevMonth = prev;
           return currentMonth = (next < 0 ? 11 : next) % 12;
        });
        setStartingDay(()=>{
            const monthEndDay = staringDay - 1;
            const res = getMonthLength(month === 0 ? 11 : month - 1) - (monthEndDay < 0 ? 6 : monthEndDay);
            return dir > 0 
            ? ((currentMonthLength - (((7 * Math.floor(currentMonthLength / 7)) - staringDay) + 1)) + 1) % 7
            : 1 - ((7 * Math.floor((1 - res) / 7)) + res)
        });
        setYear(prev => {
          return (prevMonth === 11 && currentMonth === 0) || (prevMonth === 0 && currentMonth === 11) ? prev + dir : prev;
        });
    }

    
    const monthArr = Array(currentMonthLength + staringDay).fill(0);

    for(let i = staringDay; i < monthArr.length; i++){
        monthArr[i] = i - (staringDay - 1);
    }
    
    const [daysObject, setDaysObject] = useState((()=>{
        const obj = {};
        for(let i = 0; i < monthArr.length; i++){
            obj[i] = false;   
        }
        return obj;
    })());
    const [dayOfWeek, setDayOfWeek] = useState({});

    
    const digits = [];
    let monthLimit = 0,
    week = 0;
    while(week < 7){
        monthLimit = 0;
        digits[week] = [];
        while(monthArr[monthLimit + week] < currentMonthLength + 1){
            digits[week].push(
            <Day 
                key={monthLimit + week}
                data={
                    {
                        daysObject: daysObject, 
                        setDaysObject: setDaysObject, 
                        id: monthArr[monthLimit + week],
                        setDayOfWeek: setDayOfWeek,
                    }
                }
             />
            );
            monthLimit += 7;
        }
        week++;
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
                <span onClick={()=>switchMonth('backward')} style={{marginLeft: '0px'}}>{'< '}</span>{months[month]}<span> {year}</span><span onClick={()=>switchMonth('forward')}>{' >'}</span>
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
        className={`${styles.finalDate}`} 
        style={
            {
                opacity: !dayOfWeek.prefix ? 0 : 1
            }
        }
        >
            {daysOfWeek[monthArr.indexOf(dayOfWeek.dayNum) % 7]} <span>{`${dayOfWeek.dayNum}${dayOfWeek.prefix}`}</span> {months[month]}<span> {year}</span>
        </p>
    </>
    )
}
export default React.memo(Calendar);