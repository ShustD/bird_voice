import React from "react";
import { NavLink } from "react-router-dom";
import s from './SelectUsers.module.css'

export const SelectUsers = () => {

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper_body}>
                <div className={s.container}>
                    <NavLink to='/signup'>
                        <div className={s.scientist_body}>
                            <div>scientist</div>
                        </div>
                    </NavLink>
                    <NavLink to='/signup'>
                        <div className={s.volunteer_body}>
                            <div>volunteer</div>
                        </div>
                    </NavLink>

                </div>
                <div className={s.upperCloud}></div>
                <div className={s.uuderCloud}></div>
            </div>
        </div>
    )
}