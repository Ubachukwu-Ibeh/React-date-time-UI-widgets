import React from 'react'
import styles from './calendar-styles/Day.module.scss';

let selectedDays = {};
const resetSelectedDays = (id) => {
    selectedDays = {};
    selectedDays[id] = true;
}
const Day = ({ id, setDayData/**@object */ }) => {
    const { setDay, monthData, setToToday, dayNumber } = setDayData;

    id === dayNumber && resetSelectedDays(id)

    const changeColor = () => {
        if (id === 0) return;
        resetSelectedDays(id);
        setDay(() => ({ ...setToToday(monthData, id) }));
    }
    return (
        <div
            onClick={changeColor}
            className={`${styles.day} ${selectedDays[id] ? `${styles.selected}` : ''}`}
        >
            <p>
                {id === 0 ? '' : id}
            </p>
        </div>
    )
}
export default React.memo(Day);