import { types } from '../types/types';

export const setErrorMsg = (msg) => ({
  type: types.uiSetError,
  payload: msg,
});

export const removeErrorMsg = () => ({ type: types.uiRemoveError });

export const startLoading = (comp = null) => ({
  type: types.uiStartLoading,
  payload: comp,
});
export const finishLoading = () => ({
  type: types.uiFinishLoading,
});

export const toggleMenu = () => ({
  type: types.uiToggleMenu,
});
