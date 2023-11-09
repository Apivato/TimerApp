import {FaBars} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import TimeInput from "../TimeInput";
import { ToggleSlider } from "react-toggle-slider";


const Sidebar = ({sideBarToTimer, toggleReset, toggleRestart}) => {
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
        <FaBars onClick={() => setOpen(!isOpen)} className='cursor-pointer hover:opacity-75 md:h-8 md:w-8 ' color='white'/>
        {isOpen && (
        <ul className="fixed transition-all md:scale-125 px-30 md:m-8 bg-opacity-50 bg-black rounded font-semibold font-mono ">

            <li id="timerInput" className="">
                <div className="font-semibold text-white py-2">
                    Input Time
                </div>
                <TimeInput sendTimeInput={sendTimeInput}/>
            </li>

            <li id="mode1">
                <div className="text-white font-semibold py-2">
                    Auto Reset
                </div>
                <ToggleSlider onToggle={state => setResetActive(state)} draggable={false} barBackgroundColorActive={"#73f3eb"} active={false} />
            </li>

            <li id="mode2">
                <div className="text-white font-semibold py-2">
                    Auto Restart
                </div>
                <ToggleSlider onToggle={state => setRestartActive(state)} draggable={false} barBackgroundColorActive={"#73f3eb"} padding/>
            </li>
            {/* <li className="text-white">
                <h4>Instructions Manual</h4>
                <p>
                    This timer functions as a countdown clock starting from what ever input start time you give it.  
                    This being either one of the preset buttons, value from the input, or any combination or increments you submit while the timer
                    is not running.

                    if an input, preset, or increment of time is given while it is running it will not keep that time as a start time and reset to it when you reset.  
                    It will assume that any changes while running is a temporary change for that run of the timer.

                    The auto reset switch will allow the timer to auto rest when the current run of the timer ends.

                    The Auto Restart switch will allow the timer to loop indefinetly until the switch is turned off or the stop button is pressed.

                </p>
            </li> */}

        </ul>
        )}

    </div>
    );
}
export default Sidebar;