import React from 'react';
import { useSelector } from 'react-redux';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {
  const { active } = useSelector(({ notes }) => notes);

  return (
    <>
      <Sidebar />
      <main className="journal__container">
        {active ? <NoteScreen /> : <NothingSelected />}
      </main>
    </>
  );
};
