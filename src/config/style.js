import { transform } from 'lodash';

import sassConfig from 'style/config.variables.scss';

// Convert { small: '400px' } to { small: 400 }, etc.
// To match redux-responsive parameter schema.
export const BREAKPOINTS_MAP = transform(
  sassConfig.breakpoints,
  (breakpoints, bpValue, bpName) => {
    breakpoints[bpName] = parseInt(bpValue, 10);
  },
);
