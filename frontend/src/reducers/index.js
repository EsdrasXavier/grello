import { profileReducer } from './ProfileReduce';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  profileState: profileReducer
});