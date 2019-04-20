import agent from 'superagent';
import use from 'superagent-use';
import prefix from 'superagent-prefix';
import JWT from 'superagent-jwt';

import env from 'config/env';

const request = use(agent);

request.use(prefix(env.api));
request.use(JWT({
  header: 'jwt', // Try to read jwt from header 'jwt'
  local: 'jwt', // Try to fetch jwt from localstorage key 'jwt'
}));

export default request;
