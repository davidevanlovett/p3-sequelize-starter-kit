import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';
import axios from 'axios';
import useAuth from './hooks/auth';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Notes from './pages/Notes';


function App() {
    // Pull auth token from storage, in case you refresh the page
    const { getToken} = useAuth();
    axios.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/signup'>
                    <Signup />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <PrivateRoute exact path='/notes'>
                    <Notes />
                </PrivateRoute>
                {/* <PrivateRoute exact path='/notes/:id'>
                    <Posts />
                </PrivateRoute> */}
            </Switch>
        </Router>
    );
}

export default App;
