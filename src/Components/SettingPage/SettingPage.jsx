import React, { useEffect } from "react";
import s from './SettingPage.module.scss'
import { Formik, Field, Form } from 'formik';
import invis from '../../assets/SignUp/invisible.png'
import vis from '../../assets/SignUp/visible.png'
import { useState } from 'react';
import bird from '../../assets/settings/bird.png'
import { useDispatch, useSelector } from "react-redux";
import { addPhoto } from "../../store/authSlice";
import noAvatar from '../../assets/settings/avatar.png'



export const SettingPage = () => {
    const [passVis, setPassVis] = useState(false)
    const passType = passVis ? 'text' : 'password'
    const passIcon = passVis ? vis : invis
    const [repeatPassVis, setrepeatPassVis] = useState(false)
    const repeatPassType = repeatPassVis ? 'text' : 'password'
    const repeatPassIcon = repeatPassVis ? vis : invis
    const [avatar, setAvatar] = useState(null)
    const dispatch = useDispatch()
    const { avatarUrl } = useSelector(state => state.auth)

    const deletePhoto = () => {
        dispatch(addPhoto(''))
        setAvatar(null)
    }
    useEffect(() => {
        if(avatar) {
            dispatch(addPhoto(avatar))
        }
    }, [avatar, dispatch])

    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.container}>
                    <div className={s.form_container}>
                        <div>
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                    repeatPassword: '',
                                    phoneNumber: '',
                                    workplace: ''
                                }}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}>
                                <Form className={s.form}>
                                    <label htmlFor="name">name</label>
                                    <div className={s.inputField}>
                                        <Field name="name"
                                            type="text" />
                                    </div>

                                    <label htmlFor="email">email</label>
                                    <div className={s.inputField}>
                                        <Field id="email"
                                            name="email"
                                            type="email" />
                                    </div>

                                    <label htmlFor="password"> old password</label>
                                    <div className={s.inputField}>
                                        <Field
                                            name="password"
                                            autoComplete='true'
                                            type={passType}
                                        /> <i onClick={() => setPassVis(!passVis)}>
                                            <img className={s.vis} src={passIcon} alt="" /></i>
                                    </div>

                                    <label htmlFor="repeatPassword">new password</label>
                                    <div className={s.inputField}>
                                        <Field
                                            name="repeatPassword"
                                            autoComplete='true'
                                            type={repeatPassType}
                                        /> <i onClick={() => setrepeatPassVis(!repeatPassVis)}>
                                            <img className={s.vis} src={repeatPassIcon} alt="" /></i>
                                    </div>
                                    <label htmlFor="phoneNumber">phone number</label>
                                    <div className={s.inputField}>
                                        <Field name="phoneNumber"
                                            type="tel" />
                                    </div>

                                    <label htmlFor="workplace">phone number</label>
                                    <div className={s.inputField}>
                                        <Field name="workplace"
                                            type="tel" />
                                    </div>


                                    <button className={s.signBtn} type="submit">save changes</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                    <div className={s.profile_container}>
                        <div className={s.profile_content}>
                            <img className={s.main_photo}
                                src={avatarUrl ? `https://bird-sounds-database.ssrlab.by${avatarUrl}` : noAvatar} alt="" />
                            <img className={s.upper_bird} src={bird} alt="" />
                            <div className={s.photo_set}>
                                <div>
                                    <img className={s.little_photo}
                                        src={avatarUrl ? `https://bird-sounds-database.ssrlab.by${avatarUrl}` : noAvatar} alt="" />
                                </div>
                                <div className={s.little_text}>
                                    <label className={s.button__up} htmlFor="audiorecord_local">change photo</label>
                                    <input
                                        id="audiorecord_local"
                                        name="audiorecord_local"
                                        type="file"
                                        onChange={(e) => {
                                            setAvatar(e.target.files[0]);
                                        }}
                                    />
                                    <div className={s.button__in} onClick={() => deletePhoto()}>delete a photo</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={s.upperCloud}></div>
                <div className={s.uuderCloud}></div>
            </div>

        </div>

    )
}