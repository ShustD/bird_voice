import React, { useEffect, useState } from "react";
import s from '../TablePage.module.scss'
import { BoxInfo } from "./BoxInfo/BoxInfo";
import { RawOfTableStatistics } from "./RawOfTable/RawOfTableStatistics";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollection } from "../../../store/collectionSlice";
//import { LibraryAddCheckOutlined } from "@material-ui/icons";
import { Paginator } from "../../Paginator/Paginator";
import { LinksForTables } from "../../LinksForTables/LinksForTables";
import { Loader } from "../../Loader/Loader";

export const StatisticsTable = (props) => {
    const dispatch = useDispatch()
    const { collection, status, error } = useSelector(state => state.collection)
    // const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    useEffect(() => {
        dispatch(fetchCollection('https://bird-sounds-database.ssrlab.by/api/specie_list_views/'))
    }, [dispatch])

    // const handleSelectAll = () => {
    //     setIsCheckAll(!isCheckAll);
    //     setIsCheck(collection.map((li) => li.id));
    //     if (isCheckAll) {
    //         setIsCheck([]);
    //     }
    // };
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

    // const deleteElements = () => {
    //     dispatch(collectionUpdate({ isCheck, key: 'deleted', deleted: true, validated: true }))
    //     setIsCheck([])
    // }
    let raw = collection.map((b, index) => <RawOfTableStatistics key={index} handleClick={handleClick} check={isCheck.includes(index)} {...b} />)
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
                                <LinksForTables tableState={'statistics'} />
                                        <div className={s.table__header} style={{marginTop: '20px'}}>
                                            {/* <div className={s.buttons__container}>
                                                <div >filter</div>
                                                <div onClick={() => handleSelectAll()}
                                                    style={isCheckAll ? { color: '#FFFFFF' } : null}>select all <LibraryAddCheckOutlined /></div>
                                                <div onClick={() => deleteElements()}>delete</div>
                                            </div> */}
                                        </div>
                                        <div className={s.table__content}>
                                            <table className={s.table}>
                                                <thead>
                                                    <tr>
                                                        <td></td>
                                                        <td>discription</td>
                                                        <td>specie name</td>
                                                        <td>specie verbose name</td>
                                                        {/* <td>id</td>
                            <td>bird specie</td>
                            <td>second specie</td>
                            <td>latin specie name</td>
                            <td>english specie name</td>
                            <td>belarusian specie name</td>
                            <td>audiofiles quality</td>
                            <td>photo quality</td>
                            <td>map</td> */}
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
                                        <Paginator />
                                    
                                
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