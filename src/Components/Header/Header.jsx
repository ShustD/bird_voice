import React from 'react'
import s from './Header.module.scss'
import headerLogo from '../../assets/main/header.svg'
import button from '../../assets/SignIn/ButtonBack.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { HeaderDropDownMenu } from './HeaderDropDown/HeaderDropDown'

export const Header = () => {

    const locate = useLocation()
    const path = locate.pathname
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    
    const navbar = () => {
        switch (path) {
            case '/': {
                return (<div className={s.header__button}>
                    <NavLink to='/selectusers'><button className={s.button__up}>sign up</button></NavLink>
                    <NavLink to='/signin'><button className={s.button__in}>sign in</button></NavLink>
                </div>)
            }
            case '/userrecognition': case '/tablespage': {
                return (
                    <HeaderDropDownMenu />
                )
            }

            default: {
                return (
                    <NavLink onClick={goBack}><img src={button} alt="" /></NavLink>
                )
            }
        }
    }

    return (
        <div className={s.header__container}>
            <div className={s.header__body}>
                <div className={s.header__logo}>
                    <NavLink to='/'><img src={headerLogo} alt="#" /></NavLink>
                </div>
                {navbar()}

            </div>
        </div>
    )
}