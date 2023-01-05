import { HashRouter, Route, Switch } from 'react-router-dom'

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
    </HashRouter>
  )
}

export default Router
