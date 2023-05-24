import React, { useEffect, useState } from 'react'
import s from './SignIn.module.scss'
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom'
import invis from '../../assets/SignUp/invisible.png'
import vis from '../../assets/SignUp/visible.png'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';

export const SignIn = () => {
    const dispatch = useDispatch()
    const { statusLogin, isAuth, error } = useSelector(state => state.auth)
    const [passVis, setPassVis] = useState (false)
    const navigate = useNavigate()
    const passType = passVis ? 'text' : 'password'
    const passIcon = passVis ? vis : invis
    const initialValues = {
        username: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Field is required'),
        password: Yup.string().required('Field is required'),
    });
    const handleSubmit = async (values) => {
        dispatch(loginUser(values))
    }
    
    useEffect(() => {        
     if (isAuth) {
        navigate('/userrecognition')
    }   
    }, [isAuth, navigate])
    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.container}>
                 
                    <div className={`${s.content} ${statusLogin === 'loading' ? s.animate : ''}`}>
                        <div className={s.birds}></div>
                        <div className={s.formSignIn}>
                            <div className={s.formTittle}>Sign In</div>
                            <div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        handleSubmit(values);
                                    }}>
                                    <Form className={s.form}>
                                        <label htmlFor="username">name</label>
                                        <div className={s.inputField}>
                                            <Field 
                                            name="username"
                                            type="text" />
                                        </div>
                                        <label htmlFor="password">password</label>
                                        <div className={s.inputField}>
                                            <Field
                                            name="password"
                                            type={passType}
                                        /> <i  onClick={() => setPassVis(!passVis)}>
                                        <img className={s.vis} src={passIcon} alt="" /></i>
                                        </div>
                                        {error ? <div style={{color: 'red'}}>{error}</div> : null}
                                        <button disabled={statusLogin === 'loading' ? true : false} className={s.signBtn} type="submit">sign in</button>
                                    </Form>
                                </Formik>
                            </div>
                            <div className={s.links}>
                                <NavLink to='/forgot'>forgot your password?</NavLink>
                                <NavLink to='/signup'>sign up</NavLink> 
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