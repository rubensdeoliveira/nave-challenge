import React from 'react'

import { Switch, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'

import Home from '../pages/Home'
import CreateNaver from '../pages/CreateNaver'
import EditNaver from '../pages/EditNaver'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Home} />
    <Route path="/create-naver" component={CreateNaver} />
    <Route path="/edit-naver" component={EditNaver} />
  </Switch>
)

export default Routes
