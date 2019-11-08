import { SET_PROFILE } from '../actions/actionTypes';

const initialState = {
  profile: null
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
};