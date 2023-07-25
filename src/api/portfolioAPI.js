import dbContext from './applicationDbContext';

const endpoints = [
  {
    url: '/movies',
    method: 'GET',
    response: params => response.ok(dbContext.movies)
  },
  {
    url: '/movies/:id',
    method: 'GET',
    response: id => {
      const movie = dbContext.movies.find(
        m => m.id.toString() === id.toString()
      );
      if (!movie) {
        return response.error(404, `Movie with id ${id} was not found`);
      }
      return response.ok(movie);
    }
  }
];

const request = (url, method, data, config = {}) => {
  const requestUrlSplit = url.split('/');

  const endpoint = endpoints.find(e => {
    const endpointUrlSplit = e.url.split('/');

    if (endpointUrlSplit.length !== requestUrlSplit.length) {
      return false;
    }

    return endpointUrlSplit.every((s, i) =>
      (!s || !!requestUrlSplit[i]) && s.startsWith(':')
        ? /.*/.test(requestUrlSplit[i])
        : s === requestUrlSplit[i]
    );
  });

  if (!endpoint) {
    response.error(404, 'Endpoint Not Found');
  }

  const urlIds = [];
  endpoint.url.split('/').forEach((e, index) => {
    if (e.startsWith(':')) {
      urlIds.push(requestUrlSplit[index]);
    }
  });

  switch (method) {
    case 'GET':
    case 'DELETE':
      return endpoint.response(...urlIds, config.params);
    default:
      return endpoint.response(...urlIds, data, config.params);
  }
};

const response = {
  ok: data => {
    return {
      statusCode: 200,
      data
    };
  },
  error: (statusCode, errorMessage) => {
    throw new Error(errorMessage, {
      error: errorMessage,
      statusCode
    });
  }
};

const portfolioAPI = {
  get: (url, config) => request(url, 'GET', null, config),
  post: (url, data, config) => request(url, 'POST', data, config),
  put: (url, data, config) => request(url, 'PUT', data, config),
  delete: (url, config) => request(url, 'DELETE', null, config)
};

export default portfolioAPI;
