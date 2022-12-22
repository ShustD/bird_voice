import React from "react";
import { Formik, Field, Form } from 'formik';
import s from './Forgot.module.scss'
import { Link } from "react-router-dom";

export const Forgot = () => {
    
    return (
        <div className={s.wrapper}>
        <div>
            <div className={s.container}>
            
                <div className={s.content}>
                    <div className={s.birds}></div>
                    <div className={s.formForgot}>
                        <div className={s.formTittle}>forgot your password?</div>
                        <div className={s.formText}>
                        please write the email specified during registration, 
                        we will send you an email to change your password
                        </div>
                        <div>
                            <Formik
                                initialValues={{
                                    email: '',
                                }}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}>
                                <Form className={s.form}>
                                    <label htmlFor="email">email</label>
                                    <Field className={s.email}
                                        name="email"
                                        type="email" />
                                    <Link to='/letter'><button className={s.signBtn} type="submit">sign in</button></Link> 
                                </Form>
                            </Formik>
                        </div>
                        <div className={s.formText}>the letter will arrive within 1-3 minutes</div>
                    </div>
                </div>
            </div>
            <div className={s.upperCloud}></div>
            <div className={s.uuderCloud}></div>
        </div>
        
    </div>
    )
}