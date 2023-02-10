import React, { useState } from "react";
import s from './BoxInfo.module.scss'
import bird from './bird.png'



export const BoxInfo = (props) => {
    
    const [isActive, setIsActive] = useState(false);
    const arr = Object.entries(props)
    const got = arr.map((e, index) => (
        <Info key={index} one={e[0]} two={e[1]} />
    ))
    return (
        <div className={s.box}>
            {isActive &&
                <>
                    <div className={s.title} onClick={() => setIsActive(false)}>{props.englishName}</div>
                    <span className={s.arrow__up}></span>
                </>
            }
            {isActive ? got :
                <div className={s.box__id} onClick={() => setIsActive(true)}>
                    <div className={s.box__img}>
                        <img src={bird} alt="" />
                    </div>
                    <div>
                        <div className={s.content__title}>{props.englishName}</div>
                        <div className={s.box__content}>
                            <div>ID</div>
                            <div className={s.content__id}>{props.id}</div>
                        </div>
                        <span className={s.arrow__down}></span>
                    </div>

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