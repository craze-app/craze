import {
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import MainLayout from "./layouts/MainLayout";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <MainLayout>
          <Route exact path={"/"} component={HomePage} />
          <Route path={"/settings"} component={SettingsPage} />
        </MainLayout>
      </Switch>
    </HashRouter>
  )
}

export default Router
