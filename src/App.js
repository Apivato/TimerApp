'use client'

import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from "react-icons/fa";
import useSound from 'use-sound';
import shortBeep from './ShortBeep.wav';
import longBeep from './LongBeep.wav';
import Sidebar from './components/Sidebar'
import getSecondsFromHHMMSS from "./actions/getSecondsFromHHMMSS";
import setToHHMMSS from "./actions/setToHHMMSS";

//what can be optimized, the status of sidebar elements being sent over as states vs the truthiness value


function App() {

  const [start, setStart] = useState("00:00:00");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [radioVal, setRadioVal] = useState("00:00:15");

  const [done, setDone] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);

  const [isReset, setIsReset] = useState(false);
  const [isRestart, setIsRestart] = useState(false);

  const [warningBeep, setWarningBeep] = useState(false);
  const [colorTime, setColorTime] = useState({ s: 0, m: 0, h: 0 });
  const [warningColor, setWarningColor] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [displayHours, setDisplayHours] = useState(true);

  const [progress, setProgress] = useState(0);
  const holdTimerRef = useRef(null);
  const holdDuration = 1800; // ms


  let intervalRef = useRef();
  let secondsRef = useRef();
  let colorRef = useRef();

  secondsRef.current = [seconds, minutes, hours];

  const getCurrTime = () => {
    return secondsRef.current[2] + ":" + secondsRef.current[1] + ":" + secondsRef.current[0];
  }


  const valueToTimer = (inputValue) => {
    if (!isRunning) {
      setStart(inputValue);
    }

    const [str1, str2, str3] = inputValue.split(":");

    var h = Number(str1);
    var m = Number(str2);
    var s = Number(str3);

    if (!displayHours) {
      m = m + (h * 60);
      h = 0;

    }

    if (!isNaN(h) && !isNaN(m) && !isNaN(s)) {
      setHours(parseInt(h, 10));
      setMinutes(parseInt(m, 10));
      setSeconds(parseInt(s, 10));
    }

    if (isNaN(h) && !isNaN(m) && !isNaN(s)) {
      setMinutes(parseInt(m, 10));
      setSeconds(parseInt(s, 10));
    }

    if (isNaN(h) && isNaN(m) && !isNaN(s)) {
      setSeconds(parseInt(s, 10));
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
    } else {
      var currTime = getCurrTime();
      if (start !== "00:00:00" && currTime !== "0:0:0") {
        intervalRef.current = setInterval(decreaseTime, 1000);
        setIsRunning(true);
        setIsPause(true);
      };
    }
    // setIsPause((prev) => !prev);
    // console.log(isPause,isRunning, done); 1000
  };

  const onChangeValue = () => {
    var radioButtonGroup = document.getElementsByName("radioVal");
    var checkedRadio = Array.from(radioButtonGroup).find((radio) => radio.checked);

    setRadioVal(checkedRadio.value);
  }

  const colorToggle = () => {
    setWarningColor(prev => !prev);
  }

  const colorTimeInput = (inputValue) => {
    const [str1, str2, str3] = inputValue.split(":");
    setColorTime({ s: str3, m: str2, h: str1 });
    // console.log(colorTime);
  }

  const beepToggle = () => {
    setWarningBeep(prev => !prev);
  }

  const hoursToggle = () => {
    setDisplayHours(prev => !prev);
  }

  const onClickDecrement = () => {
    if (start !== "00:00:00") {
      var currTime = getCurrTime();
      var sSeconds = Math.max(0, getSecondsFromHHMMSS(currTime));
      var rSeconds = Math.max(0, getSecondsFromHHMMSS(radioVal));
      var totalSeconds = sSeconds - rSeconds;
      var time = 0;
      if (totalSeconds >= 0) {
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

  const onReset = () => {
    reset();
    valueToTimer(start);
  };

  const startHold = () => {
    let start = Date.now();
    holdTimerRef.current = setInterval(() => {
      let elapsed = Date.now() - start;
      let pct = Math.min(elapsed / holdDuration, 1);
      setProgress(pct);
      console.log(pct)
      if (pct === 1) {
        clearInterval(holdTimerRef.current);
        setProgress(0);
        onReset();
      }
    }, 16); // ~60fps
  };

  const cancelHold = () => {
    clearTimeout(holdTimerRef.current);
    setProgress(0);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    colorRef.current.style.color = "white";
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

    const h = Number(colorTime["h"]);
    const m = Number(colorTime["m"]);
    const s = Number(colorTime["s"]);
    if (seconds === s && minutes === m && hours === h && isRunning && !done && warningColor) {
      colorRef.current.style.color = "red";
    }
  }, [seconds, minutes, hours, isRunning, done, colorTime]);


  useEffect(() => {
    if (seconds === 0 && minutes === 0 && hours === 0 && isRunning && !done) {
      setDone(true);
      if (warningBeep) {
        playLong();
      }

      colorRef.current.style.color = "white";

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
    if (seconds < 0 && isRunning) setSeconds(59);
    if (seconds < 0 && minutes > 0 && isRunning) setMinutes(prev => (prev - 1 < 0 ? 0 : prev - 1));
    if (seconds < 0 && minutes === 0 && hours > 0 && isRunning) {
      setHours(prev => (prev - 1 < 0 ? 0 : prev - 1));
      setMinutes(59);
    }
  }, [seconds, minutes, hours, isRunning]);

  const [playShort] = useSound(shortBeep, { volume: 0.25 });

  const [playLong] = useSound(longBeep, { volume: 0.25 });

  useEffect(() => {
    if (seconds <= 5 && seconds > 0 && minutes === 0 && hours === 0 && isRunning && !done && warningBeep) {
      playShort();
    }
  }, [seconds, minutes, hours, isRunning, done])


  useEffect(() => {
    var m = minutes;
    var h = hours;
    if (!displayHours) {
      m = m + (h * 60);
      h = 0;

    }
    else {
      h = Math.floor(m / 60);
      m = m % 60;
    }
    // console.log(h, m)
    valueToTimer(parseInt(h, 10) + ":" + parseInt(m, 10) + ":" + seconds);
  }, [displayHours])

  return (
    <div className='relative h-screen max-h-screen bg-graphicImage bg-cover bg-no-repeat bg-center transition '>
      {/* ^global container div  bg-contain bg-graphicImage bg-black*/}

      {/* input container div */}
      {/* <div id="mySidenav" className='fixed z-20 ' > */}
      {/*Sidebar */}
      {/* <Sidebar toggleReset={updateReset} toggleRestart={updateRestart} sideBarToTimer={valueToTimer} onClickFive={onClickFive} onClickFour={onClickFour} onClickDecrement={onClickDecrement} onClickIncrement={onClickIncrement} onChangeValue={onChangeValue}/>
      </div> */}

      <header className='w-screen'>
        <div id="mySidenav" className='fixed z-20' >
          {/*Sidebar */}
          <Sidebar toggleReset={updateReset} toggleRestart={updateRestart} sideBarToTimer={valueToTimer} onClickFive={onClickFive} onClickFour={onClickFour} onClickDecrement={onClickDecrement} onClickIncrement={onClickIncrement} onChangeValue={onChangeValue} toggleColorWarning={colorToggle} colorWarningTime={colorTimeInput} toggleBeepWarning={beepToggle} toggleDisplayHours={hoursToggle} />
        </div>
        {/* Logo Title */}
        <div className='absolute bottom-5 right-5 h-1/12 w-1/12'>
          <img class='' src="../logo-white.png" alt="Full Logo UTB"></img>
        </div>
      </header>
      {/* interface container div */}
      <div id="main" className='fixed mx-auto my-auto inset-x-0 inset-y-0 h-1/2 w-1/2 flex flex-col items-center'>
        {/* Output container div */}
        <div ref={colorRef} className='timerText text-xxs text-white font-semibold font-mono'>
          {/* text-black text-white*/}
          {
            displayHours &&
            <h1 className='rounded-md bg-black px-3 xs:text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl 6xl:text-6xl transition-all duration-300 ease-in-out'>
              {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>}
          {
            !displayHours &&
            <h1 className='rounded-md bg-black px-3 xs:text-sm sm:text-md md:text-lg lg:text-lg xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl 5xl:text-7xl 6xl:text-8xl transition-all duration-300 ease-in-out'>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          }
        </div>

        {/* Button Container div */}
        <div className=' transition-all ease-in-out'>
          <details className='group'>
            <div className='group-open:-translate-y-9 font-semibold font-mono'>
              <button className='hover:border-white active:bg-[#60cbc4] bg-[#73f3eb] border-black border-2 rounded-md w-20 py-1 mx-2 my-2' onClick={startStop}>{isPause ? "Stop" : "Start"}</button>
              <button className='relative overflow-hidden hover:border-white bg-[#73f3eb] border-black border-2 rounded-md w-32 py-1 px-1 mx-2 my-2' onMouseDown={startHold} onMouseUp={cancelHold} onMouseLeave={cancelHold} onTouchStart={startHold} onTouchEnd={cancelHold}>
                <span className="relative z-10">Hold to Reset</span>
                {/* Progress bar overlay */}
                <div className="absolute inset-0 left-0 top-0 h-full bg-[#11635e] rounded-md transition-all" style={{ width: `${progress * 215}%`, transitionDuration: `${holdDuration}ms` > 0 ? 0.3 : 0 }}></div>
              </button>
            </div>
            <summary className="flex list-none justify-center group-open:translate-y-10 group-open:transition-transform duration-300">
              <div>
                <FaChevronDown className=' group-open:-rotate-180 scale-125 cursor-pointer hover:opacity-75 2xl:h-8 2xl:w-8 transition-all duration-300' color='white' />
              </div>
            </summary>
          </details>
        </div>

      </div>
    </div>
  );
}

export default App;

