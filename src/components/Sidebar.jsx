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

    <div className="fixed">
        <FaBars onClick={() => setOpen(!isOpen)} className='cursor-pointer hover:opacity-75 md:h-8 md:w-8 transition-all duration-300 ' color='white'/>
        {isOpen && (
        <ul className='fixed transition-all duration 300 md:scale-125 px-30 md:mx-8 md:my-14 bg-opacity-50 bg-black rounded font-semibold font-mono'>

            <li id="timerInput" className="">
                <div className="font-semibold text-white py-2">
                    Input Time
                </div>
                <TimeInput sendTimeInput={sendTimeInput}/>
            </li>
            <li>
                <div className="font-semibold text-white py-2">
                    Preset Input
                </div>
                <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2 font-semibold font-mono' onClick={onClickFive}>5:00</button>
                <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md w-20 py-1 mx-2 my-2 font-semibold font-mono' onClick={onClickFour}>4:00</button>
            </li>
            <li>
            <div>
                <div className="font-semibold text-white py-2">
                    Preset Increments
                </div>
                <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md  py-1 mx-2 my-2 font-bold h-9 w-20  ' onClick={onClickIncrement}>+</button>
                <button className='hover:border-black bg-[#73f3eb] border-2 rounded-md  py-1 mx-2 my-2 font-bold h-9 w-20  ' onClick={onClickDecrement}>-</button>
                <div onChange={onChangeValue} className='text-white font-semibold font-mono text-xl'>
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