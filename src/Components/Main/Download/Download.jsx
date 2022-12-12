import React from "react";
import s from './Download.module.css'



export const Download = () => {
    return (
        <div className={s.body}>
                    <div className={s.discription}>
                        <div className={s.definition}>You can download the mobile version of our application to
                            be able to recognize the song of a particular bird at any time by simply launching the
                            application
                            Thanks to a simple interface and fast data loading, the application will become your
                            faithful assistant in the study of the rarest bird species
                        </div>
                      
                        <div className={s.animate}>
                            <div className={s.soundwaves}>
                                <span className={s.soundwaveone}/>
                                <span className={s.soundwavetwo}/>
                            </div>
                            <div className={s.soundwaves}>
                                <span className={s.soundwaveone}/>
                                <span className={s.soundwavetwo}/>
                            </div>
                            <div className={s.soundwaves}>
                                <span className={s.soundwaveone}/>
                                <span className={s.soundwavetwo}/>
                            </div>
                        </div>
                    </div>
                    <div className={s.advertising}>
                        <div className={s.title}>MOBILE APP</div>
                        <div className={s.advertising__content}>
                            <div className={s.text}>All the songs of birds in your mobile</div>
                            <button  className={s.button}>download app</button>
                        </div>
                    </div>
                                     
                </div>
                
    )
}