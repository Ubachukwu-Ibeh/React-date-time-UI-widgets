import React, {useState, useRef} from 'react'
import styles from './time-styles/Digits.module.css'


function Digits(props) {
    const nums = props.digits;
    let [inViewObj, setInViewObj] = useState((()=>{
        const obj = {
            1: true
        };
        nums.forEach((e, i) => {
            obj[i + 2] = false;
        })
        return obj;
    })());
  
    const digitCont = useRef();

    const setDigitSize = () => {
        const  elems = digitCont.current.childNodes,
         elemInView = (() => {
            for(let i = 0; i < elems.length; i++){
               const top = elems[i].getBoundingClientRect().top;
               if(top < 560.25 && top > 550.25){
                   return [elems[i], i + 1];
               }
            }
        })();
        if(elemInView) {
        setInViewObj(prev => {
            const prevObj = {...prev};
            for (const key in prevObj) {
                 prevObj[key] = false;
            }
             prevObj[elemInView[1]] = true;
            return prevObj;
         })
        }
    }
    return (
        <div 
        className={styles.container}
        ref={digitCont}
        onScroll={() => setDigitSize()}
        >
            {
                nums.map((e, i) => {
                    const id = i + 1;
                    return <p 
                    key={id}
                    className={inViewObj[id] === true ? styles.isInView : styles.digit}
                    >
                        {id < 10 && nums.length > 12 ? '0' + id : id}
                    </p>
                })
            }
        </div>
    )
}
export default React.memo(Digits);