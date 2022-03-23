import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import deleteImage from '../helpers/deleteImage';
import { swalLoader } from '../helpers/swalHelper';
import { types } from '../types/types';

export const addNoteFireStore = (note) => async (dispatch, getState) => {
  swalLoader('Guardando...');
  const { uid } = getState().auth;
  const docRef = await db
    .collection(uid)
    .doc('journal')
    .collection('notes')
    .add({ ...note });
  dispatch(addNote({ note, id: docRef.id }));
  dispatch(selectActiveNote(docRef.id));

  Swal.fire('Nota Agregada', note.title, 'success');
};

export const getNotesFireStore = () => async (dispatch, getState) => {
  const { uid } = getState().auth;
  const notes = {};

  const notesRef = await db
    .collection(uid)
    .doc('journal')
    .collection('notes')
    .get();
  notesRef.forEach((note) => {
    notes[note.data().id] = note.data();
  });
  dispatch(setNotes(notes));
};

export const updateNoteFireStore = (note, id) => async (dispatch, getState) => {
  swalLoader('Actualizando...');

  const { uid } = getState().auth;
  await db
    .collection(uid)
    .doc('journal')
    .collection('notes')
    .doc(id)
    .update(note);

  dispatch(updateNote({ ...note, id }));
  Swal.fire('Nota Actualizada', note.title, 'success');
};

export const deleteNoteFireStore = (id) => async (dispatch, getState) => {
  const confirm = await Swal.fire({
    title: '¿Estás seguro que deseas eliminar esta nota?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, elimínala!',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true,
  });
  if (confirm.isConfirmed) {
    swalLoader('Eliminando...');
    const {
      auth,
      notes: { notes },
    } = getState();
    const { uid } = auth;
    const urlImage = notes[id]?.urlImage;
    await db
      .collection(uid)
      .doc('journal')
      .collection('notes')
      .doc(id)
      .delete();

    if (urlImage) {
      await deleteImage(urlImage);
    }
    dispatch(deleteNote(id));
    Swal.fire('Nota eliminada correctamente', '', 'success');
  }
};

export const addNote = (note) => ({ type: types.notesAddNote, payload: note });

export const deleteNote = (id) => ({
  type: types.notesDeleteNote,
  payload: id,
});

export const selectActiveNote = (id) => ({
  type: types.notesSelectActiveNote,
  payload: id,
});

export const updateNote = (note) => ({
  type: types.notesUpdateNote,
  payload: note,
});

export const newNote = () => ({ type: types.notesNewNote });

export const resetNotes = () => ({ type: types.notesLogoutCleaning });

export const setNotes = (notes) => ({
  type: types.notesSetNotes,
  payload: notes,
});

export const refreshActive = () => ({ type: types.notesRefreshActive });
