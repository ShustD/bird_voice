import React, { useState } from 'react'
import s from './SignIn.module.css'
import { Formik, Field, Form } from 'formik';
import { NavLink } from 'react-router-dom'
import invis from '../../assets/SignUp/invisible.png'
import vis from '../../assets/SignUp/visible.png'

export const SignIn = () => {
    const [passVis, setPassVis] = useState (false)
    const passType = passVis ? 'text' : 'password'
    const passIcon = passVis ? vis : invis
    
    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.container}>
                 
                    <div className={s.content}>
                        <div className={s.birds}></div>
                        <div className={s.formSignIn}>
                            <div className={s.formTittle}>Sign In</div>
                            <div>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: ''
                                    }}
                                    onSubmit={(values) => {
                                        console.log(values);
                                    }}>
                                    <Form className={s.form}>
                                        <label htmlFor="email">email</label>
                                        <div className={s.inputField}>
                                            <Field 
                                            name="email"
                                            type="email" />
                                        </div>
                                        <label htmlFor="password">password</label>
                                        <div className={s.inputField}>
                                            <Field
                                            name="password"
                                            type={passType}
                                        /> <i  onClick={() => setPassVis(!passVis)}>
                                        <img className={s.vis} src={passIcon} alt="" /></i>
                                        </div>
                                        <button className={s.signBtn} type="submit">sign in</button>
                                    </Form>
                                </Formik>
                            </div>
                            <div className={s.links}>
                                <NavLink to='/forgot'>forgot your password?</NavLink>
                                <NavLink to='/selectusers'>sign up</NavLink> 
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