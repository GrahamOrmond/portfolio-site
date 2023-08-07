import mockPortfolioEndpoints from './mockPortfolioEndpoints';

const request = (url, method, data, config = {}) => {
  const requestUrlSplit = url.split('/');

  const endpoint = mockPortfolioEndpoints
    .filter(e => e.method === method)
    .find(e => {
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
    throw new Error('Endpoint Not Found', {
      error: 'Endpoint Not Found',
      statusCode: 404
    });
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

const portfolioMockAPI = {
  get: (url, config) => request(url, 'GET', null, config),
  post: (url, data, config) => request(url, 'POST', data, config),
  put: (url, data, config) => request(url, 'PUT', data, config),
  delete: (url, config) => request(url, 'DELETE', null, config)
};

export default portfolioMockAPI;
