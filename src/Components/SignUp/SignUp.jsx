import React from 'react'
import s from './SignUp.module.css'
import { Formik, Field, Form } from 'formik';
import invis from '../../assets/SignUp/invisible.png'
import vis from '../../assets/SignUp/visible.png'
import { useState } from 'react';


export const SignUp = (props) => {
    const [passVis, setPassVis] = useState(false)
    const passType = passVis ? 'text' : 'password'
    const passIcon = passVis ? vis : invis
    const [repeatPassVis, setrepeatPassVis] = useState(false)
    const repeatPassType = repeatPassVis ? 'text' : 'password'
    const repeatPassIcon = repeatPassVis ? vis : invis

    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.container}>

                    <div className={s.content}>
                        <div className={s.birds}></div>
                        <div className={s.formSignUp}>
                            <div className={s.formTittle}>Sign Up</div>
                            <div>
                                <Formik
                                    initialValues={{
                                        name: '',
                                        email: '',
                                        password: '',
                                        repeatPassword: ''
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

                                        <label htmlFor="password">password</label>
                                        <div className={s.inputField}>
                                            <Field
                                                name="password"
                                                type={passType}
                                            /> <i onClick={() => setPassVis(!passVis)}>
                                                <img className={s.vis} src={passIcon} alt="" /></i>
                                        </div>

                                        <label htmlFor="repeatPassword">repeat password</label>
                                        <div className={s.inputField}>
                                            <Field
                                                name="repeatPassword"
                                                type={repeatPassType}
                                            /> <i onClick={() => setrepeatPassVis(!repeatPassVis)}>
                                                <img className={s.vis} src={repeatPassIcon} alt="" /></i>
                                        </div>


                                        <button className={s.signBtn} type="submit">sign up</button>
                                    </Form>
                                </Formik>
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