import { profileReducer } from './ProfileReduce';
import { projectReducer } from './ProjectReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  profileState: profileReducer,
  projectState: projectReducer
});