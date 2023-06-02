import React, { useState } from "react"
import s from './ResultModule.module.scss'
import btnBird from '../../../assets/UserRecognition/btnBird.png'
import li from '../../../assets/UserRecognition/li.png'
import spec from '../../../assets/UserRecognition/spec.png'
import coins from '../../../assets/UserRecognition/coins.png'
import littleBird from '../../../assets/UserRecognition/littleBird.png'
import bigBird from '../../../assets/UserRecognition/Rectangle 15.png'
import { ResultAudioPlayer } from "./AudioPlayer/ResultAudioPlayer"
import { Spectrogram } from "./Spectrogram/Spectrogram"
import { useDispatch, useSelector } from "react-redux"
import { resetStatus } from "../../../store/recognizeSlice"

export const ResultModule = () => {
    
    const birdImage = bigBird
    const [isSci, setIsSci] = useState(false)
    const [buttonActive, setButtonActive] = useState(true)
    const [isBigSpectrogram, setIsBigSpectrogram] = useState(false)
    const { birdName } = useSelector(state => state.recognize)
    const dispatch = useDispatch()
    return (
        <div className={s.resultModule}>
            <div className={s.recognitionBox}>
                <button onClick={() => dispatch(resetStatus())} className={s.recognitionButton}>open recognition box <img src={btnBird} alt="" /> </button>
            </div>
            <div className={s.resultContainer}>
                <div className={s.topSection}>
                    <div className={s.sectionTittle}>
                        {birdName ?
                           birdName
                            : 'Small Cormorant'}
                    </div>
                    <div className={s.sectionButtons}>
                        <button onClick={() => setButtonActive(true)}
                            className={buttonActive ? s.buttonActive : s.buttonPassive}>about</button>
                        <button onClick={() => setButtonActive(false)}
                            className={buttonActive ? s.buttonPassive : s.buttonActive}>map</button>
                    </div>
                </div>
                <iframe style={buttonActive ? { display: 'none' } : { display: 'block' }}
                    title="map" className={s.bigMap}
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d37612.50783388711!2d30.362828800000003!3d53.9000832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1669023232658!5m2!1sru!2sby" loading="lazy" ></iframe>

                <div style={buttonActive ? { display: 'block' } : { display: 'none' }}>
                    <div className={s.middleSection}>
                        <div className={s.birdImages}>
                            <div className={s.littleImages}>
                                <img src={littleBird} alt="" />
                                <img src={littleBird} alt="" />
                                <img src={littleBird} alt="" />
                            </div>
                            <div className={s.mainImage}>
                                <img src={birdImage} alt="" />
                                <div className={s.percentOfRecognition}>
                                    <div className={s.percent}>
                                        90%
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={s.birdInformation}>
                            <div className={s.birdAboutSection}>
                                {/* <div className={s.about}>
                                    About Bird
                                </div> */}
                                <div className={s.informationAndMap}>
                                    <div className={s.nameSection}>
                                        <div>
                                            <div className={s.name__raw}>
                                                <div className={s.raw__tittle}>
                                                    Latin name
                                                </div>
                                                <div className={s.raw__name}>
                                                    {birdName ?
                                                       birdName
                                                        : 'Microcarbo pygmaeus'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <iframe title="map" className={s.mapSection}
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d37612.50783388711!2d30.362828800000003!3d53.9000832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1669023232658!5m2!1sru!2sby" loading="lazy" ></iframe>
                                <div className={s.audio}>
                                    <ResultAudioPlayer />
                                </div>
                                </div>
                                
                                {/* <div className={s.data}>

                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className={s.bottomSection}>
                        <div className={s.birdVoice}>
                            <div onClick={() => { setIsSci(!isSci) }} className={s.possibleChoiceTittle}>
                                Possible Choice
                            </div>
                            {
                                !isSci ?
                                    <div className={s.possibleContainerScientist}>
                                        <div className={s.sciBirds}>
                                            <div className={s.bird_container}>
                                                <div className={s.bird_image}>
                                                    <img src={li} alt="" />
                                                    <div>
                                                        text
                                                    </div>
                                                </div>
                                                <div className={s.bird_percent}>
                                                    <div style={{ width: '90%' }} className={s.bird_line}>
                                                    </div>
                                                    <div className={s.bird_circle}>90%</div>
                                                </div>
                                            </div>
                                            <div className={s.bird_container}>
                                                <div className={s.bird_image}>
                                                    <img src={li} alt="" />
                                                    <div>
                                                        text
                                                    </div>
                                                </div>
                                                <div className={s.bird_percent}>
                                                    <div style={{ width: '80%' }} className={s.bird_line}>
                                                    </div>
                                                    <div className={s.bird_circle}>80%</div>
                                                </div>
                                            </div>
                                            <div className={s.bird_container}>
                                                <div className={s.bird_image}>
                                                    <img src={li} alt="" />
                                                    <div>
                                                        text
                                                    </div>
                                                </div>
                                                <div className={s.bird_percent}>
                                                    <div style={{ width: '60%' }} className={s.bird_line}>
                                                    </div>
                                                    <div className={s.bird_circle}>60%</div>
                                                </div>
                                            </div>
                                            <div className={s.bird_container}>
                                                <div className={s.bird_image}>
                                                    <img src={li} alt="" />
                                                    <div>
                                                        text
                                                    </div>
                                                </div>
                                                <div className={s.bird_percent}>
                                                    <div style={{ width: '40%' }} className={s.bird_line}>
                                                    </div>
                                                    <div className={s.bird_circle}>40%</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={s.spectogramm_container}>
                                            <div className={s.spectogramm_img}>
                                                <img src={spec} alt="" />
                                            </div>
                                            <div className={s.spectogramm_btn}>
                                                <div className={s.center__btn}>
                                                    <i className="material-icons">share</i>
                                                    <i className="material-icons">autorenew</i>
                                                    <i className="material-icons">delete</i>
                                                </div>
                                                <div onClick={() => setIsBigSpectrogram(true)} className={s.btn__large}>
                                                    <i className="material-icons">fullscreen</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : <div className={s.possibleContaner}>
                                        <div className={s.possibleItem}>
                                            <div className={s.itemImage}>
                                                <img src={coins} alt="" />
                                            </div>
                                            <div className={s.itemName}>
                                                coincidence
                                            </div>
                                            <div className={s.itemPercent}>
                                                70%
                                            </div>
                                        </div>

                                        <div className={s.possibleItem}>
                                            <div className={s.itemImage}>
                                                <img src={coins} alt="" />
                                            </div>
                                            <div className={s.itemName}>
                                                coincidence
                                            </div>
                                            <div className={s.itemPercent}>
                                                70%
                                            </div>
                                        </div>

                                        <div className={s.possibleItem}>
                                            <div className={s.itemImage}>
                                                <img src={coins} alt="" />
                                            </div>
                                            <div className={s.itemName}>
                                                coincidence
                                            </div>
                                            <div className={s.itemPercent}>
                                                70%
                                            </div>
                                        </div>


                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            {isBigSpectrogram ? <Spectrogram setIsBigSpectrogram={() => setIsBigSpectrogram(false)} /> : null}

        </div>
    )
}