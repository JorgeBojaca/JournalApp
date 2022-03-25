import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { JournalScreen } from '../journal/JournalScreen';

export const JournalRouter = () => {
  return (
    <div className="journal__main">
      <Routes>
        <Route path="JournalApp" element={<JournalScreen />} />
        <Route path="*" element={<Navigate to="JournalApp" />} />
      </Routes>
    </div>
  );
};
