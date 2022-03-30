import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { firebase } from '../../firebase/firebase-config';

import { AuthRouter } from './AuthRouter';
import { JournalRouter } from './JournalRouter';
import { login, logout } from '../../actions/auth';
import { finishLoading } from '../../actions/ui';
import { LoadingScreen } from '../ui/LoadingScreen';
import { useNotesObs } from '../../hooks/useNotesObs';

export const AppRouter = () => {
  const { uid } = useSelector(({ auth }) => auth);
  const { loading } = useSelector(({ ui }) => ui);

  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user?.uid) {
          dispatch(login(user.uid, user.displayName));
        } else {
          dispatch(logout());
        }
        dispatch(finishLoading());
      },
      () => {
        dispatch(finishLoading());
      }
    );
  }, []);
  useNotesObs(uid); //Hook encargado de observar cambios en las notas
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <BrowserRouter basename="JournalApp">
          {!uid ? <AuthRouter /> : <JournalRouter />}
        </BrowserRouter>
      )}
    </>
  );
};
