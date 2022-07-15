import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Main';
import LandingPage from './views/LandingPage';
import Signing from './views/Onboarding/signing';
import SignUp from './views/Onboarding/SignUp';
import ForgotPassword from './views/Onboarding/ForgotPassword';
import SignInWithoutPassword from './views/Onboarding/SignInWithoutPassword';
import NoMatch from './views/NoMatch';
import { PrivateRoute } from './components';

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<LandingPage />
					</Route>
					<Route exact path="/signing">
						<Signing />
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
					<PrivateRoute>
						<Route path="/board">
							<Main />
						</Route>
					</PrivateRoute>
					<Route path="*">
						<NoMatch />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
