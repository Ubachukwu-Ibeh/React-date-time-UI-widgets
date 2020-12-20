import React from 'react'
import styles from './calendar-styles/Day.module.css';
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
function Day(props) {
    const data = props.data;
    const id = props.data.id;
    const changeColor = () => {
        if (!id || id > 31) return;
        const prevObj = {...data.daysObject};

        for (const key in prevObj) {
            prevObj[key] && (prevObj[key] = false);
        }

        data.setDaysObject({...prevObj, [id]: !prevObj[id]});

        data.setDayOfWeek({
          prefix: setDayOfWeekPrefix(id), 
          dayNum: id
        });
        data.switchIsSetToToday(prev => id === data.today ? prev : false)
    }
    return (
        <div 
        onClick={changeColor} 
        className={`${styles.day} ${data.daysObject[id] ? `${styles.selected}` : ''}`}
        >
            <p>
                {id === 0 ? '' : id}
            </p>
        </div>
    )
}
export default React.memo(Day);