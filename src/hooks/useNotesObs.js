import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addNote,
  deleteNote,
  refreshActive,
  updateNote,
} from '../actions/notes';
import { db } from '../firebase/firebase-config';

export const useNotesObs = (uid) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = () => {};
    if (uid) {
      //TODO actulizar el active correctamente
      unsubscribe = db
        .collection(uid)
        .doc('journal')
        .collection('notes')
        .orderBy('date', 'asc')
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((changes) => {
            switch (changes.type) {
              case 'added':
                dispatch(
                  addNote({ ...changes.doc.data(), id: changes.doc.id })
                );
                break;
              case 'modified':
                dispatch(updateNote(changes.doc.data()));
                break;
              case 'removed':
                dispatch(deleteNote(changes.doc.id));
                break;
              default:
                break;
            }
          });
          dispatch(refreshActive());
        });
    }
    return () => {
      unsubscribe();
    };
  }, [uid]);
};
