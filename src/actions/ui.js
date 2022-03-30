import { types } from '../types/types';

export const setErrorMsg = (msg) => ({
  type: types.uiSetError,
  payload: msg,
});

export const removeErrorMsg = () => ({
  type: types.uiRemoveError,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
});
export const finishLoading = () => ({
  type: types.uiFinishLoading,
});

export const toggleMenu = () => ({
  type: types.uiToggleMenu,
});
