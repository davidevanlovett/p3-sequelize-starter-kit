import createPersistedState from 'use-persisted-state';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const tokenState = createPersistedState('token');
const userState = createPersistedState('user');

const useAuth = () => {
    const [token, setToken] = tokenState('');
    const [user, setUser] = userState({});

    const login = async (email, password) => {
        return axios.post('api/auth/login',
            { email: email, password: password })
            .then(res => {
                setToken(res.data.token);
                setUser(res.data.user);
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                return res;
            });
    };

    const signup = async (email, password) => {
        return axios.post('api/auth/signup',
            { email: email, password: password })
            .then(res => {
                setToken(res.data.token);
                setUser(res.data.user);
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                return res;
            });
    };

    const logout = () => {
        axios.defaults.headers.common.Authorization = null;
        setToken('');
        setUser({});
        // Clean out state
        window.location.reload('/');
    };

    const isTokenExpired = () => {
        try {
            console.log(token);
            const decoded = jwtDecode(token);
            console.log(decoded);
            console.log(new Date(decoded.exp * 1000),new Date(decoded.iat * 1000));
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else { 
                return false; 
            }
        }
        catch (err) {
            return false;
        }
    };

    const getProfile = () => {
        return jwtDecode(token);
    };

    const isLoggedIn = () => {
        console.log(token, isTokenExpired());
        return token !== undefined && token !== '' && !isTokenExpired();
    };


    return {
        login,
        logout,
        user,
        getProfile,
        isLoggedIn,
        signup
    };
};

export default useAuth;