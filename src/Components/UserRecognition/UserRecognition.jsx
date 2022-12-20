import React, { useState} from "react";
import s from './UserRecognition.module.css'
import { AudioModule } from "./AudioModule/AudioModule";
import { ResultModule } from "./ResultModule/ResultModule";

export const UserRecognition = () => {
    const [openRecognitionBox, setOpenRecognitionBox] = useState(true)
    const [birdImage, setBirdImage] = useState(null)
    const [birdName, setBirdName] = useState(null)
    const changeState = (bool, image, name) => {
        setOpenRecognitionBox(bool)
        setBirdImage(image)
        setBirdName(name)
    }
    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.container}>
                    
                    <div className={s.tittle}>
                        recognition service
                    </div>
                    {openRecognitionBox ?  <AudioModule  changeState={changeState}/> 
                    : <ResultModule birdImage={birdImage} birdName={birdName} changeState={changeState}/>}     
                </div>
                <div className={s.upperCloud}></div>
                <div className={s.uuderCloud}></div>
            </div>
        </div>
    )
}