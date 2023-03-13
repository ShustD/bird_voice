import React, {useState} from "react";
import s from './TablePage.module.scss'
import { CollectionTable } from "./Tables/CollectionTable";
import { DeletedTable } from "./Tables/DeletedTable";
import { NewFilesTable } from "./Tables/NewFilesTable";
import { StatisticsTable } from "./Tables/StatisticsTable";
import { Catalogues } from "./mock";

export const TablesPage = () => {
    const apiUrl = 'https://bird-sounds-database.ssrlab.by/api/audios/';
    
    fetch(apiUrl, {
      method: 'GET',
      mode: 'no-cors',
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })

    const [tableState, setTableState] = useState('collection')
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [list, setList] = useState(Catalogues);
    const [deleteList, setDeleteList] = useState([])
  
 
  
    const handleSelectAll = () => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(list.map((li) => li.id));
      if (isCheckAll) {
        setIsCheck([]);
      }
      
    };
    const deleteArr = () => {
        if ( tableState === 'deleted') {
            setDeleteList(deleteList.filter(item => !isCheck.includes(item.id)))
        } else {
            setList(list.filter(item => !isCheck.includes(item.id)))
            setDeleteList(list.filter(item => isCheck.includes(item.id)))  
        }
    }
    const addArr = () => {
        setList(list.concat(deleteList.filter(item => isCheck.includes(item.id))))
        setDeleteList(deleteList.filter(item => !isCheck.includes(item.id)))
    }
    const handleClick = (e) => {
      const { id, checked } = e.target;
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
      }
    };
    const changeTable = (table) => {
        switch (table) {
            case 'collection' : {
                return <CollectionTable bird={list} handleClick={handleClick} check={isCheck}/>
            }
            case 'statistics' : {
                return <StatisticsTable bird={list} handleClick={handleClick} check={isCheck}/>
            }
            case 'new files' : {
                return <NewFilesTable bird={list} handleClick={handleClick} check={isCheck}/>
            }
            case 'deleted' : {
                return <DeletedTable bird={deleteList} handleClick={handleClick} check={isCheck}/>
            }
            default : {
                return <CollectionTable bird={list} handleClick={handleClick} check={isCheck}/>
            }
        }
    }
    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.tablePage__container}>
                    <div className={s.table__buttons}>
                        <div className={s.buttons__container}>
                            <div style={tableState === 'collection' ? {color: '#FFFFFF'} : null}
                             onClick={() => setTableState('collection')}>collection</div>
                            <div style={tableState === 'statistics' ? {color: '#FFFFFF'} : null}
                            onClick={() => setTableState('statistics')}>statistics</div>
                            <div style={tableState === 'new files' ? {color: '#FFFFFF'} : null}
                            onClick={() => setTableState('new files')}>new files</div>
                            <div style={tableState === 'deleted' ? {color: '#FFFFFF'} : null}
                            onClick={() => setTableState('deleted')}>deleted</div>
                        </div>
                    </div>

                    <div className={s.table__add}>
                        add new
                    </div>
                    <div className={s.table__main}>
                        <div className={s.table__header}>
                            {tableState === 'new files' ? 
                            <div className={s.buttons__container}>
                            <div>filter</div>
                            <div onClick={() => handleSelectAll()}
                                style={isCheckAll ? {color: '#FFFFFF'} : null}>select all </div>
                            <div>approve</div>
                            <div>refuse</div>
                        </div>
                        : <div className={s.buttons__container}>
                                <div onClick={() => addArr()}>filter</div>
                                <div onClick={() => handleSelectAll()}
                                style={isCheckAll ? {color: '#FFFFFF'} : null}>select all</div>
                                <div onClick={() => deleteArr()}>delete</div>
                            </div>}
                            
                        </div>
                        {changeTable(tableState)}
                    
                    
                    </div>
                </div>
                <div className={s.upperCloud}></div>
                <div className={s.uuderCloud}></div>
            </div>
        </div>

    )
}