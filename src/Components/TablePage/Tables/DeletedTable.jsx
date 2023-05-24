import React, { useEffect, useState } from "react";
import s from '../TablePage.module.scss'
import { BoxInfo } from "./BoxInfo/BoxInfo";
import { useDispatch, useSelector } from "react-redux";
import { collectionDeleteItem, collectionUpdate, fetchCollection } from "../../../store/collectionSlice";
import preloader from '../../../assets/preloader.png'
import { RawOfTableDelete } from "./RawOfTable/RawOfTableDelete";
import { LibraryAddCheckOutlined, RestoreFromTrash } from "@material-ui/icons";
import { Paginator } from "../../Paginator/Paginator";
import { LinksForTables } from "../../LinksForTables/LinksForTables";
import { Loader } from "../../Loader/Loader";

export const DeletedTable = () => {
    const dispatch = useDispatch()
    const { collection, status, error } = useSelector(state => state.collection)
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    useEffect(() => {
        dispatch(fetchCollection('https://bird-sounds-database.ssrlab.by/api/audio_list_views/?deleted=true'))
    }, [dispatch])

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(collection.map((li) => li.id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };
    const handleClick = (e, id) => {
        const index = isCheck.indexOf(id);
        if (index >= 0) {
            e.target.checked = true;
            setIsCheck(isCheck.filter((itemId) => itemId !== id));
        } else {
            e.target.checked = false;
            setIsCheck([...isCheck, id]);
        }
    };
    const deleteElements = () => {
        dispatch(collectionUpdate({ isCheck, key: 'deleted', deleted: false }))
        setIsCheck([])
    }
    const handleDelete = (id) => {
        dispatch(collectionDeleteItem(id))
    }
    let raw = collection.map((b, index) => <RawOfTableDelete key={index} handleClick={handleClick} handleDelete={handleDelete} check={isCheck.includes(b.id)} {...b} />)
    const boxInfo = collection.map((b, index) => <BoxInfo {...b} key={index} />)

    if (status === 'loading') {
        return <Loader />
    }
    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.tablePage__container}>
                    {error ? <h1>An error occured: {error}</h1> :
                        <>
                            <div className={s.table__main}>
                                <LinksForTables tableState={'deleted'} />
                                {status === 'loading' ?
                                    <div className={s.preloader_body}><img className={s.preloader} src={preloader} alt="" /></div> :
                                    <>
                                        <div className={s.table__header}>
                                            <div className={s.buttons__container}>
                                                <div >filter</div>
                                                <div onClick={() => handleSelectAll()}
                                                    style={isCheckAll ? { color: '#FFFFFF' } : null}><span>select all</span> <LibraryAddCheckOutlined /> </div>
                                                <div onClick={() => deleteElements()}><span>restore</span> <RestoreFromTrash /> </div>
                                            </div>
                                        </div>
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
                                                        <td>delete</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {raw}
                                                </tbody>
                                            </table>
                                            <div className={s.boxInfo}>
                                                {boxInfo}
                                            </div>
                                        </div>
                                        <Paginator 
                                        url={'https://bird-sounds-database.ssrlab.by/api/audio_list_views/?format=json&deleted=true&page='}/>
                                    </>
                                }
                            </div>
                        </>
                    }
                </div>
                <div className={s.upperCloud}></div>
                <div className={s.uuderCloud}></div>
            </div>
        </div>
    )
}