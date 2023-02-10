import React from "react";
import s from '../TablePage.module.scss'
import { BoxInfo } from "./BoxInfo/BoxInfo";
import { RawOfTableCollection } from "./RawOfTable/RawOfTableCollection";

export const DeletedTable = (props) => {
    
    let raw = props.bird.map((b,index) => <RawOfTableCollection key={index} handleClick={props.handleClick} check={props.check.includes(b.id)} id={b.id} title={b.title} bird_specie={b.bird_specie} validated={b.validated}
    xeno_canto={b.xeno_canto} annotation={b.annotation} audio_quality={b.audio_quality} spectogram={b.spectogram} created={b.created} update={b.update} />)
    const boxInfo = props.bird.map((b,index) => <BoxInfo id={b.id} title={b.title} bird_specie={b.bird_specie} validated={b.validated}
    xeno_canto={b.xeno_canto} annotation={b.annotation} audio_quality={b.audio_quality} spectogram={b.spectogram} created={b.created} update={b.update}  key={index} />)
    return (
        <div className={s.table__content}>
        <table className={s.table}>
            <thead>
                <tr>
                    <td></td>
                    <td>id</td>
                    <td>title</td>
                    <td>bird specie</td>
                    <td>validated</td>
                    <td>audiofile</td>
                    <td>xeno-canto link</td>
                    <td>annotation</td>
                    <td>aaudio quality</td>
                    <td>audio spectogram</td>
                    <td>created at</td>
                    <td>update at</td>
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