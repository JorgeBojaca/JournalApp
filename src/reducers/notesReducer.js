import { types } from '../types/types';

const initialState = {
  notes: {},
  active: null,
};
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesAddNote:
      return {
        ...state,
        notes: {
          [action.payload.id]: {
            ...action.payload,
          },
          ...state.notes,
        },
      };

    case types.notesSelectActiveNote:
      return { ...state, active: state.notes[action.payload] };

    case types.notesUpdateNote: {
      const updatedNotes = { ...state.notes };
      updatedNotes[action.payload.id] = {
        ...action.payload,
      };
      return {
        ...state,
        notes: updatedNotes,
      };
    }

    case types.notesDeleteNote: {
      const updatedNotes = { ...state.notes };
      delete updatedNotes[action.payload];
      return {
        notes: updatedNotes,
        active: state.active?.id === action.payload ? null : state.active,
      };
    }

    case types.notesSetNotes:
      return {
        ...state,
        notes: action.payload,
      };

    case types.notesNewNote:
      return {
        ...state,
        active: { id: '', title: '', body: '', urlImage: '', prevUrlImage: '' },
      };

    case types.notesRefreshActive:
      return {
        ...state,
        active: state.notes[state.active?.id] || state.active,
      };

    case types.notesLogoutCleaning:
      return initialState;

    default:
      return state;
  }
};
