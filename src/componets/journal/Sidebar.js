import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JournalEntries } from './JournalEntries';
import { startLogout } from '../../actions/auth';
import { newNote } from '../../actions/notes';
import { toggleMenu } from '../../actions/ui';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const [displayInitMenu, setDisplayInitMenu] = useState('none');
  const [isInit, setIsInit] = useState(true);
  const { showMenu } = useSelector(({ ui }) => ui);

  //Evita la animación inicial de salida en el menu
  useEffect(() => {
    if (isInit) {
      setIsInit(false);
    } else if (displayInitMenu !== '') {
      setDisplayInitMenu('');
    }
  }, [showMenu]);

  const handleMenu = () => dispatch(toggleMenu());

  return (
    <>
      {/*Menú utilizado en pcs o tablets*/}
      <aside className="journal__sidebar fixed">
        <SidebarContent />
      </aside>

      {/*Menú utilizado en dispositivos pequeños*/}
      {showMenu && (
        <div className="journal__sidebar-to-hide" onClick={handleMenu}></div>
      )}
      <aside
        style={{ display: displayInitMenu }}
        className={
          showMenu
            ? 'journal__sidebar no-fixed'
            : 'journal__sidebar no-fixed hide'
        }
      >
        <SidebarContent />
      </aside>
    </>
  );
};

const SidebarContent = () => {
  const { name } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(startLogout());
  const handleNewEntry = () => {
    dispatch(newNote());
    dispatch(toggleMenu());
  };

  return (
    <>
      <div className="journal__sidebar-user">
        <span>
          <i className="fa-solid fa-moon"></i>&nbsp;{name}
        </span>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="journal__sidebar-new-entry" onClick={handleNewEntry}>
        <i className="fa-solid fa-calendar-days fa-5x"></i>
        <span>Nueva entrada</span>
      </div>
      <JournalEntries />
    </>
  );
};
