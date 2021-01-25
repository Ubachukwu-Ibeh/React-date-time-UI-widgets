import React from "react";
import "./App.scss";
import Calendar from "./components/Calender/Calendar";
import Time from "./components/Time/Time";
import URL from "./components/URL-venue/URL";

const App = () => {
  return (
    <div className="main">
      <Calendar />
      <Time />
      <URL />
    </div>
  );
};
export default App;
