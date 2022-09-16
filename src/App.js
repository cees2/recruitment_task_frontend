import Layout from "./components/layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Authentication from "./pages/Authentication";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Switch>
      <Layout>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/auth">
          <Authentication />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
