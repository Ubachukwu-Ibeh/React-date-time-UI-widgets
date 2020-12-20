import React, {useState, useMemo} from 'react';
import styles from './calendar-styles/Calendar.module.css';
import Day, {setDayOfWeekPrefix} from './Day.js';

const date = new Date(),
    getDay = date.getDay(),
    today = date.getUTCDate(),
    day = today - getDay,
    defMonth = date.getMonth(),
    defYear = date.getFullYear();

function Calendar() {
    const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months30 = ['September', 'April', 'June', 'November'];
    
    let [month, setMonth] = useState(defMonth),
    [year, setYear] = useState(defYear),
    [isSetToToday, setIsSetToToday] = useState(false);
    const [dayOfWeek, setDayOfWeek] = useState({});
    
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

    const defStartingDay = 1 - ((7 * Math.floor((1 - day) / 7)) + day)
    let [staringDay, setStartingDay] = useState(defStartingDay);

    const currentMonthLength = getMonthLength(month);

    const setToToday = () => {
        setIsSetToToday(true);
        setMonth(defMonth);
        setYear(defYear);
        setDayOfWeek({dayNum: today, prefix: setDayOfWeekPrefix(today)});
        setStartingDay(defStartingDay);
        setDaysObject(prev => {
            const prevObj = {...prev};
            for (const key in prevObj) {
                prevObj[key] && (prevObj[key] = false);
            }
            return ({...prevObj, [today]: !prevObj[today]});
        })
    }

    const switchMonth = (direction) => {
        setIsSetToToday(false);
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
    
    const monthArr = useMemo(() => {
        const monthArrSet = Array(currentMonthLength + staringDay).fill(0);

        for(let i = staringDay; i < monthArrSet.length; i++){
            monthArrSet[i] = i - (staringDay - 1);
        }
        return monthArrSet
    }, [currentMonthLength, staringDay])

    const [daysObject, setDaysObject] = useState((()=>{
        const obj = {};
        for(let i = 0; i < monthArr.length; i++){
            obj[i] = false;   
        }
        return obj;
    })());
   
    let digits = useMemo(()=>{
    let setDigits = [],
    monthLimit = 0,
    week = 0;
    while(week < 7){
        monthLimit = 0;
        setDigits[week] = [];
        while(monthArr[monthLimit + week] < currentMonthLength + 1){
            setDigits[week].push(
            <Day 
                key={monthLimit + week}
                data={
                    {
                        daysObject: daysObject, 
                        setDaysObject: setDaysObject, 
                        id: monthArr[monthLimit + week],
                        setDayOfWeek: setDayOfWeek,
                        switchIsSetToToday: setIsSetToToday,
                        today: today
                    }
                }
             />
            );
            monthLimit += 7;
        }
        week++;
    }
    return setDigits;
    },[currentMonthLength, daysObject, monthArr])
   
    return (
       <div className={styles.main}>
       <p 
       className={`${styles.today} ${isSetToToday ? styles.isSetToToday : ''}`}
       onClick={setToToday}
       >
           {isSetToToday ? 'Today' : 'Today?'}
       </p>
        <div 
        className={`${styles.card}`}
        style={
            {
                marginBottom: dayOfWeek && '0px'
            }
        }
        >
            <p className={styles.monthYear}>
                <span onClick={()=>switchMonth('backward')} style={{marginLeft: '0px'}}>{'< '}</span>{months[month]}<span> {year}</span><span onClick={()=>switchMonth('forward')}>{' >'}</span>
            </p>
          
            <div className={styles.daysCont}>
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
       </div>
    )
}
export default React.memo(Calendar);