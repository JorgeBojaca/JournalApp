import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteFireStore, updateNoteFireStore } from '../../actions/notes';
import { toggleMenu } from '../../actions/ui';

export const NotesAppBar = ({ note, setPicture, setSubmitted }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { active } = useSelector(({ notes }) => notes);

  const date = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString('es-Es', {
      // weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const handleAdd = () => {
    const { title, body, urlImage } = note;
    if (title || body) {
      if (active.id) {
        if (
          active.title !== title ||
          active.body !== body ||
          active.urlImage !== urlImage
        ) {
          dispatch(updateNoteFireStore({ ...note }, active.id));
        }
      } else {
        dispatch(addNoteFireStore({ ...note, date: new Date().getTime() }));
      }
      setSubmitted();
    }
  };
  const handleSelectPicture = () => ref.current.click();

  const handleMenu = () => dispatch(toggleMenu());

  return (
    <div className="notes__appbar">
      <div className="journal__sidebar-menu-button">
        <i className="fa-solid fa-bars" onClick={handleMenu}></i>
      </div>
      <span>{date}</span>
      <input
        ref={ref}
        type="file"
        onChange={setPicture}
        style={{ display: 'none' }}
      ></input>
      <div>
        <button className="btn" onClick={handleSelectPicture}>
          Picture
        </button>
        <button className="btn" onClick={handleAdd}>
          Save
        </button>
      </div>
    </div>
  );
};
