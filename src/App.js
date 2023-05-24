import './App.scss';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Auth } from './Components/Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';
import { Loader } from './Components/Loader/Loader';

export const App = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth === null) {
      dispatch(checkAuth())
    }
  }, [isAuth, dispatch]);

  return (
    <div className='app__container'>
      <div className='app__content'>
        <Header />
        {isAuth === null ?
          <Loader /> :
          <Auth />
        }
      </div>
      <div className='app__footer'>
        <Footer />
      </div>
    </div>
  )
}
