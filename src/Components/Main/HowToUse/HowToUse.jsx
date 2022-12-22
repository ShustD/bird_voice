import React from 'react'
import s from './HowToUse.module.scss'
import howToUseIMG from '../../../assets/HowToUse/Photo.jpg'

export const HowToUse = () => {
    return (
        <div className={s.howToUse}>
            <div className={s.howToUse__leftBlock}>
                <div className={s.howToUse__tittle}>
                    How to Use
                </div>
                <div className={s.howToUse__text}>
                    the service has a simple intuitive interface that
                    is easy to use and does not require special training
                </div>
                <div className={s.howToUse__list}>
                    <ul className={s.howToUse__ul}>
                        <li>Open the app in the browser</li>
                        <li>Download the audio file from your computer or cloud</li>
                        <li>Aenlaunch the recognition service and expect the result</li>
                    </ul>
                </div>
                <div className={s.howToUse__button}>
                    <button >try it right now</button>
                </div>
            </div>
            <div className={s.howToUse__rightBlock}>
                <div className={s.howToUse__img}>
                    <img src={howToUseIMG} alt="" />
                </div>
            </div>
        </div>
    )
}
