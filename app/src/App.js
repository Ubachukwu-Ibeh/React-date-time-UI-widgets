import React from 'react';
import Calendar from '../src/components/Calender/Calendar.js';
import './App.css'
import Time from '../src/components/Time/Time.js'

export default function App() {
    return (
        <div className='main'>
            <Calendar />
            <Time />
        </div>
    )
}
