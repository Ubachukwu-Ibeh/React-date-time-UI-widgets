import React from 'react'
import styles from './calendar-styles/Day.module.css';

function Day(props) {
    let lastNum;
    const id = props.data.id,
    mark = props.data.mark,
    setDayOfWeek = (()=>{
        lastNum = `${id}`.slice(-1);
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
    })();
    const changeColor = () => {
        if (!id || id > 31) return;
        const prevObj = {...props.data.daysObject};

        for (const key in prevObj) {
            prevObj[key] && (prevObj[key] = false);
        }

        props.data.setDaysObject({...prevObj, [id]: !prevObj[id]});

        props.data.setDayOfWeek({
          prefix: setDayOfWeek, 
          dayOfWeek: props.data.dayOfWeek,
          dayNum: id
        });
    }
    return (
        <div 
        onClick={changeColor} 
        className={`${styles.day} ${props.data.daysObject[id] ? `${styles.selected}` : ''}`}
        style={{
            display: id > 35 - mark && mark < 5 ? 'none' : 'flex'
        }}
        >
            <p>
                {!id || id > 31 ? '' : id}
            </p>
        </div>
    )
}
export default React.memo(Day);