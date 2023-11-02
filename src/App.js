import './App.css';
import  TimeInput from './TimeInput.js'
import React, { useState, useRef, useEffect } from 'react'

function App() {

  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  const [pause, setPause] = useState(true);
  
  let intervalRef = useRef();

  const valueToTimer = (inputValue) => {
    setMinutes(inputValue[0]);
    setSeconds(inputValue[1]);
    console.log(inputValue);
  };

  const decreaseTime = () => setSeconds(prev => (prev - 1 < 0 ? (minutes > 0 ? 59 : 0 ) : prev - 1));
  
  const startPause = () => {
    if (!pause) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(decreaseTime, 1000);
    }
    setPause((prev) => !prev);
  };

  useEffect(() => {
    if(seconds === 59) setMinutes(prev => prev - 1);
  }, [seconds]);


  const onClickReset = () => {
   
  }

  const onClickDecrement = () => {
  
  }

  const onClickIncrement = () => {
  
  }

  return (

    <div className="App">
       <TimeInput valueToTimer={valueToTimer}/>
       <div>
        {
            <h1>
              {" "}
              {minutes}:{seconds < 10 ? `${seconds}` : seconds}
            </h1>
        }
      </div>
       <button onClick={startPause}>{pause ? "Run" : "Pause"}</button>
      <button onClick={onClickReset}>Reset</button>
      <button onClick={onClickIncrement}>+</button>
      <button onClick={onClickDecrement}>-</button>
    </div>
  );
}

export default App;
