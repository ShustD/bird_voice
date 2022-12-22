import React from "react";
import s from '../../TablePage.module.scss'

export const RawOfTableCollection = (props) => {
    
    return (
        <tr className={s.raw_of_table}>
        <td><input id={props.id} type="checkbox" checked={props.check} onChange={props.handleClick}/></td>
        <td>{props.id}</td>
        <td>{props.title}</td>
        <td>{props.bird_specie}</td>
        <td>{props.validated}</td>
        <td><audio className={s.table__audio} src="" controls></audio></td>
        <td>{props.xeno_canto}</td>
        <td>{props.annotation}</td>
        <td>{props.audio_quality}</td>
        <td>{props.spectogram}</td>
        <td>{props.created}</td>
        <td>{props.update}</td>
        <td> <button className={s.button__approve}>map</button>
            </td>
    </tr>
    )
}