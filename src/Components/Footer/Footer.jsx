import React from 'react'
import './Footer.scss'
import img from '../../assets/Footer/Logo.png'
import facebook from '../../assets/Footer/facebook_icon.png'
import linked from'../../assets/Footer/linked_icon.png'
import telegram from '../../assets/Footer/telegram_icon.png'

export const Footer = () => {
    return (
        <div className='footer__container'>
            <div className='footer__bird footer__colomn'>
                <div className='footer__tittle'>
                    <img src={img} alt="" />
                </div>
                <a href="##">contact with developers</a>
                <a href="##">support@ssrlab.by</a>
            </div>
            <div className='footer__legal footer__colomn'>
                <div className='footer__tittle'>LEGAL</div>
                <a href="##">Term of Use</a>
                <a href="##">Privacy</a>
                <a href="##">Interest-Based Ads</a>
            </div>
            <div className='footer__join footer__colomn'>
                <div className='footer__tittle'>JOIN US</div>
                <a href="##">Suggest species</a>
                <a href="##">Become a volunteer</a>
                <a href="##">Become a part of our team</a>
            </div>
            <div className='footer__follow footer__colomn'>
                <div className='footer__tittle'>FOLLOW US</div>
                <div className='follow__img'>
                    <img src={linked} alt="" />
                    <img src={telegram} alt="" />
                    <img src={facebook} alt="" />
                </div>
            </div>
        </div>
    )
}