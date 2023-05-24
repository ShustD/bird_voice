import React from 'react'
import s from './UpperBlock.module.scss'
import { ReactComponent as VectorBtn } from '../../../assets/main/Vector.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export const UpperBlock = () => {
    const { isAuth } = useSelector(state => state.auth)
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
                        {
                            isAuth &&
                            <div id='try' className={s.try}>
                                <Link to='/userrecognition'><button className={s.button__try}>try it <VectorBtn /></button></Link>
                            </div>
                        }

                    </div>
                </div>
                <div className={s.upperCloud}></div>
            </div>
        </div>
    )
}