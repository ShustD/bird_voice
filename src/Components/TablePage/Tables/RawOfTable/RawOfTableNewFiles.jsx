import React from "react";
import s from '../../TablePage.module.scss'

export const RawOfTableNewFiles = (props) => {

    return (
        <tr className={s.raw_of_table}>
            <td><input id={props.id} type="checkbox" checked={props.check} onChange={props.handleClick}/></td>
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.percentage}</td>
            <td>{props.bird_specie}</td>
            <td><audio className={s.table__audio} src="" controls></audio></td>
            <td>{props.userName}</td>
            <td>{props.created}</td>
            <td>{props.update}</td>
            <td> <button className={s.button__approve}>approve</button>
                <button className={s.button__refuse}>refuse</button></td>
        </tr>
    )
}