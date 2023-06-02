import React from "react";
import s from './Paginator.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { fetchCollection } from "../../store/collectionSlice";

export const Paginator = ({url}) => {
    const dispatch = useDispatch()
    const { next, prev, count, currentPage } = useSelector(state => state.collection)
    const pageNumbers = Array.from({ length: Math.ceil(count / 10) }, (_, index) => index + 1);
    return (
        <div className={s.paginator}>
                        {prev ? <ArrowBackIos className={s.arrow_paginator} onClick={() => dispatch(fetchCollection(prev))} /> : null}
                        {pageNumbers.map(pageNumber =>  
                            <span 
                            onClick={() => dispatch(fetchCollection(`${url}${pageNumber}`))} 
                            className={currentPage === pageNumber ? s.page_current : s.page_number}
                            key={pageNumber}>
                                {pageNumber}
                            </span>
                        )}
                        {next ? <ArrowForwardIos className={s.arrow_paginator} onClick={() => dispatch(fetchCollection(next))} /> : null}
                    </div>
    )
}