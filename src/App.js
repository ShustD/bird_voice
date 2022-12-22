import './App.scss';
import { Footer } from './Components/Footer/Footer';
import { Main } from './Components/Main/Main';
import { SignIn } from './Components/SignIn/SignIn';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Forgot } from './Components/Forgot/Forgot';
import { SignUp } from './Components/SignUp/SignUp';
import { Header } from './Components/Header/Header';
import { Letter } from './Components/Letter/Letter';
import { UserRecognition } from './Components/UserRecognition/UserRecognition';
import { TablesPage } from './Components/TablePage/TablesPage';
import { SettingPage } from './Components/SettingPage/SettingPage';
import { SelectUsers } from './Components/SelectUsers/SelectUsers';
import { ScientCode } from './Components/ScientCode/ScientCode';


export const App = () => {


  return (
    <div className='app__container'>
      <div className='app__content'>

        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='forgot' element={<Forgot />} />
            <Route path='letter' element={<Letter />} />
            <Route path='userrecognition' element={<UserRecognition />} />
            <Route path='tablespage' element={<TablesPage />} />
            <Route path='settingspage' element={<SettingPage />} />
            <Route path='selectusers' element={<SelectUsers />} />
            <Route path='scientcode' element={<ScientCode />} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className='app__footer'>
        <Footer />
      </div>
    </div>
  )
}
