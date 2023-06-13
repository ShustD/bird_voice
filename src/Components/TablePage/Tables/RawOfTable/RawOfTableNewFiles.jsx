import React from "react";
import s from '../../TablePage.module.scss'
import { Close, Done } from "@material-ui/icons";


export const RawOfTableNewFiles = (props) => {

    return (
        <tr className={s.raw_of_table}>
            <td><input id={props.id} type="checkbox" checked={props.check} onChange={(e) => props.handleClick(e, props.id)}/></td>
            <td className={s.raw_id}>{props.id}</td>
            <td style={{ maxWidth: '100px' }}>{props.name}</td>
            <td>{props.validated ?
                <Done className={s.icon_done} />  :
                <Close className={s.icon_close} />}</td>
            <td>{props.percentage}</td>
            <td>{props.recognized_bird_specie}</td>
            <td><audio className={s.table__audio} src={props.audiorecord_local} controls></audio></td>
            <td>{props.userName}</td>
            <td>{props.created_at}</td>
            <td>{props.updated_at}</td>
            <td> 
                <button onClick={() => props.approveElements([props.id])} className={s.button__approve}>approve</button>
                <button onClick={() =>  props.refuseElements([props.id])} className={s.button__refuse}>refuse</button></td>
        </tr>
    )
}