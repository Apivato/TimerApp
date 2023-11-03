import React from 'react'

export default function TimeInput({valueToTimer}) {

    const [value, setValue] = React.useState("00:00:00");

    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    const onBlur = (event) => {
      const value = event.target.value;
      const seconds = Math.max(0, getSecondsFromHHMMSS(value));
      const time = toHHMMSS(seconds);
      valueToTimer(time);
      setValue(time);
    };
  
    const getSecondsFromHHMMSS = (value) => {
      const [str1, str2, str3] = value.split(":");
  
      const val1 = Number(str1);
      const val2 = Number(str2);
      const val3 = Number(str3);
  
      if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
        return val1;
      }
  
      if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
        return val1 * 60 + val2;
      }
  
      if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
        return val1 * 60 * 60 + val2 * 60 + val3;
      }
  
      return 0;
    };
  
    const toHHMMSS = (secs) => {
      const secNum = parseInt(secs.toString(), 10);
      const hours = Math.floor(secNum / 3600);
      const minutes = Math.floor(secNum / 60) % 60;
      const seconds = secNum % 60;

      return [hours, minutes, seconds]
        .map((val) => (val < 10 ? `0${val}` : val))
        .join(":");
    };
  
    return (
      <input type="text" onBlur={onBlur} onChange={onChange} value={value} />
    );
  }