'use client'

import {FaBars} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import React, { useEffect, useState} from "react";
import TimeInput from "../TimeInput";
import { ToggleSlider } from "react-toggle-slider";
import { Transition } from '@headlessui/react'


const Sidebar = ({sideBarToTimer, toggleReset, toggleRestart, onClickFive, onClickFour, onClickIncrement, onClickDecrement, onChangeValue, toggleColorWarning, colorWarningTime,  toggleBeepWarning, BeepWarningTime}) => {
    const [isOpen, setOpen] = useState(false)
    const [resetActive, setResetActive] = useState(true);
    const [restartActive, setRestartActive] = useState(true);
    const [warningBeep, setWarningBeep] = useState(false);
    const [warningColor, setWarningcolor] = useState(true);

    const sendTimeInput = (inputValue) =>{
        sideBarToTimer(inputValue);
    }
    
    // const sendBeepWarningInput = (inputValue) => {
    //     setWarningTime(inputValue);
    // }

    const sendColorWarningInput = (inputValue) => {
        colorWarningTime(inputValue);
    }


    useEffect(() => {
        toggleReset();  
    },[resetActive]);

    useEffect(() => {
        toggleRestart();  
    },[restartActive]);

    useEffect(() => {
        toggleColorWarning();
    }, [warningColor]);

    useEffect(() => {
        toggleBeepWarning();
    }, [warningBeep]);

    return(

    <div className=''>
        <div className='absolute top-5 left-5'>
            {!isOpen && <FaBars onClick={() => setOpen(!isOpen)} className=' scale-125 cursor-pointer hover:opacity-75 2xl:h-8 2xl:w-8 transition-all duration-300' color='white'/>}
        </div>
        <Transition
            show={isOpen}
            enter="transition ease duration-500 transform"
            enterFrom="opacity-0 -translate-x-12"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease duration-450 transform"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-12"
        >
        <div className=' bg-opacity-90 bg-black p-6 transition-all duration-300 font-semibold font-mono flex flex-col flex-grow h-screen max-h-screen overflow-y-auto'>
            <div><FaArrowLeft onClick={() => setOpen(!isOpen)} className='scale-125 cursor-pointer hover:opacity-75 2xl:h-8 2xl:w-8 transition-all duration-300' color='white'/></div>
            <div id="timerInput">
                <div className='font-semibold text-white py-1'>
                    Input Time (hh:mm:ss)
                </div>
                <TimeInput className='' sendTimeInput={sendTimeInput}/>
            </div>
            <div>
                <div className='font-semibold text-white py-1'>
                    Preset Input
                </div>
                <button className='hover:border-white active:bg-[#60cbc4] bg-[#73f3eb] border-black border-2 rounded-md w-20 py-1 mx-2 my-1 font-semibold font-mono' onClick={onClickFive}>5:00</button>
                <button className='hover:border-white active:bg-[#60cbc4] bg-[#73f3eb] border-black border-2 rounded-md w-20 py-1 mx-2 my-1 font-semibold font-mono' onClick={onClickFour}>4:00</button>
            </div>
            <div>
                <div className='font-semibold text-white py-2'>
                    Preset Increments
                </div>
                <button className='hover:border-white active:bg-[#60cbc4] bg-[#73f3eb] border-black border-2 rounded-md   mx-2  font-bold h-9 w-20  ' onClick={onClickIncrement}>+</button>
                <button className='hover:border-white active:bg-[#60cbc4] bg-[#73f3eb] border-black border-2 rounded-md   mx-2  font-bold h-9 w-20  ' onClick={onClickDecrement}>-</button>
                <div onChange={onChangeValue} className='text-white font-semibold font-mono py-2'>
                    <input type="radio" value="00:00:15" defaultChecked name="radioVal" className="w-4 h-4 accent-[#73f3eb]" /> 15s
                    <input type="radio" value="00:00:30" name="radioVal" className="w-4 h-4 accent-[#73f3eb]"/> 30s
                    <input type="radio" value="00:00:45" name="radioVal" className="w-4 h-4 accent-[#73f3eb]"/> 45s
                    <input type="radio" value="00:01:00" name="radioVal" className="w-4 h-4 accent-[#73f3eb]"/> 1m
                </div>
            </div>
            <div id="mode1">
                <div className='text-white font-semibold py-2'>
                    Auto Reset
                </div>
                <ToggleSlider onToggle={state => setResetActive(state)} draggable={false} barBackgroundColorActive={"#73f3eb"} active={resetActive} />
                {/* <input type="checkbox" onChange={state => setResetActive(state)}/> */}
            </div>

            <div id="mode2">
                <div className='text-white font-semibold py-2'>
                    Auto Start
                </div>
                {/* <input type="checkbox" onChange={state => setRestartActive(state)}/> */}
                <ToggleSlider onToggle={state => setRestartActive(state)} draggable={false} barBackgroundColorActive={"#73f3eb"} active={restartActive}/>
            </div>
            <div>
                <div className='text-white font-semibold py-2'>
                    Timer Warnings
                </div>
                <div className='text-white font-semibold py-2'>
                    warning Beep (@5s)
                    <ToggleSlider className="mx-2 w-4 h-4" barBackgroundColorActive={"#73f3eb"} draggable={false} defaultChecked onToggle={state => setWarningBeep(state)} active={warningBeep}/>
                </div>
                {/* <TimeInput className='' sendTimeInput={sendBeepWarningInput}/> */}
                <div className='text-white font-semibold py-2'>
                    warning color (Red)
                    <ToggleSlider className="mx-2 w-4 h-4" barBackgroundColorActive={"#73f3eb"} draggable={false} onToggle={state => setWarningcolor(state)} active={warningColor}/>
                </div>
                <TimeInput className='' sendTimeInput={sendColorWarningInput}/>
            </div>
            <div className="h-24 w-48">
                <img src="../diagonal-logo-white.png" alt="Full Logo UTB"></img>
            </div>
        </div>
        </Transition>
    </div>
    );
}
export default Sidebar;