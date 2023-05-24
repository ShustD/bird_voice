import { Add } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Bird } from './bird.svg'
import s from './LinksForTables.module.scss'

export const LinksForTables = ({ tableState }) => {

    return (
        <>
            <div className={s.table__buttons}>
                <div className={s.buttons__container}>
                    <NavLink to='/collectiontable'>
                        <div style={tableState === 'collection' ? { color: '#FFFFFF' } : null}>
                            collection
                        </div>
                    </NavLink>
                    <NavLink to='/statisticstable'>
                        <div style={tableState === 'statistics' ? { color: '#FFFFFF' } : null}>
                            statistics
                        </div>
                    </NavLink>
                    <NavLink to='/newfilestable'>
                        <div style={tableState === 'newFiles' ? { color: '#FFFFFF' } : null}>
                            new files
                        </div>
                    </NavLink>
                    <NavLink to='/deletetable'>
                        <div style={tableState === 'deleted' ? { color: '#FFFFFF' } : null}>
                            deleted
                        </div>
                    </NavLink>

                </div>
            </div>
            <NavLink to='/tableadd'>
                <div className={s.table__add}>
                    <Add className={s.icon_add} style={{ fontSize: '32' }} />
                    <span>add new</span>
                    <Bird width="32" height="32" />
                </div>
            </NavLink>
        </>
    )
}