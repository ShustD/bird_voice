import React from "react";
import s from './AudioModule.module.scss'
import a from '../Animation.module.css'
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import bird1 from '../../../assets/UserRecognition/Rectangle 15.png'
import bird2 from '../../../assets/UserRecognition/Rectangle 16.png'
import bird3 from '../../../assets/UserRecognition/Rectangle 25.png'
import bird4 from '../../../assets/UserRecognition/Group 88.png'
import { useState } from "react";
import { DragDropArea } from "./DragDropArea";

export const AudioModule = (props) => {
    const [animation, setAnimation] = useState(false)
    const [error, setError] = useState(false)
    const [url, setUrl] = useState(null)
    const [drag, setDrag] = useState(false)
    const [voice, setVoice] = useState(null)
    const [model, setModel] = useState("dataset_xc_20220816-model_EffNetB3-species_14-date_20221006-epoch_98")

    const postCall = (sound, bool) => {
        const data = new FormData()
        data.set('audio', sound)
        data.set('model', model)
        data.set('lang', 'en')
        fetch('https://corpus.by/BirdSoundsRecognizer/api', {
            method: "POST",
            body: data
        }).then((res) =>  res.json().then(data => {
            props.changeState(bool, data.bird_image, data.bird_name)
            setAnimation(false)
        })).catch((error) => {
            setAnimation(false)
            setError(true)
          });
    }
        
    
    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e) {
        e.preventDefault()
        setVoice(e.dataTransfer.files[0])
        setDrag(false)
        setUrl(URL.createObjectURL(e.dataTransfer.files[0]))
    }
    const selectMusic = (e) => {
        e.target.files[0] &&
        setUrl(URL.createObjectURL(e.target.files[0]))
        setVoice(e.target.files[0])
    }
    const changeUrl = (url, trim) => {
        setUrl(url)
        setVoice(trim)
    }
    const isVisibleAudioModule = (bool) => {
        setAnimation(!animation)
        postCall(voice, bool)
    }   
    return (
        <div className={s.recognition_container}>
                        <div className={s.recognition_body}>
                            <div className={s.recognition_model}>
                                <div className={s.recognotion_tittle}>Recognition model</div>
                                <div className={s.test_model}>
                                <select name="test_model" onChange={(e) => setModel(e.target.value) }>
                                        <option value="dataset_xc_20220816-model_EffNetB3-species_14-date_20221006-epoch_98">test_model 1</option>
                                        <option value="dataset_xc_20220113_model_EffNetB3_species_14_date_20220202_epoch_14">test_model 2</option>
                                </select>
                                </div>
                            </div>
                            <div className={s.dragDropAudio}>
                            <DragDropArea dragStartHandler={dragStartHandler} dragLeaveHandler={dragLeaveHandler} 
                               onDropHandler={onDropHandler} animation={animation} voice={voice} drag={drag} error={error}/>
                                <div className={s.audio}>
                                    <AudioPlayer changeUrl={changeUrl} voice={voice} url={url} />
                                </div>
                            </div>
                            <div className={s.upload__buttons}>
                                <label className={s.file_upload} htmlFor="uploadFile">Upload</label>
                                <input id="uploadFile" type="file" name="userfile[]" onChange={(e) =>selectMusic(e)} />
                                
                                <div className={s.post}>
                                    <button onClick={() => isVisibleAudioModule(false)} 
                                    disabled={voice && !animation ? false : true}>Start or recognition</button>
                                </div>
                            </div>
                        </div>
                        <div className={s.birds}>
                            <div className={a.slideshow}>
                                <img src={bird1} alt="#" className={animation ? a.i_8A : a.i_8} />
                                <img src={bird2} alt="#" className={animation ? a.i_7A : a.i_7} />
                                <img src={bird3} alt="#" className={animation ? a.i_6A : a.i_6} />
                                <img src={bird4} alt="#" className={animation ? a.i_5A : a.i_5} />
                                <img src={bird1} alt="#" className={animation ? a.i_1A : a.i_1} />
                                <img src={bird2} alt="#" className={animation ? a.i_2A : a.i_2} />
                                <img src={bird3} alt="#" className={animation ? a.i_3A : a.i_3} />
                                <img src={bird4} alt="#" className={animation ? a.i_4A : a.i_4} />
                                
                            </div>
                        </div>
                    </div>
    )
}