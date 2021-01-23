import React, {
    useState,
    useRef
} from 'react'
import styles from './time-styles/Digits.module.scss'

let prev = 0,
    hasSnapped = false;

const Digits = ({
    setDisplayTime,
    digits
}) => {
    let [inViewObj, setInViewObj] = useState(
        (() => {
        const obj = {};

        digits.forEach((e, i) => {
            obj[i] = false;
        })

        obj['0'] = true;

        return obj;
    })()
    );

    const [isInView, setIsInView] = useState();

    const digitCont = useRef();

    const setDigitSize = () => {

        const digitContTop = digitCont.current.getBoundingClientRect().top;

        const scrollAmt = digitCont.current.scrollTop;

        const main = digitCont.current;

        const diff = scrollAmt - prev;

        if (diff < 0) {

            diff > -20 && !hasSnapped && main.scrollTo(0, scrollAmt - 1);

        } else if (diff > 0) {

            diff < 20 && !hasSnapped && main.scrollTo(0, scrollAmt + 1);

        }

        prev = scrollAmt;

        const elems = digitCont.current.childNodes;
            
        const elemInView = (() => {

            for (let i = 0; i < elems.length; i++) {

                const elem = elems[i];

                const top = elem.getBoundingClientRect().top +
                    (elem.getBoundingClientRect().height / 2);

                if (top < digitContTop + 48 && top > digitContTop + 33) {
                    return [elems[i], i];
                }
            }

         })();

        hasSnapped = false;

        if (elemInView) {

            const idx = elemInView[1];

            if (isInView === idx) return;

            hasSnapped = true;

            setIsInView(idx);

            setInViewObj(prev => {

                const prevObj = {
                    ...prev
                };

                for (const key in prevObj) {
                    prevObj[key] = false;
                }

                prevObj[idx] = true;

                return prevObj;

            })
            
            
            setDisplayTime(prev => ({

                ...prev,

                [elems.length > 12 ? 'min' : 'hour']: (() => {
                    
                    switch (true) {
                        case idx <= 10:

                            return elems.length > 12 ? `0${idx}` : idx + 1;

                        case idx >= 10:

                            return elems.length > 12 ? idx : idx + 1;

                        default:
                            return prev;
                    }

                })()
            }));
        }
    }

    const produceTimeDisplay = id => {
        if (id < 10) {

            return '0' + id;

        } else {

            return id;

        }
    }
    
    return (
        <div className={styles.container} ref={digitCont} onScroll={setDigitSize}>
            {
               Object.keys(inViewObj).map((e, i) => {
                
                const id = digits.length > 12 ? i : i + 1;

                const inView = inViewObj[e];

                const digitsLength = digits.length;

                return <p key={id} className={inView ? styles.isInView : styles.digit}>
                    {produceTimeDisplay(id)}<span>{inView && digitsLength > 12 ? ' m' : inView && ' h'}</span>
                    </p>
                })
            }
        </div>
    )
}
export default React.memo(Digits);