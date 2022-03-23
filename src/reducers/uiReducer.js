import { types } from '../types/types';

const initialState = {
  loading: true,
  component: null,
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
        component: action.payload,
      };
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
        component: null,
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
