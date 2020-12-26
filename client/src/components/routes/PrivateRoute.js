import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/auth';

function PrivateRoute(props){
    const {isLoggedIn} = useAuth();
    if(isLoggedIn()){
        return <Route {...props}/>;
    }
    else{
        return <Redirect to="/login" />;
    }
}

export default PrivateRoute;