import createProvider from './createProvider';
import portfolioMockAPI from '../api/MockPortfolioAPI';

const initialState = {
  showAuthModal: false,
  defaultAuthModalView: '',
  isAuthenticated: false,
  tokenAttempted: false,
  userData: null,
  error: null,
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        loading: true,
        error: null,
        ...(action.payload ? action.payload : {})
      };
    case 'SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return initialState;
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const login =
  dispatch =>
  async ({ email, password }, onSuccessCallback, onErrorCallback) => {
    try {
      const response = await portfolioMockAPI.post('/auth/login');
      dispatch({
        type: 'SUCCESS',
        payload: {
          userData: response.data,
          isAuthenticated: true,
          tokenAttempted: true
        }
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      if (onErrorCallback) {
        onErrorCallback(error.message);
      }
    }
  };

const signUp =
  dispatch =>
  async ({ email, password }, onSuccessCallback, onErrorCallback) => {
    try {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      if (onErrorCallback) {
        onErrorCallback(error.message);
      }
    }
  };

const sendPasswordReset =
  dispatch =>
  async ({ email }, onSuccessCallback, onErrorCallback) => {
    try {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      if (onErrorCallback) {
        onErrorCallback(error.message);
      }
    }
  };

const resetPassword =
  dispatch =>
  async ({ email, code, newPassword }, onSuccessCallback, onErrorCallback) => {
    try {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      if (onErrorCallback) {
        onErrorCallback(error.message);
      }
    }
  };

const changePassword =
  dispatch =>
  async ({ oldPassword, newPassword }, onSuccessCallback, onErrorCallback) => {
    try {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      if (onErrorCallback) {
        onErrorCallback(error.message);
      }
    }
  };

const sendConfirmationCode =
  dispatch =>
  async ({ email }, onSuccessCallback, onErrorCallback) => {
    try {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      if (onErrorCallback) {
        onErrorCallback(error.message);
      }
    }
  };

const confirmAccount =
  dispatch =>
  async ({ email, code }, onSuccessCallback, onErrorCallback) => {
    try {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
      if (onErrorCallback) {
        onErrorCallback(error.message);
      }
    }
  };

const logout = dispatch => async () => {
  try {
    dispatch({ type: 'RESET' });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
};

const toggleAuthModal = dispatch => async (isOpen, defaultAuthModalView) => {
  try {
    dispatch({
      type: 'SUCCESS',
      payload: {
        showAuthModal: isOpen,
        defaultAuthModalView
      }
    });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
};

export const { Provider, Context } = createProvider(
  reducer,
  {
    changePassword,
    confirmAccount,
    login,
    logout,
    resetPassword,
    sendConfirmationCode,
    sendPasswordReset,
    signUp,
    toggleAuthModal
  },
  initialState
);
