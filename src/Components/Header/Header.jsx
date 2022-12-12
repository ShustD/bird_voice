import React, { useState } from 'react'
import s from './Header.module.css'
import headerLogo from '../../assets/main/header.svg'
import button from '../../assets/SignIn/ButtonBack.png'
import setting from '../../assets/UserRecognition/setting.png'
import photo from '../../assets/UserRecognition/userlogo.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

export const Header = ({ user = 'User', userLogo = photo }) => {

    const [dropMenu, setDropMenu] = useState(false)
    const locate = useLocation()
    const path = locate.pathname
    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const navbar = () => {
        switch (path) {
            case '/': {
                return (<div className={s.header__button}>
                    <NavLink to='/signup'><button className={s.button__up}>sign up</button></NavLink>
                    <NavLink to='/signin'><button className={s.button__in}>sign in</button></NavLink>
                </div>)
            }
            case '/tablespage': {
                return (
                    <div className={s.header_container}>
                        <div className={s.menu_container}>
                            <div onClick={() => setDropMenu(!dropMenu)} className={dropMenu ? s.menu_vis : s.menu}>
                                <div>Menu</div>
                                <div className={dropMenu ? s.arrow_vis : s.arrow}>
                                    <div className={dropMenu ? s.arrow_up : s.arrow_down}></div>
                                </div>
                            </div>
                            <div className={dropMenu ? s.menu_drop_vis : s.menu_drop}>
                                <NavLink onClick={() => setDropMenu(false)} to='/'>
                                    <div className={s.drop_item}>
                                        main page
                                    </div>
                                </NavLink>
                                <NavLink onClick={() => setDropMenu(false)} to='/userrecognition'>
                                    <div className={s.drop_item}>
                                        recognize service
                                    </div>
                                </NavLink>

                            </div>
                        </div>

                        <div className={s.userHi}>
                            <div>
                                <img className={s.user_logo} src={userLogo} alt="" />
                            </div>
                            <div> Hello, {user}!</div>
                            <div>
                                <img src={setting} alt="" />
                            </div>
                        </div>
                    </div>
                )
            }
            case '/userrecognition': {
                return (
                    <div className={s.header_container}>
                        <div className={s.menu_container}>
                            <div onClick={() => setDropMenu(!dropMenu)} className={dropMenu ? s.menu_vis : s.menu}>
                                <div>Menu</div>
                                <div className={dropMenu ? s.arrow_vis : s.arrow}>
                                    <div className={dropMenu ? s.arrow_up : s.arrow_down}></div>
                                </div>
                            </div>
                            <div className={dropMenu ? s.menu_drop_vis : s.menu_drop}>
                                <NavLink onClick={() => setDropMenu(false)} to='/'>
                                    <div className={s.drop_item}>
                                        main page
                                    </div>
                                </NavLink>
                                <NavLink onClick={() => setDropMenu(false)} to='/tablespage'>
                                    <div className={s.drop_item}>
                                        collection
                                    </div>
                                </NavLink>

                            </div>
                        </div>

                        <div className={s.userHi}>
                            <div>
                                <img className={s.user_logo} src={userLogo} alt="" />
                            </div>
                            <div> Hello, {user}!</div>
                            <div>
                                <img src={setting} alt="" />
                            </div>
                        </div>
                    </div>
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
                {/* {path==='/' ?
                <div className={s.header__button}>
                <NavLink to='/signup'><button className={s.button__up}>sign up</button></NavLink> 
                <NavLink to='/signin'><button className={s.button__in}>sign in</button></NavLink>
            </div>
                :  <NavLink onClick={goBack}><img src={button} alt="" /></NavLink>} */}
            </div>
        </div>
    )
}