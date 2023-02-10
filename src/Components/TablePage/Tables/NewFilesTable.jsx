import React from "react";
import s from '../TablePage.module.scss'
import { BoxInfo } from "./BoxInfo/BoxInfo";
import { RawOfTableNewFiles } from "./RawOfTable/RawOfTableNewFiles";



export const NewFilesTable = (props) => {

    let raw = props.bird.map((b,index) => <RawOfTableNewFiles key={index} handleClick={props.handleClick} check={props.check.includes(b.id)} id={b.id}
     title={b.title} percentage={b.percentage} bird_specie={b.bird_specie} userName={b.userName}
     created={b.created} update={b.update} />)
     const boxInfo = props.bird.map((b,index) => <BoxInfo id={b.id} englishName={b.englishName}
     title={b.title} percentage={b.percentage} bird_specie={b.bird_specie} userName={b.userName}
     created={b.created} update={b.update} key={index} />)
    return (
        <div className={s.table__content}>
        <table className={s.table}>
            <thead>
                <tr>
                    <td></td>
                    <td>id</td>
                    <td>title</td>
                    <td>recognition percentage</td>
                    <td>bird specie</td>
                    <td>audiofile</td>
                    <td>user name</td>
                    <td>created at</td>
                    <td>update at</td>
                    <td>approval form</td>
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