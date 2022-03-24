import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectActiveNote } from '../../actions/notes';

export const JournalEntry = ({ note }) => {
  const dispatch = useDispatch();
  const { active: activeNote } = useSelector(({ notes }) => notes);
  const { id, title, body, date, urlImage } = note;
  const handleSelectNote = () => {
    if (activeNote?.id !== id) {
      dispatch(selectActiveNote(id));
    }
  };
  const getDate = () => {
    if (typeof date === 'number') {
      const strDate = new Date();
      strDate.setTime(date);
      return strDate.toLocaleDateString('es-Es', {
        // weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return date;
  };
  return (
    <div className="journal__entry" onClick={handleSelectNote} title={title}>
      <div className="journal__entry-box-image">
        <div
          className="journal__entry-image"
          style={{
            backgroundImage: `url(${
              urlImage ||
              'https://duckduckgo.com/assets/logo_homepage.alt.v108.svg'
            })`,
          }}
        ></div>
      </div>

      <div className="journal__entry-box">
        <div className="journal__entry-box-title">{title}</div>
        <div className="journal__entry-box-body">{body}</div>
        <div className="journal__entry-box-date">{getDate()}</div>
      </div>
    </div>
  );
};
