import React from 'react'
import styles from './time-styles/Digits.module.css'

function Digits(props) {
    const nums = props.digits;
    return (
        <div 
        className={styles.container}
        >
            {
                nums.map((e, i) => {
                    const id = i + 1;
                    return <p 
                    key={id}
                    >
                        {id < 10 && nums.length > 12 ? '0' + id : id}
                    </p>
                })
            }
        </div>
    )
}
export default React.memo(Digits);