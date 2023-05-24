import React from "react";
import s from './Loader.module.scss'
import preloader from './preloader.png'

export const Loader = () => {

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.hui}>
                    <div className={s.container}>
                        <div className={s.preloader_body}><img className={s.preloader} src={preloader} alt="" /></div>
                    </div>
                    <div className={s.upperCloud}></div>
                    <div className={s.uuderCloud}></div>
                </div>

            </div>


        </>

    )
}