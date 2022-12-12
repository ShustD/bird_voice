import React, {useState} from "react"
import s from './ResultModule.module.css'
import btnBird from '../../../assets/UserRecognition/btnBird.png'
import coins from '../../../assets/UserRecognition/coins.png'
import littleBird from '../../../assets/UserRecognition/littleBird.png'
import bigBird from '../../../assets/UserRecognition/Rectangle 15.png'
import { ResultAudioPlayer } from "./AudioPlayer/ResultAudioPlayer"

export const ResultModule = (props) => {

    const [buttonActive, setButtonActive] = useState(true)
    return (
        <div className={s.resultModule}>
            <div className={s.recognitionBox}>
                <button onClick={() =>  props.changeState(true)} className={s.recognitionButton}>open recognition box <img src={btnBird} alt="" /> </button>
            </div>
            <div className={s.resultContainer}>
                <div className={s.topSection}>
                    <div className={s.sectionTittle}>
                        small cormorant
                    </div>
                    <div className={s.sectionButtons}>
                        <button onClick={() => setButtonActive(true)} 
                        className={buttonActive ? s.buttonActive : s.buttonPassive}>about</button>
                        <button onClick={() => setButtonActive(false)}  
                        className={buttonActive ? s.buttonPassive : s.buttonActive}>map</button>
                    </div>
                </div>
                <iframe style={buttonActive ? {display: 'none'} : {display: 'block'}} 
                    title="map" className={s.bigMap}
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d37612.50783388711!2d30.362828800000003!3d53.9000832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1669023232658!5m2!1sru!2sby" loading="lazy" ></iframe>

                <div style={buttonActive ? {display: 'block'} : {display: 'none'} }>
                <div className={s.middleSection}>
                    <div className={s.birdImages}>
                        <div className={s.littleImages}>
                            <img src={littleBird} alt="" />
                            <img src={littleBird} alt="" />
                            <img src={littleBird} alt="" />
                        </div>
                        <div className={s.mainImage}>
                            <img src={props.birdImage ? `data:image/jpg;base64,${props.birdImage}`
                            : bigBird} alt="" />
                            <div className={s.percentOfRecognition}>
                                <div className={s.confidence}>
                                    <div>recognition</div>
                                    <div>confidence</div>
                                </div>
                                <div className={s.percent}>
                                    90%
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={s.birdInformation}>
                        <div className={s.infTittleSection}>
                            <div className={s.about}>
                                About Bird
                            </div>
                            <div className={s.data}>
                                Data Collection Area
                            </div>

                        </div>
                        <div className={s.birdAboutSection}>
                            <div className={s.informationAndMap}>
                                <div className={s.nameSection}>
                                    <div>
                                        <div className={s.name__raw}>
                                            <div className={s.raw__tittle}>
                                                Second name
                                                <div className={s.raw__name}>
                                                    {props.birdName ? 
                                                    props.birdName.split(')')[0].split('(')[1] 
                                                    : 'Small Cormorant' }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.name__raw}>
                                            <div className={s.raw__tittle}>
                                                Latin name
                                            </div>
                                            <div className={s.raw__name}>
                                            {props.birdName ? 
                                                    props.birdName.split('(', 1) 
                                                    : 'Microcarbo pygmaeus'}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={s.name__raw}>
                                            <div className={s.raw__tittle}>
                                                Description
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <iframe title="map" className={s.mapSection}
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d37612.50783388711!2d30.362828800000003!3d53.9000832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1669023232658!5m2!1sru!2sby" loading="lazy" ></iframe>

                            </div>

                            <div className={s.descripyionText}>
                                <p>The small cormorant has a length of about 48 cm, a wingspan of about 80 cm, which
                                    is almost half the size of a large cormorant. Its plumage is black with a metallic
                                    greenish sheen, strewn with white markings. The head is reddish-brown.
                                </p>
                                <p>
                                    The beak is relatively short, there is no bare spot near the base of the beak. In the nuptial
                                    attire, white feathers are located all over the body and have a teardrop shape.
                                </p>
                                <p>
                                    Little careful, excellent swims and dives. Quite an easy flight with calm rare flapping of wings.
                                    They usually keep singly or in pairs, in the autumn period they meet in small flocks, consisting
                                    more often of one brood.
                                </p>
                            </div>
                            <div className={s.audio}>
                               <ResultAudioPlayer />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.bottomSection}>
                    <div className={s.birdVoice}>
                        <div className={s.possibleChoiceTittle}>
                            Possible Choice
                        </div>
                        <div className={s.possibleContaner}>
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
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}