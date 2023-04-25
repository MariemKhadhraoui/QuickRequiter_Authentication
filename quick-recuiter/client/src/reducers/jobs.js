import { FETCH_ALL,FILTER_JOBS, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, jobs: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        jobs: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, jobs: action.payload.data };
    case FETCH_POST:
      return { ...state, job: action.payload.job };
    case LIKE:
      return { ...state, jobs: state.jobs.map((job) => (job._id === action.payload._id ? action.payload : job)) };
    case COMMENT:
      return {
        ...state,
        jobs: state.jobs.map((job) => {
          if (job._id == +action.payload._id) {
            return action.payload;
          }
          return job;
        }),
      };
    case CREATE:
      return { ...state, jobs: [...state.jobs, action.payload] };
    case UPDATE:
      return { ...state, jobs: state.jobs.map((job) => (job._id === action.payload._id ? action.payload : job)) };
    case DELETE:
      return { ...state, jobs: state.jobs.filter((job) => job._id !== action.payload) };
      case FILTER_JOBS:
  return { ...state, jobs: action.payload.data };
    
      default:
      return state;
  }
};

