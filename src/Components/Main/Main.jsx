import React from "react";
import s from './Main.module.css'
import { Download } from "./Download/Download";
import { Mail } from "./Mail/Mail";

import { UpperBlock } from "./UpperBlock/UpperBlock";
import { About } from "./About/About";
import { HowToUse } from "./HowToUse/HowToUse";


export const Main = () => {

    return (
        <div className={s.main}>
            <UpperBlock />
            <About />
            <HowToUse />            
            <Download />
            <Mail />
        </div>
    )
}