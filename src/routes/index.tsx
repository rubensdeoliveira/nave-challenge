import React from 'react'

import { Switch } from 'react-router-dom'
import Route from './Route'

import SignIn from '../pages/SignIn'

import Home from '../pages/Home'
import CreateNaver from '../pages/CreateNaver'
import EditNaver from '../pages/EditNaver'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/home" component={Home} isPrivate />
    <Route path="/create-naver" component={CreateNaver} isPrivate />
    <Route path="/edit-naver" component={EditNaver} isPrivate />
  </Switch>
)

export default Routes
