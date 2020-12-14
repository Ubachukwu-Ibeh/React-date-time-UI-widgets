import React, {useState, useRef} from 'react'
import styles from './time-styles/Time.module.css'
import Digits from './Digits.js'

export default function Time() {
    let [time, setTime] = useState({
        time: 'AM',
        status: true
    });
    const main = useRef();
    const set = (param) => {
        if(param === time.time) return;
        return setTime(prev => ({time: param, status: !prev.status}));
    }
    return (
        <div className={styles.container}>
            <div 
            className={styles.ampm}>
                <p 
                onClick={() => set('AM')} 
                className={time.status ? styles.selected : ''}
                >
                    AM
                </p>
                <p 
                onClick={() => set('PM')} 
                className={!time.status ? styles.selected : ''}
                >
                    PM
                </p>
            </div>
            <div 
            ref={main} 
            className={styles.digitsContainer} 
            onScroll={e => console.log(main.current.scrollTop)}
            >
                <Digits 
                digits={Array(12).fill(true)}
                />
            </div>
            <div 
            className={styles.digitsContainer}
            >
            <Digits 
            digits={Array(59).fill(true)}
            />
            </div>
        </div>
    )
}
