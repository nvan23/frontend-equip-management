import React from 'react'
import { Router } from 'react-router-dom'

import { history } from './helpers/history'
import AppLayout from './layout'

import { StoreProvider } from './context/storeProvider'

function App () {
  return (
    <Router history={history}>
      <StoreProvider>
        <AppLayout />
      </StoreProvider>
    </Router>
  );
}

export default App;
