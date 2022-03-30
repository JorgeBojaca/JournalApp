import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../actions/ui';

export const NothingSelected = () => {
  const dispatch = useDispatch();
  const handleMenu = () => dispatch(toggleMenu());

  return (
    <div className="nothing-selected__container">
      <div className="nothing-selected__menu-btn">
        <i className="fa-solid fa-bars" onClick={handleMenu}></i>
      </div>
      <i className="fa-regular fa-star fa-5x"></i>
      <h1>Ninguna Entrada Seleccionada</h1>
    </div>
  );
};
