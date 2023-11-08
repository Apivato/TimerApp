import {FaBars} from "react-icons/fa";
import React, { useState } from "react";
import TimeInput from "../TimeInput";
import { ToggleSlider } from "react-toggle-slider";


const Sidebar = () => {
    const [isOpen, setOpen] = useState(false)
    const [mode1Active, isMode1Active] = useState(false);
    const [mode2Active, isMode2Active] = useState(false);



    return(

    <div className="">
        <FaBars onClick={() => setOpen(!isOpen)} className='cursor-pointer hover:opacity-75 h-8 w-8 ' color='white'/>
        {isOpen && (
        <ul className="fixed transition-all scale-125 px-30 m-8 bg-opacity-50 bg-black rounded">

            <li id="timerInput" className="">
                <div className="font-semibold text-white py-2">
                    Input Time
                </div>
                <TimeInput />
            </li>

            <li id="mode1">
                <div className="text-white font-semibold py-2">
                    Mode 1
                </div>
                <ToggleSlider draggable={false} barBackgroundColorActive={"#73f3eb"} />
            </li>

            <li id="mode2">
                <div className="text-white font-semibold py-2">
                    Mode 2
                </div>
                <ToggleSlider draggable={false} barBackgroundColorActive={"#73f3eb"} padding/>
            </li>

        </ul>
        )}

    </div>
    );
}

export default Sidebar;