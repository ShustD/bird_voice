import React from "react"
import s from './ResultModuleNew.module.scss'
import { ReactComponent as VectorBtn } from '../../../assets/main/Vector.svg'
import { useDispatch, useSelector } from "react-redux"
import { resetStatus } from "../../../store/recognizeSlice"

export const ResultModuleNew = () => {

  const { recognizedBirds, spectrogram } = useSelector(state => state.recognize)
  const dispatch = useDispatch()

  const birdElements = Object.keys(recognizedBirds).map((birdName) => {
    const value = recognizedBirds[birdName];
    const rangeElements = value.slice(1).map((arr, index) => {
      const [start, end] = arr;
      const rangeText =`${start}s - ${end}s`;
      return <div className={s.segment_time} key={index}>{rangeText}</div>;
    });
    const firstRange = value[0];
    return (
      <div className={s.bird_card} key={birdName}>
        <div>
          <img src={firstRange} alt="" />
        </div>
        <div>
          <div className={s.card_title}>{birdName}</div>
          <div className={s.segment_title}>
            Defined on the segment:
          </div>
          
            <div className={s.segment}>{rangeElements}</div>
          
        </div>



      </div>
    );
  });


  return (
    <div className={s.resultModule}>
      <div className={s.recognitionBox}>
        <button onClick={() => dispatch(resetStatus())} className={s.recognitionButton}>open recognition box <VectorBtn className={s.btnBird} /> </button>
      </div>
      <div className={s.spectrogram}>
        <img src={spectrogram} alt="" />
      </div>
      <div className={s.resultContainer}>
        {birdElements}
      </div>
    </div>
  )
}