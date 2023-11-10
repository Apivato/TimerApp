'use client'

import React from 'react'
import getSecondsFromHHMMSS from "./actions/getSecondsFromHHMMSS";
import setToHHMMSS from "./actions/setToHHMMSS";

export default function TimeInput({sendTimeInput}) {

    const [value, setValue] = React.useState("00:00:00");

    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    const onBlur = (event) => {
      const value = event.target.value;
      const seconds = Math.max(0, getSecondsFromHHMMSS(value));
      const time = setToHHMMSS(seconds);
      sendTimeInput(time);
      setValue(time);
    };

    return (
      <input type="text" onBlur={onBlur} onChange={onChange} value={value} />
    );
  }