import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Posts from './pages/Posts';
import PrivateRoute from './components/routes/PrivateRoute';
import './App.css';


function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                {/* <Route path="/about">
                  <About />
                </Route>
                <Route path="/users">
                  <Users />
                </Route> */}
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/posts">
                    <Posts />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;
