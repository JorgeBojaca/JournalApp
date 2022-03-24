import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../actions/ui';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {
  const { notes } = useSelector(({ notes }) => notes);
  const dispatch = useDispatch();

  const notesArr = useMemo(() => {
    return Object.values(notes);
  }, [notes]);

  const handleMenu = () => dispatch(toggleMenu());

  return (
    <>
      {notesArr.length > 0 && (
        <div className="journal__entries" onClick={handleMenu}>
          {notesArr.map((note) => {
            return <JournalEntry key={note.id} note={note} />;
          })}
        </div>
      )}
    </>
  );
};
