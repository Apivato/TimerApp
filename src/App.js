'use client'

import './App.css';
import  TimeInput from './TimeInput.js'
import React, { useState, useRef, useEffect } from 'react'
import useSound from 'use-sound';
import beepSfx from './Beeps.wav';
import {FaBars} from 'react-icons/fa'

function App() {

  const [start, setStart] = useState("00:00:00");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  const [done, setDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  
  let intervalRef = useRef();

  const valueToTimer = (inputValue) => {
    setStart(inputValue);
    const [str1, str2, str3] = inputValue.split(":");
  
    const h = Number(str1);
    const m = Number(str2);
    const s = Number(str3);

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
      if (hours === 0 && minutes === 0 && seconds === 0 && done){
        onClickReset();};
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
  }

  const onClickDecrement = () => {
  
  }

  const onClickIncrement = () => {
  
  }

  useEffect(() => {
    if(seconds === 0 && minutes === 0 && hours === 0 && isRunning) setDone(true);
  }, [seconds, minutes, hours, isRunning]);

  useEffect(() => {
    if (done) {
      clearInterval(intervalRef.current)
      setIsRunning(false);
      setIsPause(false);
    }
  },[done]);

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

  const [playBeeps] = useSound(beepSfx, { volume: 0.25 });

  useEffect(() => {
    if (seconds === 5 && minutes === 0 && hours === 0 && isRunning && !done) playBeeps();
  })

  return (
    
    <div className='bg-graphicImage bg-cover h-screen'>
      {/* ^global container div */}
      <div className=''>
        <div className='p-4'>
          <FaBars onClick={console.log("suh")} className='cursor-pointer' color='white'/>
        </div> 
        <div id="timerInput" className=''>
            <TimeInput valueToTimer={valueToTimer}/>
          </div>
      </div>
      <div className="App py-[400px] items-center space-x-4">
        {/* input container div */}
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
          <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2' onClick={onClickIncrement}>+</button>
          <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2' onClick={onClickDecrement}>-</button>
          <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2'>5:00</button>
        </div>
        
      </div>
    </div>
  );
}

export default App;
