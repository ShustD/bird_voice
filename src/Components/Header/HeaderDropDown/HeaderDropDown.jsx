import React, { useState, useEffect, useRef } from 'react'
import s from './HeaderDropDown.module.scss'
import setting from '../../../assets/UserRecognition/setting.png'
import photo from '../../../assets/UserRecognition/userlogo.png'
import { NavLink, useLocation } from 'react-router-dom'

export const HeaderDropDownMenu = ({ user = 'User', userLogo = photo }) => {

    const [dropMenu, setDropMenu] = useState(false)
    const dropMenuRef = useRef(null)
    const [mobileMenu, setMobileMenu] = useState(false)
    const mobileMenuRef = useRef(null)
    const locate = useLocation()
    const path = locate.pathname
    useEffect(() => {
        if (!dropMenu) return

        const handleClick = (e) => {
            if (!dropMenuRef.current) return
            if (!dropMenuRef.current.contains(e.target)) {
                setDropMenu(false)
            }
        }
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [dropMenu])
    useEffect(() => {
        if (!mobileMenu) return

        const handleClick = (e) => {
            if (!mobileMenuRef.current) return
            if (!mobileMenuRef.current.contains(e.target)) {
                setMobileMenu(false)
            }
        }
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [mobileMenu])
    return (
        <>
            <div className={s.header_container}>
                <div ref={dropMenuRef} className={s.menu_container}>
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
                        <NavLink onClick={() => setDropMenu(false)}
                            to={path === '/userrecognition' ? '/tablespage' : '/userrecognition'}>
                            <div className={s.drop_item}>
                                {path === '/userrecognition' ? 'collection'
                                    : 'recognize service'}
                            </div>
                        </NavLink>

                    </div>
                </div>

                <div className={s.userHi}>
                    <div>
                        <img className={s.user_logo} src={userLogo} alt="" />
                    </div>
                    <div className={s.user_text}> Hello, {user}!</div>
                    <div className={s.user_settings}>
                        <NavLink onClick={() => setDropMenu(false)}
                            to='/settingspage'>
                            <img className={s.user_logo} src={setting} alt="" />
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className={mobileMenu ? s.bar__background : s.mobile__menu}>
                <div ref={mobileMenuRef} className={s.mobile__menu}>
                    <div className={!mobileMenu ? s.burger__menu : s.burger__menu_invis} onClick={() => setMobileMenu(true)}>
                        <i className='material-icons'> menu</i>
                    </div>

                    <div className={mobileMenu ? s.side__bar : s.side__bar_invis}>
                        <i onClick={() => setMobileMenu(false)} className='material-icons'>close</i>
                        <div className={s.side__user}>
                            <div>
                                <img className={s.user_logo} src={userLogo} alt="" />
                            </div>
                            <div className={s.user_text}> Hello, {user}!</div>
                        </div>
                        <NavLink onClick={() => setMobileMenu(false)} to='/tablespage'>
                            <div className={s.drop_item}>
                                Collection
                            </div>
                        </NavLink>
                        <NavLink onClick={() => setMobileMenu(false)} to='/userrecognition'>
                            <div className={s.drop_item}>
                                Recognize service
                            </div>
                        </NavLink>
                        <NavLink onClick={() => setMobileMenu(false)} to='/settingspage'>
                            <div className={s.drop_item}>
                                My account
                            </div>
                        </NavLink>
                        <NavLink onClick={() => setDropMenu(false)} to='/'>
                            <div className={s.drop_item}>
                                Main Page
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}