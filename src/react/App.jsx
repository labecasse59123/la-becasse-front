import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import store from 'redux/store';

import { BREAKPOINTS_MAP } from 'config/style';

/**
 * App root.
 */
export default function App() {
  return (
    <ReduxProvider store={store}>
      <h1>My App</h1>

      <p>Breakpoints:</p>
      <pre>{JSON.stringify(BREAKPOINTS_MAP, null, 2)}</pre>
    </ReduxProvider>
  );
}
