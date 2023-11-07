import {FaBars} from "react-icons/fa";
import React, { useState } from "react";
import TimeInput from "../TimeInput";



const Sidebar = () => {
    const [isOpen, setOpen] = useState(false)



    return(

    <div>
        <FaBars onClick={() => setOpen(!isOpen)} className='cursor-pointer' color='white'/>
        {isOpen && (


            <div id="timerInput" className='fixed'>
                <TimeInput />
            </div>
        )}

    </div>
    );
}

export default Sidebar;