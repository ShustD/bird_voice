import React, { useEffect, useState } from "react";
import s from '../TablePage.module.scss'
import { BoxInfo } from "./BoxInfo/BoxInfo";
import { RawOfTableNewFiles } from "./RawOfTable/RawOfTableNewFiles";
import { useDispatch, useSelector } from "react-redux";
import { collectionUpdate, fetchCollection } from "../../../store/collectionSlice";
import preloader from '../../../assets/preloader.png'
import { BeenhereOutlined, Delete, LibraryAddCheckOutlined } from "@material-ui/icons";
import { Paginator } from "../../Paginator/Paginator";
import { LinksForTables } from "../../LinksForTables/LinksForTables";
import { Loader } from "../../Loader/Loader";



export const NewFilesTable = (props) => {
    const dispatch = useDispatch()
    const { collection, status, error } = useSelector(state => state.collection)
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);


    useEffect(() => {
        dispatch(fetchCollection('https://bird-sounds-database.ssrlab.by/api/audio_list_views/?deleted=false&validated=false'))
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
    const approveElements = (isCheck) => {
        dispatch(collectionUpdate({ isCheck, key: 'validated', deleted: true, validated: false }))
        setIsCheck([])
    }
    const refuseElements = (isCheck) => {
        dispatch(collectionUpdate({ isCheck, key: 'deleted', deleted: true, validated: false }))
        setIsCheck([])
    }
    let raw = collection.map((b, index) => <RawOfTableNewFiles key={index}
        approveElements={approveElements} refuseElements={refuseElements} handleClick={handleClick} check={isCheck.includes(b.id)} {...b} />)
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
                                <LinksForTables tableState={'newFiles'} />
                                {status === 'loading' ?
                                    <div className={s.preloader_body}><img className={s.preloader} src={preloader} alt="" /></div> :
                                    <>
                                        <div className={s.table__header}>
                                            <div className={s.buttons__container}>
                                                <div>filter</div>
                                                <div onClick={() => handleSelectAll()}
                                                    style={isCheckAll ? { color: '#FFFFFF' } : null}> <span>select all </span> <LibraryAddCheckOutlined />
                                                </div>
                                                <div onClick={() => approveElements(isCheck)}>
                                                    <span>approve</span> <BeenhereOutlined />
                                                </div>
                                                <div onClick={() => refuseElements(isCheck)}>
                                                    <span>refuse</span>  <Delete />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={s.table__content}>
                                            <table className={s.table}>
                                                <thead>
                                                    <tr>
                                                        <td></td>
                                                        <td>id</td>
                                                        <td>title</td>
                                                        <td>validated</td>
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
                                            <div className={s.boxInfo}>
                                                {boxInfo}
                                            </div>
                                        </div>
                                        <Paginator
                                            url={'https://bird-sounds-database.ssrlab.by/api/audio_list_views/?deleted=false&validated=false&page='} />
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