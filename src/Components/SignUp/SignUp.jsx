import React, { useEffect } from 'react'
import s from './SignUp.module.scss'
import { Formik, Field, Form } from 'formik';
import invis from '../../assets/SignUp/invisible.png'
import vis from '../../assets/SignUp/visible.png'
import { useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, resetAuthError } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
    const [passVis, setPassVis] = useState(false)
    const passType = passVis ? 'text' : 'password'
    const passIcon = passVis ? vis : invis
    const { statusCreate, error, isAuth } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Field is required'),
        email: Yup.string().email('Invalid email').required('Field is required'),
        password: Yup.string().required('Field is required'),
        first_name: Yup.string().required('Field is required'),
        last_name: Yup.string().required('Field is required'),
    });
    const handleSubmit = (values) => {
        dispatch(createUser(values))
    }
    useEffect(() => {
        dispatch(resetAuthError())
    }, [dispatch])

    useEffect(() => {        
        if (isAuth) {
           navigate('/userrecognition')
       }   
       }, [isAuth, navigate])
    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.container}>

                    <div className={`${s.content} ${statusCreate === 'loading' ? s.animate : ''}`}>
                        <div className={s.birds}></div>
                        <div className={s.formSignUp}>
                            <div className={s.formTittle}>Sign Up</div>
                            <div>
                                <Formik

                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        handleSubmit(values)
                                    }}>
                                    {({ touched, errors, values, setFieldValue }) => (
                                        <Form className={s.form}>
                                            <label htmlFor="username">name</label>
                                            <div className={s.inputField}>
                                                <Field name="username"
                                                    className={errors.username ? s.inputError : null}
                                                    type="text" />
                                            </div>
                                            {errors.username ? <div className={s.error}>{errors.username}</div> : null}
                                            <label htmlFor="email">email</label>
                                            <div className={s.inputField}>
                                                <Field
                                                    className={errors.email ? s.inputError : null}
                                                    id="email"
                                                    name="email"
                                                    type="text" />
                                            </div>
                                            {errors.email ? <div className={s.error}>{errors.email}</div> : null}
                                            <label htmlFor="password">password</label>
                                            <div className={s.inputField}>
                                                <Field
                                                    name="password"
                                                    className={errors.password ? s.inputError : null}
                                                    type={passType}
                                                /> <i onClick={() => setPassVis(!passVis)}>
                                                    <img className={s.vis} src={passIcon} alt="" /></i>
                                            </div>
                                            {errors.password ? <div className={s.error}>{errors.password}</div> : null}
                                            <label htmlFor="first_name">First name</label>
                                            <div className={s.inputField}>
                                                <Field name="first_name"
                                                    className={errors.first_name ? s.inputError : null}
                                                    type="text" />
                                            </div>
                                            {errors.first_name ? <div className={s.error}>{errors.first_name}</div> : null}
                                            <label htmlFor="last_name">Last name</label>
                                            <div className={s.inputField}>
                                                <Field name="last_name"
                                                    className={errors.last_name ? s.inputError : null}
                                                    type="text" />
                                            </div>
                                            {errors.last_name ? <div className={s.error}>{errors.last_name}</div> : null}
                                            {error ? <div style={{color: 'red'}}>{error}</div> : null}
                                            <button disabled={statusCreate === 'loading' ? true : false} className={s.signBtn} type="submit">sign up</button>
                                        </Form>
                                    )}
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