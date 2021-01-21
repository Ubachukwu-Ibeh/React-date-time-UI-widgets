import React, { useState, useRef } from 'react';
import styles from './url-venue-styles/URL-styles.module.scss';

const URL = () => {

    let [url, setUrl] = useState(),
        inputElem = useRef();

    const initSeturl = val => {
        setUrl(val.match(/(?:[^/]*\/){3}/));
    }
    
    const autoPasteLink = async () => {
        const text = await navigator.clipboard.readText();
        inputElem.current.value = text;
    }

    return (
        <div className={styles.main}>
            <p>URL <span>*</span></p>
            <div className={styles.urlInputCont}>
                <div className={styles.faviconDisplay} style={{
                    backgroundImage: url ? `url(http://www.google.com/s2/favicons?domain=${url['0']})` : undefined
                }}></div>
                <input
                    ref={inputElem}
                    type='text'
                    onChange={e => initSeturl(e.target.value)}
                    placeholder='Enter URL...'
                />
                <div onClick={autoPasteLink} className={styles.paste}></div>
            </div>
        </div>
    )
}
export default URL;