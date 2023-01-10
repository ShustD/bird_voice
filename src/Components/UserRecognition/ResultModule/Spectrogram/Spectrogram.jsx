import React from "react";
import s from './Spectrogram.module.scss'
import spec from '../../../../assets/UserRecognition/bigspec.jpg'

export const Spectrogram = (props) => {

    return (
        <div className={s.spectrogram__container}>
            <div className={s.spectrogram__content}>
                <div className={s.spectrogram__header}>
                    <div onClick={props.setIsBigSpectrogram} className={s.btn__exit}></div>
                </div>
                <div className={s.spectogram__img}>
                    <img src={spec} alt="" />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}