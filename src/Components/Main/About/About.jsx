import React from 'react'
import s from './About.module.css'
import aboutUsPic1 from '../../../assets/about us/illustration.png'
import aboutUsPic2 from '../../../assets/about us/illustration1.png'
import aboutUsPic3 from '../../../assets/about us/illustration2.png'

export const About = () => {
    return (
        <div className={s.about}>
                <div className={s.about_tittle}>About Us</div>
                <div className={s.about__text}>
                    Our service, thanks to a new unique technology, helps to recognize and determine by the sounds
                    reproduced by a particular bird, its name, species, family, habitat. You will be able to see its image,
                    learn new interesting information, find out how many beautiful and rare birds live near you, right in your park.
                </div>
                <div className={s.about__services}>
                    <div className={s.service__card}>
                        <div className={s.card__img}><img src={aboutUsPic1} alt="" /></div>
                        <div className={s.card__text}>Easy interaction with the interface</div>
                    </div>
                    <div className={s.service__card}>
                        <div className={s.card__img}><img src={aboutUsPic2} alt="" /></div>
                        <div className={s.card__text}>Large scientific database
                            with update</div>
                    </div>
                    <div className={s.service__card}>
                        <div className={s.card__img}><img src={aboutUsPic3} alt="" /></div>
                        <div className={s.card__text}>Resource for getting new knowledge</div>
                    </div>
                </div>
            </div>
    )
}
