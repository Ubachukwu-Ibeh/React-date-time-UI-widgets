import React, { useState } from 'react'
import styles from './calendar-styles/Day.module.scss';

let selectedDays = {};

const Day = ({ id, setDayData/**@object */ }) => {
    const {setDay, monthData, setToToday} = setDayData;
    let [selected, setSelected] = useState(false);

    const changeColor = () => {
        if (id === 0) return;
        for (const selected in selectedDays) {
            selectedDays[selected](prev => !prev);
        }
        selectedDays = {};
        selectedDays[id] = setSelected;
        selectedDays[id](prev => !prev);
        setDay({...setToToday(monthData, id)});
    }
    return (
        <div 
        onClick={changeColor} 
        className={`${styles.day} ${selected ? `${styles.selected}` : ''}`}
        >
            <p>
                {id === 0 ? '' : id}
            </p>
        </div>
    )
}
export default React.memo(Day);