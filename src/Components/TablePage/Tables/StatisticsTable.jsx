import React from "react";
import s from '../TablePage.module.scss'
import { BoxInfo } from "./BoxInfo/BoxInfo";
import { RawOfTableStatistics } from "./RawOfTable/RawOfTableStatistics";

export const StatisticsTable = (props) => {
    let raw = props.bird.map((b, index) => <RawOfTableStatistics key={index} handleClick={props.handleClick} check={props.check.includes(b.id)} id={b.id}
        bird_specie={b.bird_specie} second_specie={b.second_specie} latinName={b.latinName} englishName={b.englishName} belarusianName={b.belarusianName}
        audio_quality={b.audio_quality} photo_quality={b.photo_quality}/>)
        const boxInfo = props.bird.map((b,index) => <BoxInfo id={b.id} englishName={b.englishName}
        bird_specie={b.bird_specie} second_specie={b.second_specie} latinName={b.latinName} belarusianName={b.belarusianName}
        audio_quality={b.audio_quality} photo_quality={b.photo_quality} key={index} />)
    return (
        <div className={s.table__content}>
            <table className={s.table}>
                <thead>
                    <tr>
                        <td></td>
                        <td>id</td>
                        <td>bird specie</td>
                        <td>second specie</td>
                        <td>latin specie name</td>
                        <td>english specie name</td>
                        <td>belarusian specie name</td>
                        <td>audiofiles quality</td>
                        <td>photo quality</td>
                        <td>map</td>
                    </tr>
                </thead>
                <tbody>
                    {raw}
                </tbody>

            </table>
            <div  className={s.boxInfo}>
            {boxInfo}
        </div>
        </div>
    )
}