import React from 'react'
import s from './Header.module.scss'
import headerLogo from '../../assets/main/header.svg'
import button from '../../assets/SignIn/ButtonBack.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { HeaderDropDownMenu } from './HeaderDropDown/HeaderDropDown'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'

export const Header = () => {
    const dispatch = useDispatch()
    const { isAuth } = useSelector(state => state.auth)
    const locate = useLocation()
    const path = locate.pathname
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    
    const navbar = () => {
        switch (path) {
            
            case '/userrecognition': 
            case '/collectiontable':
            case '/deletetable':
            case '/newfilestable':
            case '/statisticstable': {
                return (
                    <HeaderDropDownMenu />
                )
            }
            case '/settingspage':
            case '/tableadd': {
                return (
                    <NavLink onClick={goBack}><img src={button} alt="" /></NavLink>
                )                    
            }
            default: {
                return (
                    isAuth ? <div className={s.header__button}>
                    <button onClick={() => dispatch(logout())} className={s.button__up}>log out</button>
                    </div> : <div className={s.header__button}>
                    <NavLink to='/signup'><button className={s.button__up}>sign up</button></NavLink>
                    <NavLink to='/signin'><button className={s.button__in}>sign in</button></NavLink>
                </div>
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