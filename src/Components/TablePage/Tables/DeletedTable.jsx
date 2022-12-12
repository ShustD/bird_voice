import React from "react";
import s from '../TablePage.module.css'

export const DeletedTable = () => {

    return (
        <div className={s.table__content}>
        <table>
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
                
            </tbody>

        </table>
    </div>
    )
}