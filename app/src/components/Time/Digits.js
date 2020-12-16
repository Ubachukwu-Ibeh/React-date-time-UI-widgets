import React, {useState, useRef} from 'react'
import styles from './time-styles/Digits.module.css'

let prev = 0, hasSnapped = false;
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
    const [isInView, setIsInView] = useState();
  
    const digitCont = useRef();

    const setDigitSize = () => {
        const scrollAmt = digitCont.current.scrollTop;
        const main = digitCont.current;
        const diff = scrollAmt - prev;
        if(diff < 0){
           diff > -20 && !hasSnapped && main.scrollTo(0, scrollAmt - 1);
        }else if(diff > 0){
            diff < 20 && !hasSnapped && main.scrollTo(0, scrollAmt + 1);
        }
      
        prev = scrollAmt;

        const  elems = digitCont.current.childNodes,

         elemInView = (() => {
            for(let i = 0; i < elems.length; i++){
                const elem = elems[i];
               const top = elem.getBoundingClientRect().top + (elem.getBoundingClientRect().height / 2);

               if(top < 565.25 && top > 550.25) {
                   return [elems[i], i + 1];
               }
            }
        })();

        hasSnapped = false;

        if(elemInView) {
        const idx = elemInView[1];
        if(isInView === idx) return;
        hasSnapped = true;
        setIsInView(idx);
        setInViewObj(prev => {
            const prevObj = {...prev};
            for (const key in prevObj) {
                 prevObj[key] = false;
            }
             prevObj[idx] = true;
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
                    const inView = inViewObj[id];
                    return <p 
                    key={id}
                    className={inView ? styles.isInView : styles.digit}
                    >
                        {id < 10 && nums.length > 12 ? '0' + id : id}<span>{inView && nums.length > 12 ? ' m' : inView && ' h'}</span>
                    </p>
                })
            }
        </div>
    )
}
export default React.memo(Digits);