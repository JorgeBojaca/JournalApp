import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route path="JournalApp/auth">
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="JournalApp/auth/login" />} />
        </Routes>
      </div>
    </div>
  );
};
