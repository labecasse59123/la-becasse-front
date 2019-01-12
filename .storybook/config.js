import { transform } from 'lodash';
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { Provider as StoreProvider } from 'react-redux';
import { configureViewport, withViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { BREAKPOINTS_MAP } from '../src/config/style';
import store from '../src/redux/store';

// Structure stories by using root|group/Component story names.
addDecorator(withOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
}));

// Add breakpoints viewports to the list of devices.
configureViewport({
  defaultViewport: 'responsive',

  viewports: {
    // Default is responsive (behaves as if no viewport selected).
    responsive: {
      type: 'desktop',
      name: 'Responsive',
      styles: {
        width: '100%',
        height: '100%',
      },
    },

    // Add default devices viewports.
    ...INITIAL_VIEWPORTS,

    // Add app breakpoints as desktop viewports.
    ...transform(
      BREAKPOINTS_MAP,
      (result, bpMaxWidth, bpName) => {
        result[bpName] = {
          type: 'desktop',
          name: `${bpName} (${bpMaxWidth}px) -- custom breakpoint`,
          styles: {
            width: `${bpMaxWidth}px`,
            // Otherwise addon-viewport does not fill the device height.
            height: '100%',
          },
        };
      },
    ),
  },
});

// Add a viewport selector for each stories, to see how components are displayed on each device.
addDecorator(withViewport());

// Add a redux store for each stories.
addDecorator(getStory => (
  <StoreProvider store={store}>
    {getStory()}
  </StoreProvider>
));

function loadStories() {
  const req = require.context('../src/react', true, /\.stories\.jsx?$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
