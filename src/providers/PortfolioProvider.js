import createProvider from './createProvider';
import dtleadsAPI from '../api/dtleadsAPI';
import portfolioMockAPI from '../api/MockPortfolioAPI';

const initialState = {
  dashboard: { value: null, loading: false, error: null },
  companies: { value: [], loading: false, error: null },
  company: { value: null, loading: false, error: null },
  prospect: { value: null, loading: false, error: null },
  prospects: { value: [], loading: false, error: null }
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

const fetchDashboardInfo = dispatch => async () => {
  try {
    dispatch({
      type: 'fetching',
      stateName: 'dashboard'
    });
    const response = await portfolioMockAPI.get('/dashboard');

    dispatch({
      type: 'success',
      stateName: 'dashboard',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'error',
      stateName: 'dashboard',
      payload: 'Oops something went wrong.'
    });
  }
};

const fetchCompanies =
  dispatch =>
  async ({ searchTerm, sortBy, orderBy }) => {
    try {
      dispatch({
        type: 'fetching',
        stateName: 'companies'
      });
      const response = await portfolioMockAPI.get('/companies', {
        params: { searchTerm, sortBy, orderBy }
      });

      dispatch({
        type: 'success',
        stateName: 'companies',
        payload: { value: [...response.data] }
      });
    } catch (e) {
      dispatch({
        type: 'error',
        stateName: 'companies',
        payload: 'Oops something went wrong.'
      });
    }
  };

const fetchCompany = dispatch => async id => {
  try {
    dispatch({
      type: 'fetching',
      stateName: 'company'
    });
    const response = await portfolioMockAPI.get(`/companies/${id}`);
    dispatch({
      type: 'success',
      stateName: 'company',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'error',
      stateName: 'company',
      payload: 'Oops something went wrong.'
    });
  }
};

const createCompany =
  dispatch =>
  async ({ name, domain, description }, onSuccess, onError) => {
    try {
      const response = await portfolioMockAPI.post('/companies', {
        name,
        domain,
        description
      });

      dispatch({
        type: 'append',
        stateName: 'companies',
        payload: response.data
      });
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (e) {
      dispatch({
        type: 'error',
        stateName: 'companies',
        payload: e.message
      });
      if (onError) {
        onError(e.message);
      }
    }
  };

const updateCompany =
  dispatch =>
  async (id, { name, domain, description }, onSuccess, onError) => {
    try {
      const response = await portfolioMockAPI.put(`/companies/${id}`, {
        name,
        domain,
        description
      });

      dispatch({
        type: 'replace',
        stateName: 'companies',
        payload: {
          filter: c => c.id !== id,
          value: response.data
        }
      });
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (e) {
      dispatch({
        type: 'error',
        stateName: 'companies',
        payload: e.message
      });
      if (onError) {
        onError(e.message);
      }
    }
  };

const deleteCompanies = dispatch => async (companyIds, onSuccess, onError) => {
  try {
    await portfolioMockAPI.delete('/companies', { params: { companyIds } });

    dispatch({
      type: 'remove',
      stateName: 'companies',
      payload: {
        filter: c => !companyIds.includes(c.id)
      }
    });
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    dispatch({
      type: 'error',
      stateName: 'companies',
      payload: e.message
    });
    if (onError) {
      onError(e.message);
    }
  }
};

const fetchProspects =
  dispatch =>
  async ({ searchTerm, sortBy, orderBy, fkCompany }) => {
    try {
      dispatch({
        type: 'fetching',
        stateName: 'prospects'
      });
      const response = await portfolioMockAPI.get('/prospects', {
        params: { searchTerm, sortBy, orderBy, fkCompany }
      });

      dispatch({
        type: 'success',
        stateName: 'prospects',
        payload: { value: [...response.data] }
      });
    } catch (e) {
      dispatch({
        type: 'error',
        stateName: 'prospects',
        payload: 'Oops something went wrong.'
      });
    }
  };

const fetchProspect = dispatch => async id => {
  try {
    dispatch({
      type: 'fetching',
      stateName: 'prospect'
    });
    const response = await portfolioMockAPI.get(`/prospects/${id}`);
    dispatch({
      type: 'success',
      stateName: 'prospect',
      payload: { value: response.data }
    });
  } catch (e) {
    dispatch({
      type: 'error',
      stateName: 'prospect',
      payload: 'Oops something went wrong.'
    });
  }
};

const createProspects =
  dispatch =>
  async ({ prospects }, onSuccess, onError) => {
    try {
      const response = await portfolioMockAPI.post('/prospects', {
        prospects
      });

      dispatch({
        type: 'append',
        stateName: 'prospects',
        payload: response.data
      });
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (e) {
      dispatch({
        type: 'error',
        stateName: 'prospects',
        payload: e.message
      });
      if (onError) {
        onError(e.message);
      }
    }
  };

const updateProspect =
  dispatch =>
  async (id, { firstName, lastName, email, title }, onSuccess, onError) => {
    try {
      const response = await portfolioMockAPI.put(`/prospects/${id}`, {
        firstName,
        lastName,
        email,
        title
      });

      dispatch({
        type: 'replace',
        stateName: 'prospects',
        payload: {
          filter: c => c.id !== id,
          value: response.data
        }
      });
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (e) {
      dispatch({
        type: 'error',
        stateName: 'prospects',
        payload: e.message
      });
      if (onError) {
        onError(e.message);
      }
    }
  };

const deleteProspects = dispatch => async (prospectIds, onSuccess, onError) => {
  try {
    await portfolioMockAPI.delete('/prospects', {
      params: { prospectIds }
    });

    dispatch({
      type: 'remove',
      stateName: 'prospects',
      payload: {
        filter: c => !prospectIds.includes(c.id)
      }
    });
    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    dispatch({
      type: 'error',
      stateName: 'prospects',
      payload: e.message
    });
    if (onError) {
      onError(e.message);
    }
  }
};

const findProspects =
  dispatch =>
  async ({ companyName, searchTerm }, onSuccess, onError) => {
    try {
      const result = await dtleadsAPI.post('/api/prospects/find-prospects', {
        companyName,
        searchTerm
      });

      if (onSuccess) {
        onSuccess(result.data);
      }
    } catch (e) {
      dispatch({
        type: 'error',
        stateName: 'prospects',
        payload: e.message
      });
      if (onError) {
        onError(e.message);
      }
    }
  };

export const { Provider, Context } = createProvider(
  reducer,
  {
    createCompany,
    createProspects,
    deleteCompanies,
    deleteProspects,
    fetchCompanies,
    fetchCompany,
    fetchDashboardInfo,
    fetchProspect,
    fetchProspects,
    findProspects,
    updateCompany,
    updateProspect
  },
  initialState
);
