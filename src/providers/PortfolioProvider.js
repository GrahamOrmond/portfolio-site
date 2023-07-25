import createProvider from './createProvider';
import portfolioAPI from '../api/portfolioAPI';

const initialState = {
  movies: { value: [], loading: false, error: null }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          loading: true,
          error: null
        }
      };
    case 'success':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          ...action.payload,
          loading: false
        }
      };
    case 'error':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          loading: false,
          error: action.payload
        }
      };
    case 'replace':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: [
            ...state[action.stateName].value.filter(action.payload.filter),
            ...(Array.isArray(action.payload.value)
              ? action.payload.value
              : [action.payload.value])
          ],
          loading: false
        }
      };
    case 'append':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: Array.isArray(action.payload)
            ? [...state[action.stateName].value, ...action.payload]
            : [...state[action.stateName].value, action.payload],
          loading: false
        }
      };
    case 'remove':
      return {
        ...state,
        [action.stateName]: {
          ...state[action.stateName],
          value: state[action.stateName].value.filter(action.payload.filter),
          loading: false
        }
      };
    case 'reset':
      return {
        ...state,
        [action.stateName]: initialState[action.stateName]
      };
    default:
      return state;
  }
};

const fetchMovies = dispatch => async () => {
  try {
    dispatch({
      type: 'fetching',
      stateName: 'movies'
    });
    const response = await portfolioAPI.get('/movies');

    dispatch({
      type: 'success',
      stateName: 'movies',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'error',
      stateName: 'movies',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchMovie = dispatch => async id => {
  try {
    dispatch({
      type: 'fetching',
      stateName: 'movies'
    });
    const response = await portfolioAPI.get(`/movies/${id}`);
    dispatch({
      type: 'append',
      stateName: 'movies',
      payload: response.data
    });
  } catch (e) {
    dispatch({
      type: 'error',
      stateName: 'movies',
      payload: 'Oops something went wrong.'
    });
  }
};

export const { Provider, Context } = createProvider(
  reducer,
  {
    fetchMovie,
    fetchMovies
  },
  initialState
);
