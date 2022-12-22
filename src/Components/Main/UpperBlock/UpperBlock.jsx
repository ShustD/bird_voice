import React from 'react'
import s from './UpperBlock.module.scss'
import vectorBtn from '../../../assets/main/Vector.svg'
import { Link } from 'react-router-dom'


export const UpperBlock = () => {
    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.upperBlock__container}>
                    <div className={s.tittle}>
                        <div className={s.tittle__up}>
                            Bird Voice
                        </div>
                        <div className={s.tittle__down}>
                            recognition service
                        </div>
                        <div id='try' className={s.try}>
                            <Link to='/userrecognition'><button className={s.button__try}>try it <img src={vectorBtn} alt="" /></button></Link>
                        </div>
                    </div>
                </div>
                <div className={s.upperCloud}></div>
            </div>
        </div>
    )
}