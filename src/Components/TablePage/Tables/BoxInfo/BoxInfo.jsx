import React, { useState } from "react";
import s from './BoxInfo.module.scss'



export const BoxInfo = (props) => {
    const [isActive, setIsActive] = useState(false);
    const arr = Object.entries(props)
    const got = arr.map((e, index) => (
        <Info key={index} one={e[0]} two={e[1]} />
    ))
    return (
        <div className={s.box}>
            <div className={s.title} onClick={() => setIsActive(false)}>Bird</div>
            {isActive && <span className={s.arrow__up}></span>}
           {isActive ? got : 
                <div className={s.box__id} onClick={() => setIsActive(true)}>
                    <div>ID</div>
                    <div>{props.id}</div>
                    <span className={s.arrow__down}></span>
                </div>
            }
        </div>
    )
}

const Info = ({ one, two }) => {

    return (
        <>
            <div className={s.name__content}>{one}</div>
            <div className={s.content}>{two}</div>
        </>
    )
}