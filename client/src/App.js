import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import LandingPage from "./views/LandingPage";
import Singing from "./views/Onboarding/signing";
import SignUp from "./views/Onboarding/SignUp";
import ForgotPassword from "./views/Onboarding/ForgotPassword";
import SignInWithoutPassword from "./views/Onboarding/SignInWithoutPassword";
import NoMatch from "./views/NoMatch";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/singing">
            <Singing />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/magiclogin" exact>
            <SignInWithoutPassword />
          </Route>
          <Route path="/">
            <Main />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
