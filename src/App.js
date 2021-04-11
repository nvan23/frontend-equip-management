import React from 'react'
import { Router } from 'react-router-dom'

import { history } from './helpers/history'
import AppLayout from './layout'
import { ProvideAuth } from './helpers/useAuth'

function App () {
  return (
    <Router history={history}>
      <ProvideAuth>
        <AppLayout />
      </ProvideAuth>
    </Router>
  );
}

export default App;
