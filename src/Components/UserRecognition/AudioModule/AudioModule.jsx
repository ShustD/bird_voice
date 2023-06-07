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
import { useDispatch, useSelector } from "react-redux"
import { fetchRecognize } from "../../../store/recognizeSlice"

export const AudioModule = (props) => {
    const [animation, setAnimation] = useState(false)
    const [url, setUrl] = useState(null)
    const [drag, setDrag] = useState(false)
    const [voice, setVoice] = useState(null)
    const dispatch = useDispatch()

    const { status } = useSelector(state => state.recognize)
    const postCall = (sound) => {
        dispatch(fetchRecognize(sound))
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
    const isVisibleAudioModule = () => {
        setAnimation(!animation)
        postCall(voice)
    }
    return (
        <div className={s.recognition_container}>
            <div className={s.recognition_body}>
                <div className={s.recognition_model}>
                    <div className={s.recognotion_tittle}>Recognition model</div>
                </div>
                <div className={s.dragDropAudio}>
                    {status === 'loading' ?
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
                        onDropHandler={onDropHandler} status={status} voice={voice} drag={drag} />
                    <div className={s.audio}>
                        <AudioPlayer changeUrl={changeUrl} voice={voice} url={url} />
                    </div>
                </div>
                <div className={s.upload__buttons}>
                    <label className={s.file_upload} htmlFor="uploadFile">Upload</label>
                    <input id="uploadFile" type="file" name="userfile[]" onChange={(e) => selectMusic(e)} />

                    <div className={s.post}>
                        <button onClick={() => isVisibleAudioModule()}
                            disabled={voice && status !== 'loading' ? false : true}>Start of recognition</button>
                    </div>
                </div>
            </div>
            <div className={s.birds}>
                <BirdCarousel status={status} />
            </div>
        </div>
    )
}