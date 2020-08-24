import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'

import SignIn from '../pages/SignIn'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SignIn} />

    <Route path="/dashboard" exact component={Dashboard} />
  </Switch>
)

export default Routes
