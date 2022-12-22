import React from "react";
import { Link } from "react-router-dom";
import s from './Letter.module.scss'

export const Letter = () => {
    return (
        <div className={s.wrapper}>
        <div>
            <div className={s.container}>
            
                <div className={s.content}>
                    <div className={s.birds}></div>
                    <div className={s.formForgot}>
                        <div className={s.formTittle}>The letter has been sent!</div>
                        <div className={s.formText}>
                        Please check your mailbox, there you will find information about 
                        changing your password
                        </div>
                        <div className={s.button}>
                            <Link to='/'>
                                <button className={s.signBtn} type="submit">go back to the main page</button></Link>
                        </div>
                        <div className={s.formText}>the letter will arrive within 1-3 minutes</div>
                    </div>
                </div>
            </div>
            <div className={s.upperCloud}></div>
            <div className={s.uuderCloud}></div>
        </div>
        
    </div>
    )
}