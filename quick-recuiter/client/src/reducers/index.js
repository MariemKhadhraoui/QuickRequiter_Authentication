import { combineReducers } from 'redux';

import jobs from './jobs';
import auth from './auth';

export const reducers = combineReducers({ jobs, auth });
