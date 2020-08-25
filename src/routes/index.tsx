import React from 'react'

import { Switch, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'

import Home from '../pages/Home'
import CreateNaver from '../pages/CreateNaver'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Home} />
    <Route path="/create-naver" component={CreateNaver} />
  </Switch>
)

export default Routes
