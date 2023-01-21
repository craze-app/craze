import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import CommandPalette from './components/organisms/command-palette/CommandPalette'
import MainLayout from './layouts/MainLayout'
import FeaturePage from './pages/Feature'
import HomePage from './pages/HomePage'

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <MainLayout>
          <Route exact path={'/'} component={HomePage} />
          <Route path={'/features/:id'} component={FeaturePage} />
        </MainLayout>
      </Switch>
      <CommandPalette />
    </HashRouter>
  )
}

export default Router
