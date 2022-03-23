import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { resetNotes } from './notes';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPass = (email, pass) => (dispatch) => {
  dispatch(startLoading());
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(({ user: { uid, displayName } }) => {
      dispatch(login(uid, displayName));
      dispatch(finishLoading());
    })
    .catch(({ message }) => {
      console.log(message);
      Swal.fire('Error', message, 'error');
      dispatch(finishLoading());
    });
};

export const startGoogleLogin = () => (dispatch) => {
  dispatch(startLoading());
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(({ user: { displayName, uid } }) =>
      dispatch(login(uid, displayName))
    );
};

export const startRegisterNameEmailPassword = (email, password, name) => (
  dispatch
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      await user.updateProfile({ displayName: name });
      dispatch(login(user.uid, user.displayName));
    })
    .catch(({ message }) => {
      console.log(message);
      Swal.fire('Error', message, 'error');
    });
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
export const startLogout = () => (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(logout());
      dispatch(resetNotes());
    })
    .catch(console.log);
};

export const logout = () => ({ type: types.logout });
