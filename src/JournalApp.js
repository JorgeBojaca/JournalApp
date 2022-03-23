import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './componets/routers/AppRouter';
import { store } from './store/store';

export const JournalApp = () => {
  const [login, setLogin] = useState(false);
  return (
    <Provider store={store}>
      <AppRouter login={login} setLogin={setLogin} />
    </Provider>
  );
};
