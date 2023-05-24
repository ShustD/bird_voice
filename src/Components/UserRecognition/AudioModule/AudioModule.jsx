import React from "react"
import s from './AudioModule.module.scss'
import { AudioPlayer } from "./AudioPlayer/AudioPlayer"
import mob1 from '../../../assets/UserRecognition/mob1.png'
import mob2 from '../../../assets/UserRecognition/mob2.png'
import mob3 from '../../../assets/UserRecognition/mob3.png'
import mob4 from '../../../assets/UserRecognition/mob4.png'
import { useState } from "react";
import { DragDropArea } from "./DragDropArea/DragDropArea"
import { BirdCarousel } from "./BirdCarousel/BirdCarousel"
import { useDispatch } from "react-redux"
import { fetchRecognize } from "../../../store/recognizeSlice"

export const AudioModule = (props) => {
    const [animation, setAnimation] = useState(false)
    const [error, setError] = useState(false)
    const [url, setUrl] = useState(null)
    const [drag, setDrag] = useState(false)
    const [voice, setVoice] = useState(null)
    const [model, setModel] = useState("dataset_xc_20220816-model_EffNetB3-species_14-date_20221006-epoch_98")
    const dispatch = useDispatch()
    const postCall2 = (sound, bool) => {
        const data = new FormData()
        data.set('audio', sound)
        data.set('model', model)
        data.set('lang', 'en')
        fetch('https://corpus.by/BirdSoundsRecognizer/api', {
            method: "POST",
            body: data
        }).then((res) => res.json().then(data => {
            props.changeState(bool, data.bird_image, data.bird_name)
            setAnimation(false)
        })).catch((error) => {
            setAnimation(false)
            setError(true)
        });
    }
const postCall = (sound, bool) => {

    const reader = new FileReader();
    reader.readAsDataURL(sound);
    reader.onload = (event) => {
      const base64String = event.target.result
    const item = [
        {
            name: sound.name,
            data: base64String
        },
        {
            name: 'zip.zip',
            data: base64String
        },
        'Латынь'
    ]
    dispatch(fetchRecognize(base64String))
    };


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
                        <select name="test_model" onChange={(e) => setModel(e.target.value)}>
                            <option value="dataset_xc_20220816-model_EffNetB3-species_14-date_20221006-epoch_98">test_model 1</option>
                            <option value="dataset_xc_20220113_model_EffNetB3_species_14_date_20220202_epoch_14">test_model 2</option>
                            <option value="dataset_npc_20230307_model_EffNetB3_species_79_date_20230316_epoch_27">test_model 3</option>
                        </select>
                    </div>
                </div>
                <div className={s.dragDropAudio}>
                    {animation ?
                        <div className={s.pic_ctn}>
                            <img src={mob2} alt="" className={s.pic} />
                            <img src={mob4} alt="" className={s.pic} />
                            <img src={mob3} alt="" className={s.pic} />
                            <img src={mob2} alt="" className={s.pic} />
                            <img src={mob1} alt="" className={s.pic} />
                        </div>
                        :
                        <div className={s.pic_ctn_no_anim}>
                            <img src={mob1} alt="" className={s.pic} />
                        </div>
                    }

                    <DragDropArea dragStartHandler={dragStartHandler} dragLeaveHandler={dragLeaveHandler}
                        onDropHandler={onDropHandler} animation={animation} voice={voice} drag={drag} error={error} />
                    <div className={s.audio}>
                        <AudioPlayer changeUrl={changeUrl} voice={voice} url={url} />
                    </div>
                </div>
                <div className={s.upload__buttons}>
                    <label className={s.file_upload} htmlFor="uploadFile">Upload</label>
                    <input id="uploadFile" type="file" name="userfile[]" onChange={(e) => selectMusic(e)} />

                    <div className={s.post}>
                        <button onClick={() => isVisibleAudioModule(false)}
                            disabled={voice && !animation ? false : true}>Start of recognition</button>
                    </div>
                </div>
            </div>
            <div className={s.birds}>
                <BirdCarousel animation={animation}/>
            </div>            
        </div>
    )
}