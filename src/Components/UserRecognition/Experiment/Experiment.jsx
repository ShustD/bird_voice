import React, {useState} from "react"
import s from './ResultModule.module.css'
import btnBird from '../../../assets/UserRecognition/btnBird.png'
import coins from '../../../assets/UserRecognition/coins.png'
import littleBird from '../../../assets/UserRecognition/littleBird.png'
import bigBird from '../../../assets/UserRecognition/Rectangle 15.png'
import { ResultAudioPlayer } from "./AudioPlayer/ResultAudioPlayer"

export const ResultModule = (props) => {
    const isVisibleResultModule = (bool) => {
        props.changeState(bool)
    }

    return (
        <div className={s.resultModule}>
            <div className={s.recognitionBox}>
                <button onClick={() => isVisibleResultModule(true)} className={s.recognitionButton}>open recognition box <img src={btnBird} alt="" /> </button>
            </div>
            <div className={s.resultContainer}>
                <div className={s.topSection}>
                    <div className={s.sectionTittle}>
                        small cormorant
                    </div>
                </div>
                 <div className={s.middleSection}>

                </div>
            </div>
        </div>
    )
}