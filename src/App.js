'use client'

import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import useSound from 'use-sound';
import shortBeep from './ShortBeep.wav';
import longBeep from './LongBeep.wav';
import Sidebar from './components/Sidebar'
import getSecondsFromHHMMSS from "./actions/getSecondsFromHHMMSS";
import setToHHMMSS from "./actions/setToHHMMSS";

function App() {

  const [start, setStart] = useState("00:00:00");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [radioVal, setRadioVal] = useState("00:00:15");

  const [done, setDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const [isReset, setIsReset] = useState(false)
  const [isRestart, setIsRestart] = useState(false)
  
  let intervalRef = useRef();
  let secondsRef = useRef();

  secondsRef.current = [seconds, minutes, hours];

  const getCurrTime = () => {
    return secondsRef.current[2]+":"+secondsRef.current[1]+":"+secondsRef.current[0];
  }




  const valueToTimer = (inputValue) => {
    if (!isRunning){
      setStart(inputValue);
    }
    
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
    setSeconds(prev => prev - 1);
  };

  const startStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setIsPause(false);
    } else{
      var currTime = getCurrTime();
      if (start !== "00:00:00" && currTime !== "0:0:0"){
        intervalRef.current = setInterval(decreaseTime, 1000);
        setIsRunning(true);
        setIsPause(true);
      };
    }
    // setIsPause((prev) => !prev);
    // console.log(isPause,isRunning, done);
  };

  const onChangeValue = () => {
    var radioButtonGroup = document.getElementsByName("radioVal");
    var checkedRadio =Array.from(radioButtonGroup).find((radio) => radio.checked);

    setRadioVal(checkedRadio.value);
  }
  
  const onClickDecrement = () => {
    if (start !== "00:00:00"){
      var currTime = getCurrTime();
      var sSeconds = Math.max(0, getSecondsFromHHMMSS(currTime));
      var rSeconds = Math.max(0, getSecondsFromHHMMSS(radioVal));
      var totalSeconds = sSeconds - rSeconds;
      var time = 0;
      if ( totalSeconds >= 0){
        time = setToHHMMSS(totalSeconds);
      }
      else {
        time = setToHHMMSS(0);
      }
      valueToTimer(time);  
    }
  }

  const onClickIncrement = () => {
    var currTime = getCurrTime();
    var sSeconds = Math.max(0, getSecondsFromHHMMSS(currTime));
    var rSeconds = Math.max(0, getSecondsFromHHMMSS(radioVal));
    var totalSeconds = sSeconds + rSeconds;
    const time = setToHHMMSS(totalSeconds);
    
    valueToTimer(time);
    
  }

  const onClickFive = () => {
    valueToTimer("00:05:00")
  }

  const onClickFour = () => {
    valueToTimer("00:04:00")
  }

  const updateReset = () => {
    setIsReset(prev => !prev)
  }

  const updateRestart = () => {
    setIsRestart(prev => !prev)
  }

  const onClickReset = () => {
    valueToTimer(start);
   };
 
   const reset = () => {
     clearInterval(intervalRef.current);
     setIsRunning(false);
     setIsPause(false);
   }
 
   const resetTime = () => {
     reset();
     valueToTimer(start);
   }
 
   const resetLoop = () => {
     valueToTimer(start);
   }


  useEffect(() => {
    if(seconds === 0 && minutes === 0 && hours === 0 && isRunning && !done) 
    {
      setDone(true);
      playLong();
    }
  }, [seconds, minutes, hours, isRunning, done]);

  useEffect(() => {
    if (done && !isReset && !isRestart) {
      reset();
    }
    else if (done && isReset && !isRestart) {
      resetTime();
    }
    if (isRestart && done) {
      resetLoop();
    }
  }, [isReset, isRestart, done]);

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
    if (seconds <= 5 && seconds > 0 && minutes === 0 && hours === 0 && isRunning && !done){
      playShort();
    }
  }, [seconds, minutes, hours, isRunning, done])

  return (
    
    <div className='bg-graphicImage h-screen bg-cover bg-no-repeat bg-center bg-fixed transition '>
      {/* ^global container div */}
      {/* input container div */}

      <div id="mySidenav" className='p-4'>
        {/*Sidebar */}
        <Sidebar toggleReset={updateReset} toggleRestart={updateRestart} sideBarToTimer={valueToTimer} onClickFive={onClickFive} onClickFour={onClickFour} onClickDecrement={onClickDecrement} onClickIncrement={onClickIncrement} onChangeValue={onChangeValue}/>
      </div>
      {/* <div className="lg:my-35">

      </div> */}

      <div id="main" className='App h-screen max-w-full xl:m-28 lg:m-28 md:m-18 sm:m-20 m-10'>
        {/* Output container div */}
        <div className='text-8xl lg:text-[250px] lg:px-16 lg:py-16 md:text-[200px] items-center justify-center grid text-white font-semibold font-mono transition-all duration-400'>
          {
              <h1 className='rounded-full bg-black opacity-95'>
                {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h1>
          }
        </div>

        {/* Button Container div */}
        <div className='w-full items-center text-lg lg:my-5 md:my-4 sm:my-3 font-semibold font-mono transition-all duration-300'>
          <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2 font-semibold font-mono' onClick={startStop}>{isPause ? "Stop" : "Start"}</button>
          <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2 font-semibold font-mono' onClick={onClickReset}>Reset</button>
          
        </div>
        
      </div>
    </div>
  );
}

export default App;

