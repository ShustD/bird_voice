import React from "react";
import s from './ScientCode.module.scss'

export const ScientCode = () => {

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper_body}>
                <div className={s.code_container}>
                    <div className={s.code_card}>
                        <div className={s.card_title}>
                            Please enter a special code to access scientific materials!
                        </div>
                        <div className={s.card_text}>
                            We will send the code to the email address specified in the registration formWe will send the code to the email address specified in the registration form
                        </div>
                    </div>
                </div>
                <div className={s.upperCloud}></div>
                <div className={s.uuderCloud}></div>
            </div>
        </div>
    )
}