import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "../Main/Main";
import { SignUp } from "../SignUp/SignUp";
import { SignIn } from "../SignIn/SignIn";
import { Forgot } from "../Forgot/Forgot";
import { Letter } from "../Letter/Letter";
import { UserRecognition } from "../UserRecognition/UserRecognition";
import { CollectionTable } from "../TablePage/Tables/CollectionTable";
import { DeletedTable } from "../TablePage/Tables/DeletedTable";
import { NewFilesTable } from "../TablePage/Tables/NewFilesTable";
import { StatisticsTable } from "../TablePage/Tables/StatisticsTable";
import { SettingPage } from "../SettingPage/SettingPage";
import { TableAdd } from "../TablePage/TableAdd/TableAdd";
import { useSelector } from "react-redux";

export const Auth = () => {
  const { isAuth } = useSelector((state) => state.auth);

     return (
      <>
      <Routes>
          <Route path='/' element={<Main />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='forgot' element={<Forgot  />} />
          <Route path='letter' element={<Letter />} />

          {isAuth && <>
                    <Route path="userrecognition" element={<UserRecognition/>} />
          <Route path='collectiontable' element={<CollectionTable/>} />\
          <Route path='deletetable' element={<DeletedTable />} />
          <Route path='newfilestable' element={<NewFilesTable  />} />
          <Route path='statisticstable' element={<StatisticsTable />} />
          <Route path='settingspage' element={<SettingPage  />} />
          <Route path='tableadd' element={<TableAdd />} />
          </>}

          <Route path='*' element={<Navigate to={'/'} />} />

        </Routes>
      </>
     )
};
