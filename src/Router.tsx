import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import CommandPalette from './components/organisms/command-palette/CommandPalette'
import MainLayout from './layouts/MainLayout'
import FeaturePage from './pages/feature/Feature'
import HomePage from './pages/home-page/HomePage'

const Router = () => {
  return (
    <HashRouter>
      <CommandPalette>
        <Switch>
          <MainLayout>
            <Route exact path={'/'} component={HomePage} />
            <Route path={'/features/:id'} component={FeaturePage} />
          </MainLayout>
        </Switch>
      </CommandPalette>
    </HashRouter>
  )
}

export default Router
