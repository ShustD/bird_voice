import { Formik, Field, Form } from 'formik';
import React from "react";
import img from '../../../assets/mail/birds.png'
import './Mail.css'

export const Mail = () => {
    return (
        <div className="mail">
            <div className='mail__container'>
                <div className='mail__visible'>
                    <Formik
                        initialValues={{
                            name: '',
                            company: '',
                            email: '',
                            offers: ''
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                        }}>
                        <Form className='mail__form'>
                            <label htmlFor="Name">Name</label>
                            <Field id="Name" name="name"/>

                            <label htmlFor="email">Email</label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                            />
                            <label htmlFor="company">Company</label>
                            <Field id="company" name="company"/>

                            <label htmlFor="offers">Offers</label>
                            <Field name="offers" component="textarea" />

                            <button className='mail__btn' type="submit">send</button>
                        </Form>
                    </Formik>
                    <div className='mail__content'>
                        <div className='mail__tittle'>Write to us</div>
                        <div className='mail__text'>
                            If you have applications for cooperation with our service,
                            please fill out the form, specifying all the necessary data
                            and our managers will contact you as soon as possible. All
                            your ideas for improving our product are very important to us!
                        </div>
                    </div>
                    <div className='mail__img'>
                        <img src={img} alt="" />
                    </div>
                </div>

            </div>
            <div className='mail__cloud'></div>
        </div>
    )
}