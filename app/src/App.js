import React from 'react';
import './App.css'
import Calendar from '../src/components/Calender/Calendar.js';
import Time from '../src/components/Time/Time.js'
import URL from '../src/components/URL-venue/URL.js'

export default function App() {
    return (
        <div className='main'>
            <Calendar />
            <Time />
            <URL />
        </div>
    )
}
