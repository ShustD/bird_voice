import React, { useEffect } from "react";
import s from './TableAdd.module.scss'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { collectionAddNew, resetAddState } from "../../../store/collectionSlice";
import { ReactComponent as Arrow } from './arrow.svg'
import preloader from '../../../assets/preloader.png'


export const TableAdd = () => {
    const { statusAdd, errorAdded } = useSelector(state => state.collection)
    const dispatch = useDispatch()
    const initialValues = {
        name: '',
        audiorecord_local: '',
        audiorecord_xeno_canto: '',
        annotation_file: '',
        lat: '',
        lng: '',
        validated: false,
        deleted: false,
        audio_spectrogram: '',
        recognized_bird_image: '',
        uploader: 1,
        audio_quality_tag: '',
        recognized_bird_specie: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Field is required'),
    });

    const handleSubmit =  (values, { resetForm }) => {   
        dispatch(collectionAddNew(values))
            resetForm()
            handleScroll()
    };
    const handleScroll = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };
      useEffect(() => {
        dispatch(resetAddState())
    }, [dispatch])
    return (
        <div className={s.wrapper}>
            <div className={s.wrapper_body}>
                <div className={s.code_container}>
                    {statusAdd === 'failed' ? 
                    <h1 style={{color: 'red', fontSize: '40px'}}>{errorAdded}</h1> : null}
                    {statusAdd === 'succeeded' ? <h1 className={s.add_title}>Element added to collection</h1> : null}
                    <div className={s.formAddNew}>
                        <div className={s.formTittle}>Add New</div>
                        {statusAdd === 'loading' ?
                        <div className={s.preloader_body}><img className={s.preloader} src={preloader} alt="" /></div> :    
                        <div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}

                            onSubmit={handleSubmit}
                        >
                            {({ touched, errors, values, setFieldValue }) => (
                                
                                <Form className={s.form}>                                    
                                    <div className={s.form_raw}>
                                        <label htmlFor="name">Name</label>
                                        <div>
                                            <Field className={values.name === '' && touched.name ? s.inputError : null} name="name" type="text" />
                                            <div className={s.erorrs}><ErrorMessage name="name" /></div>
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label>Audiorecord local</label>
                                        <div>
                                            <label className={s.upload_btn} htmlFor="audiorecord_local">Upload Audiorecord</label>
                                            <input
                                                id="audiorecord_local"
                                                name="audiorecord_local"
                                                type="file"
                                                onChange={(event) => {
                                                    setFieldValue('audiorecord_local', event.currentTarget.files[0]);
                                                }}
                                            />
                                            <span className={s.erorrs}><ErrorMessage name="fileField" /></span>
                                            {values.audiorecord_local && (<div>File name: {values.audiorecord_local.name}</div>)}
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label htmlFor="audiorecord_xeno_canto">Audiorecord xeno canto</label>
                                        <div>
                                            <Field name="audiorecord_xeno_canto" type="text" />
                                            <span className={s.erorrs}><ErrorMessage name="audiorecord_xeno_canto" /></span>
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label>Annotation file</label>
                                        <div>
                                            <label className={s.upload_btn} htmlFor="annotation_file">Upload Annotation file</label>
                                            <input
                                                id="annotation_file"
                                                name="annotation_file"
                                                type="file"
                                                onChange={(event) => {
                                                    setFieldValue('annotation_file', event.currentTarget.files[0]);
                                                }}
                                            />
                                            <span className={s.erorrs}><ErrorMessage name="annotation_file" /></span>
                                            {values.annotation_file && (<div>File name: {values.annotation_file.name}</div>)}
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label htmlFor="lat">Lat</label>
                                        <div>
                                            <Field name="lat" type="text" />
                                            <span className={s.erorrs}><ErrorMessage name="lat" /></span>
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label htmlFor="lng">Lng</label>
                                        <div>
                                            <Field name="lng" type="text" />
                                            <span className={s.erorrs}><ErrorMessage name="lng" /></span>
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label>Audio spectrogram</label>
                                        <div>
                                            <label className={s.upload_btn} htmlFor="audio_spectrogram">Upload Audio spectrogram</label>
                                            <input
                                                id="audio_spectrogram"
                                                name="audio_spectrogram"
                                                type="file"
                                                onChange={(event) => {
                                                    setFieldValue('audio_spectrogram', event.currentTarget.files[0]);
                                                }}
                                            />
                                            <span className={s.erorrs}><ErrorMessage name="audio_spectrogram" /></span>
                                            {values.audio_spectrogram && (<div>File name: {values.audio_spectrogram.name}</div>)}
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label>Recognized bird image</label>
                                        <div>
                                            <label className={s.upload_btn} htmlFor="recognized_bird_image">Upload Recognized bird image</label>
                                            <input
                                                id="recognized_bird_image"
                                                name="recognized_bird_image"
                                                type="file"
                                                onChange={(event) => {
                                                    setFieldValue('recognized_bird_image', event.currentTarget.files[0]);
                                                }}
                                            />
                                            <span className={s.erorrs}><ErrorMessage name="recognized_bird_image" /></span>
                                            {values.recognized_bird_image && (<div>File name: {values.recognized_bird_image.name}</div>)}
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label htmlFor="audio_quality_tag">Audio quality tag</label>
                                        <div className={s.container_selct}>
                                            <Field name="audio_quality_tag" as="select">
                                                <option value="">Select an option</option>
                                                <option value="low_quality">low_quality</option>
                                                <option value="medium_quality">medium_quality</option>
                                                <option value="high_quality">high_quality</option>
                                            </Field>
                                            <Arrow className={s.arrow_down} />
                                            <span className={s.erorrs}><ErrorMessage name="audio_quality_tag" /></span>
                                        </div>
                                    </div>

                                    <div className={s.form_raw}>
                                        <label htmlFor="recognized_bird_specie">Recognized bird specie</label>
                                        <div className={s.container_selct}>
                                            <Field name="recognized_bird_specie" as="select">
                                                <option value="">Select an option</option>
                                                <option value="Unknown">Unknown</option>
                                                <option value="Regulusregulus">Regulusregulus</option>
                                                <option value="Sylvia Atricapilla">Sylvia Atricapilla</option>
                                            </Field>
                                            <Arrow className={s.arrow_down} />
                                            <span className={s.erorrs}><ErrorMessage name="recognized_bird_specie" /></span>
                                        </div>
                                    </div>
                                    <button className={s.submit_btn} type="submit">Add New</button>
                                    {errors.name ? handleScroll() : null }
                                </Form>
                            )}
                        </Formik>
                    </div>
                    }                        
                    </div>

                </div>
                <div className={s.upperCloud}></div>
                <div className={s.uuderCloud}></div>
            </div>
        </div>
    )
}