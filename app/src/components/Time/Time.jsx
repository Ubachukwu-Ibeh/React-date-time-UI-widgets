import React, { useState } from "react";
import styles from "./time-styles/Time.module.scss";
import Digits from "./Digits";

const Time = () => {
  let [time, setTime] = useState({
    time: "AM",
    status: true
  });

  const setTimeType = param => {
    if (param === time.time) return;

    return setTime(prev => ({
      time: param,
      status: !prev.status
    }));
  };

  let [displayTime, setDisplayTime] = useState({
    hour: "1",
    min: "00"
  });

  const displayTimeData = {
    displayTime: displayTime,
    setDisplayTime: setDisplayTime
  };
  return (
    <div className={styles.containerMain}>
      <p className={styles.setTime}>
        Set time <span>*</span>
      </p>
      <p className={styles.displayTime}>
        <span>
          {displayTime.hour}:{displayTime.min}
        </span>
        {time.time} <span>- To</span>
      </p>
      <div className={styles.container}>
        <div className={styles.ampm}>
          <p
            onClick={() => setTimeType("AM")}
            className={time.status ? styles.selected : ""}>
            AM
          </p>
          <p
            onClick={() => setTimeType("PM")}
            className={!time.status ? styles.selected : ""}>
            PM
          </p>
        </div>

        <Digits {...displayTimeData} digits={Array(12).fill(true)} />
        <Digits {...displayTimeData} digits={Array(60).fill(true)} />
      </div>
    </div>
  );
};
export default Time;
