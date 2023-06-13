import React from "react";
import s from '../../TablePage.module.scss'
import { Close, Done } from "@material-ui/icons";

export const RawOfTableDelete = (props) => {
    return (
        <tr className={s.raw_of_table}>
            <td><input id={props.id} type="checkbox" checked={props.check} onChange={(e) => props.handleClick(e, props.id)} /></td>
            <td className={s.raw_id}>{props.id}</td>
            <td style={{ maxWidth: '100px' }}>{props.name}</td>
            <td>{props.recognized_bird_specie}</td>
            <td>{props.validated ?
                <Done className={s.icon_done} />  :
                <Close className={s.icon_close} />}</td>
            <td><audio className={s.table__audio} src={props.audiorecord_local} controls></audio></td>
            <td><a target="blank" href={props.audiorecord_xeno_canto}>
            {props.audiorecord_xeno_canto ? 'Xeno-Canto link'
            : <Close className={s.icon_close} />}</a>
            </td>
            <td>{props.annotation}</td>
            <td>{props.audio_quality_tag}</td>
            <td>
                <a target="blank" href={props.audio_spectrogram}>
                    {props.audio_spectrogram ? 'open spectrogram'
                        : <Close className={s.icon_close} />}
                </a>
            </td>
            <td>{props.created_at}</td>
            <td>{props.updated_at}</td>
            <td> <button onClick={() => props.handleDelete(props.id)} className={s.button__approve}>delete</button>
            </td>
        </tr>
    )
}