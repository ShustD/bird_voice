import React, {useState} from "react";
import s from './BoxInfo.module.scss'



export const BoxInfo = (props) => {
    const arr = Object.entries(props)
    const got = arr.map((e, index) => (
        <Info key={index} one={e[0]} two={e[1]} />
    ))
    return (
        <div className={s.box}>
            <div className={s.title}>Bird</div>
            {got}
        </div>
    )
}

const Info = ({one, two}) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div>
            <div onClick={() => setIsActive(!isActive)} className={s.name__content}>{one} 
            <span className={isActive ? s.arrow__up : s.arrow__down}></span></div>
            {isActive && <div className={s.content}>{two}</div>}
        </div>
    )
}