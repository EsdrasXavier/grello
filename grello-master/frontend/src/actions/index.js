import { SET_PROFILE, SET_PROJECT } from './actionTypes';

export const setProfile = value => ({
  type: SET_PROFILE,
  profile: value
});

export const setProject = value => ({
  type: SET_PROJECT,
  project: value
})