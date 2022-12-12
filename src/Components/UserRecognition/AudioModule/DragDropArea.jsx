import React from "react";
import s from './AudioModule.module.css'
import preloader from '../../../assets/UserRecognition/preloader.png'


export const DragDropArea = (props) => {

    const changeArea = () => {
        if (props.animation) {
            return (
                <div className={s.preloader}>
                    <div className={s.drop_area}>
                        <img src={preloader} alt="" />
                        <div>у працэссе разнання</div>
                    </div>
                </div>
            )
        }
        else if (props.voice && !props.error && !props.drag) {
            return (
                <div className={s.drop_area}
                onDragStart={e => props.dragStartHandler(e)}
                    onDragLeave={e => props.dragLeaveHandler(e)}
                    onDragOver={e => props.dragStartHandler(e)}
                    
                >файл для распазнання павінен доўжыцца больш за 6 секунд, але менш за 3 хвіліны </div>
            )

        }
        else if (props.drag || (props.drag && props.error)) {
            return (
                <div className={s.drop_area}
                    onDragStart={e => props.dragStartHandler(e)}
                    onDragLeave={e => props.dragLeaveHandler(e)}
                    onDragOver={e => props.dragStartHandler(e)}
                    onDrop={e => props.onDropHandler(e)}
                >пакладзіце файл</div>
            )

        }
        else if (!props.drag && !props.voice) {
            return (
                <div className={s.drop_area}
                    onDragStart={e => props.dragStartHandler(e)}
                    onDragLeave={e => props.dragLeaveHandler(e)}
                    onDragOver={e => props.dragStartHandler(e)}
                >перацягніце абраны вамі файл у гэтую вобласць</div>
            )

        }
        else if (props.error && !props.drag) {
            return (
                <div className={s.preloader}>
                    <div className={s.drop_area}
                        onDragStart={e => props.dragStartHandler(e)}
                        onDragLeave={e => props.dragLeaveHandler(e)}
                        onDragOver={e => props.dragStartHandler(e)}
                        onDrop={e => props.onDropHandler(e)}
                    >памылка ў працэсе распазнання, загрузіце гук </div>
                </div>
            )

        }
    }
    return (

        <div>
            <div className={s.dragDrop}>
                {changeArea()}
            </div>

        </div>

    )
}