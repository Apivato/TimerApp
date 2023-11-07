'use client'

import './App.css';
import  TimeInput from './TimeInput.js'
import React, { useState, useRef, useEffect } from 'react'
import useSound from 'use-sound';
import shortBeep from './ShortBeep.wav';
import longBeep from './LongBeep.wav';
import {FaBars} from 'react-icons/fa'

function App() {

  const [start, setStart] = useState("00:00:00");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [radioVal, setRadioVal] = useState("00:00:00");

  const [done, setDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  
  let intervalRef = useRef();

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

  const valueToTimer = (inputValue) => {
    setStart(inputValue);
    const [str1, str2, str3] = inputValue.split(":");
  
    const h = Number(str1);
    const m = Number(str2);
    const s = Number(str3);

    // const [h, m, s] = toNum(inputValue);

    if (!isNaN(h) && !isNaN(m) && !isNaN(s)) {
      setHours(parseInt(h,10));
      setMinutes(parseInt(m,10));
      setSeconds(parseInt(s,10));
    }  

    if (isNaN(h) && !isNaN(m) && !isNaN(s)) {
      setMinutes(parseInt(m,10));
      setSeconds(parseInt(s,10));
    }

    if (isNaN(h) && isNaN(m) && !isNaN(s)) {
      setSeconds(parseInt(s,10));
    }
    setDone(false);
    // console.log(inputValue, done);
    // console.log(isPause,isRunning, done);
  };

  const decreaseTime = () => {
    setSeconds(prev => prev -1);
  };

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setIsPause(true);
    } else{
      if (start !== "00:00:00"){
        intervalRef.current = setInterval(decreaseTime, 1000);
        setIsRunning(true);
        setIsPause(false);
      };
    }
    setIsPause((prev) => !prev)
    // console.log(isPause,isRunning, done);
  };

  const onClickReset = () => {
   valueToTimer(start);
  };

  const resetTime = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPause(false);
    playLong();
    valueToTimer(start);
  }

  const onChangeValue = () => {
    var radioButtonGroup = document.getElementsByName("radioVal");
    var checkedRadio =Array.from(radioButtonGroup).find((radio) => radio.checked);

    setRadioVal(checkedRadio.value);
  }
  
  const onClickDecrement = () => {
    if (start !== "00:00:00"){
      var sSeconds = Math.max(0, getSecondsFromHHMMSS(start));
      var rSeconds = Math.max(0, getSecondsFromHHMMSS(radioVal));
      var totalSeconds = sSeconds - rSeconds;
      if ( totalSeconds >= 0){
        const time = toHHMMSS(totalSeconds);
        valueToTimer(time);
      }
        
    }
  }

  const onClickIncrement = () => {
      var sSeconds = Math.max(0, getSecondsFromHHMMSS(start));
      var rSeconds = Math.max(0, getSecondsFromHHMMSS(radioVal));
      var totalSeconds = sSeconds + rSeconds;
      const time = toHHMMSS(totalSeconds);
      
      valueToTimer(time);
  }

  const onClickFive = () => {
    valueToTimer("00:05:00")
  }

  useEffect(() => {
    if(seconds === 0 && minutes === 0 && hours === 0 && isRunning) setDone(true);
  }, [seconds, minutes, hours, isRunning]);

  useEffect(() => {
    if (done) resetTime();
  });

  useEffect(() => {
    if(seconds === 0 && minutes === 0 && hours > 0 && isRunning) setMinutes(60);
  }, [seconds, minutes, hours, isRunning]);
  
  useEffect(() => {
    if(seconds === 0 && minutes > 0 && isRunning) setSeconds(59);
  }, [seconds, minutes, isRunning]);

  useEffect(() => {
    if(seconds === 59 && !done) setMinutes(prev => (prev - 1 < 0 ? 0 : prev - 1));
  }, [seconds, done]);

  useEffect(() => {
    if(seconds === 59 && minutes === 59 && !done) setHours(prev => (prev - 1 < 0 ? 0 : prev - 1));
  }, [seconds, minutes, done]);

  const [playShort] = useSound(shortBeep, { volume: 0.25 });

  const [playLong] = useSound(longBeep, { volume: 0.25 });

  useEffect(() => {
    if (seconds <= 5 && seconds > 0 && minutes === 0 && hours === 0 && isRunning){
      playShort();
    }
  })

  return (
    
    <div className='bg-graphicImage bg-cover h-screen'>
      {/* ^global container div */}
      {/* input container div */}
      <div className=''>
        <div className='p-4'>
          <FaBars onClick={console.log("suh")} className='cursor-pointer' color='white'/>
        </div> 
        <div id="timerInput" className=''>
            <TimeInput valueToTimer={valueToTimer}/>
          </div>
      </div>
      <div className="App py-[400px] items-center space-x-4">
        {/* Output container div */}
        <div className='text-3xl font-bold md:text-9xl justify-center grid text-white'>
          {
              <h1 className='h-10 px-3 md:h-36 md:px-10 rounded-full bg-black'>
                {" "}
                {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h1>
          }
        </div>
        {/* Button Container div */}
        <div className='w-full justify-between items-center px-4'>
          <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2' onClick={startStop}>{isPause ? "Stop" : "Start"}</button>
          <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2' onClick={onClickReset}>Reset</button>
          <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2' onClick={onClickFive}>5:00</button>
          <div>
            
            <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2' onClick={onClickIncrement}>+</button>
            <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2' onClick={onClickDecrement}>-</button>
            <div onChange={onChangeValue} className='text-white'>
              <input type="radio" value="00:00:15" name="radioVal" /> 15s
              <input type="radio" value="00:00:30" name="radioVal" /> 30s
              <input type="radio" value="00:00:45" name="radioVal" /> 45s
              <input type="radio" value="00:01:00" name="radioVal" /> 1m
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
