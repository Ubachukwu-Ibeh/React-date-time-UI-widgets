import React, {useState} from 'react';
import styles from './url-venue-styles/URL-styles.module.css';

export default function URL() {
    
    let [url, setUrl] = useState();

    const initSeturl = val => {
        setUrl(val.match(/(?:[^/]*\/){3}/));
    }
    
    return (
        <div className={styles.main}>
            <p>URL <span>*</span></p>
            <div className={styles.urlInputCont}>
                <img src={url ? `http://www.google.com/s2/favicons?domain=${url['0']}` : undefined}/>
                <input type='text' onChange={e => initSeturl(e.target.value)}/>
            </div>
        </div>
    )
}