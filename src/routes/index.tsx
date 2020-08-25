import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'

import SignIn from '../pages/SignIn'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Home} />
  </Switch>
)

export default Routes
