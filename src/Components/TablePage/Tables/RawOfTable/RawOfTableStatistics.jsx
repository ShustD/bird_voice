import React from "react";
import s from '../../TablePage.module.scss'

export const RawOfTableStatistics = (props) => {

    return (
        <tr className={s.raw_of_table}>
                        <td><input  id={props.id} type="checkbox" checked={props.check} onChange={props.handleClick}/></td>
                        <td>{props.id}</td>
                        <td>{props.bird_specie}</td>
                        <td>{props.second_specie}</td>
                        <td>{props.latinName}</td>
                        <td>{props.englishName}</td>
                        <td>{props.belarusianName}</td>
                        <td>{props.audio_quality}</td>
                        <td>{props.photo_quality}</td>
                        <td> <button className={s.button__approve}>map</button>
                        </td>
                    </tr>
    )
}