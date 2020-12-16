import React, {useState} from 'react'
import styles from './time-styles/Time.module.css'
import Digits from './Digits.js'

export default function Time() {
    let [time, setTime] = useState({
        time: 'AM',
        status: true
    });

    const setTimeType = (param) => {
        if(param === time.time) return;
        return setTime(prev => ({time: param, status: !prev.status}));
    }
    
    return (
        <div className={styles.container}>
            <div 
            className={styles.ampm}>
                <p 
                onClick={() => setTimeType('AM')} 
                className={time.status ? styles.selected : ''}
                >
                    AM
                </p>
                <p 
                onClick={() => setTimeType('PM')} 
                className={!time.status ? styles.selected : ''}
                >
                    PM
                </p>
            </div>
        
            <Digits 
            digits={Array(12).fill(true)}
            />
            <Digits 
            digits={Array(59).fill(true)}
            />
        </div>
    )
}
