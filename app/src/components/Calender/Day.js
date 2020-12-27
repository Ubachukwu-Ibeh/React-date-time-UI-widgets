import React from 'react'
import styles from './calendar-styles/Day.module.scss';

export const setDayOfWeekPrefix = id =>{
    let lastNum = `${id}`.slice(-1);
    switch(true){
        case lastNum === '1' && id !== 11:
            return `st`;
        case lastNum === '2' && id !== 12:
            return `nd`;
        case lastNum === '3' && id !== 13:
            return `rd`;
        default: 
            return `th`;
    }
};

const Day = ({ data }) => {
    const {
        setDayOfWeek, 
        setDaysObject, 
        id, 
        switchIsSetToToday, 
        daysObject,
         today
        } = data;

    const changeColor = () => {
        if (id === 0) return;
        const prevObj = {...data.daysObject};

        for (const key in prevObj) {
            prevObj[key] && (prevObj[key] = false);
        }

        setDaysObject({...prevObj, [id]: !prevObj[id]});

        setDayOfWeek({
          prefix: setDayOfWeekPrefix(id), 
          dayNum: id
        });
        switchIsSetToToday(prev => id === today ? prev : false)
    }
    
    return (
        <div 
        onClick={changeColor} 
        className={`${styles.day} ${daysObject[id] ? `${styles.selected}` : ''}`}
        >
            <p>
                {id === 0 ? '' : id}
            </p>
        </div>
    )
}
export default React.memo(Day);