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
    const rangeElements = value.map((arr, index) => {
      const [start, end] = arr;
      const rangeText = `${start}s - ${end}s`;
      return <div key={index}>{rangeText}</div>;
    });

    return (
      <div style={{ marginBottom: '15px' }} className={s.sectionTittle} key={birdName}>
        <h3>{birdName}</h3>
        <div>{rangeElements}</div>
      </div>
    );
  });
  return (
    <div className={s.resultModule}>
      <div className={s.recognitionBox}>
        <button onClick={() => dispatch(resetStatus())} className={s.recognitionButton}>open recognition box <VectorBtn className={s.btnBird}/> </button>
      </div>
      <div className={s.spectrogram}>
        <img src={`https://apiptushki.ssrlab.by${spectrogram}`} alt="hui" />
      </div>
      <div className={s.resultContainer}>
        {birdElements}
      </div>
    </div>
  )
}