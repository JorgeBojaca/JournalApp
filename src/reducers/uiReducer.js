import { types } from '../types/types';

const initialState = {
  loading: true,
  uiErrorMsg: null,
  showMenu: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setError:
      return {
        ...state,
        uiErrorMsg: action.payload,
      };
    case types.removeError:
      return {
        ...state,
        uiErrorMsg: null,
      };
    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    case types.uiToggleMenu:
      return {
        ...state,
        showMenu: !state.showMenu,
      };

    default:
      return state;
  }
};
