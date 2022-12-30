import {
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import FeaturePage from "./pages/Feature";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <MainLayout>
          <Route exact path={"/"} component={HomePage} />
          <Route path={"/features/:id"} component={FeaturePage} />
        </MainLayout>
      </Switch>
    </HashRouter>
  )
}

export default Router
