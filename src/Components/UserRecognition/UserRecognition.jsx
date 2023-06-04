import React from "react";
import s from './UserRecognition.module.scss'
import { AudioModule } from "./AudioModule/AudioModule";
import { ResultModule } from "./ResultModule/ResultModule";
import { useSelector } from "react-redux";
import { ResultModuleNew } from "./ResultModule/ResultModuleNew";

export const UserRecognition = () => {
    const { status } = useSelector(state => state.recognize)

    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.container}>
                    
                    <div className={s.tittle}>
                        recognition service
                    </div>
                    {status !== 'succeeded' ?  <AudioModule  /> 
                    : <ResultModuleNew />}     
                </div>
                <div className={s.upperCloud}></div>
                <div className={s.uuderCloud}></div>
            </div>
        </div>
    )
}