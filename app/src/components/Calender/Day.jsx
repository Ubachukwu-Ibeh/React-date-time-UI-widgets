import React from 'react'
import styles from './calendar-styles/Day.module.scss';

/**@param setDayData - object containing necessary info for setting days  */
let hasSelected = false,
const Day = ({ id, setDayData }) => {
    const {
        setDay,
        monthData,
        setToToday,
        dayNumber,
        setIsSetToToday
    } = setDayData;

    const changeColor = () => {
        if (id === 0 || id === dayNumber) return;
        setDay(() => ({ ...setToToday(monthData, id) }));
        setIsSetToToday(prev => prev ? !prev : prev);
        hasSelected = true;
        console.log(isSetToToday)
    }
    return (
        <div
            onClick={changeColor}
            className={`${styles.day} ${id === dayNumber && hasSelected ? `${styles.selected}` : ''}`}
        >
            <p>
                {id === 0 ? '' : id}
            </p>
        </div>
    )
}
export default React.memo(Day);