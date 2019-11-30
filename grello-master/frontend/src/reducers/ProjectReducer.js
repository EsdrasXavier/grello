import { SET_PROJECT } from '../actions/actionTypes';

const initialState = {
  project: null
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project: action.project
      };
    default:
      return state;
  }
};