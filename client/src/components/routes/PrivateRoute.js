import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';

function PrivateRoute(props){
    if(isLoggedIn()){
        return <Route {...props}/>;
    }
    else{
        return <Redirect to="/signup" />;
    }
}

export default PrivateRoute;