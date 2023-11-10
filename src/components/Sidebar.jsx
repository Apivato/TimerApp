'use client'

import {FaBars} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import TimeInput from "../TimeInput";
import { ToggleSlider } from "react-toggle-slider";


const Sidebar = ({sideBarToTimer, toggleReset, toggleRestart, onClickFive, onClickFour, onClickIncrement, onClickDecrement, onChangeValue}) => {
    const [isOpen, setOpen] = useState(false)
    const [resetActive, setResetActive] = useState(false);
    const [restartActive, setRestartActive] = useState(false);


    const sendTimeInput = (inputValue) =>{
        sideBarToTimer(inputValue);
    }

    useEffect(() => {
        toggleReset();  
    },[resetActive]);

    useEffect(() => {
        toggleRestart();  
    },[restartActive]);


    return(

    <div className="fixed z-20">
        <FaBars onClick={() => setOpen(!isOpen)} className='cursor-pointer hover:opacity-75 md:h-8 md:w-8 transition-all duration-300 z-30' color='white'/>
        {isOpen && (
        <ul className='fixed transition-all duration 300 scale-125 p-8 my-14 bg-opacity-90 bg-black rounded font-semibold font-mono grid'>

            <li id="timerInput" className="">
                <div className="font-semibold text-white py-1">
                    Input Time
                </div>
                <TimeInput sendTimeInput={sendTimeInput}/>
            </li>
            <li>
                <div className="font-semibold text-white py-1">
                    Preset Input
                </div>
                <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-1 font-semibold font-mono' onClick={onClickFive}>5:00</button>
                <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-1 font-semibold font-mono' onClick={onClickFour}>4:00</button>
            </li>
            <li>
            <div>
                <div className="font-semibold text-white py-2">
                    Preset Increments
                </div>
                <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md   mx-2  font-bold h-9 w-20  ' onClick={onClickIncrement}>+</button>
                <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md   mx-2  font-bold h-9 w-20  ' onClick={onClickDecrement}>-</button>
                <div onChange={onChangeValue} className='text-white font-semibold font-mono text-xl py-2'>
                    <input type="radio" value="00:00:15" defaultChecked name="radioVal" className="w-4 h-4 accent-[#73f3eb]" /> 15s
                    <input type="radio" value="00:00:30" name="radioVal" className="w-4 h-4"/> 30s
                    <input type="radio" value="00:00:45" name="radioVal" className="w-4 h-4"/> 45s
                    <input type="radio" value="00:01:00" name="radioVal" className="w-4 h-4"/> 1m
                </div>
          </div>
            </li>
            <li id="mode1">
                <div className="text-white font-semibold py-2">
                    Auto Reset
                </div>
                <ToggleSlider onToggle={state => setResetActive(state)} draggable={false} barBackgroundColorActive={"#73f3eb"} />
            </li>

            <li id="mode2">
                <div className="text-white font-semibold py-2">
                    Auto Restart
                </div>
                <ToggleSlider onToggle={state => setRestartActive(state)} draggable={false} barBackgroundColorActive={"#73f3eb"} />
            </li>
        </ul>
        )}

    </div>
    );
}
export default Sidebar;