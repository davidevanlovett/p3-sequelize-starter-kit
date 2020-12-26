import createPersistedState from 'use-persisted-state';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const tokenState = createPersistedState('token');
const userState = createPersistedState('user');

const useAuth = () => {
    const [token, setToken] = tokenState({});
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

    const logout = () => {
        axios.defaults.headers.common.Authorization = null;
        setToken({});
        setUser({});
        window.location.reload('/');
    };

    const isTokenExpired = () => {
        try {
            const decoded = jwtDecode(token);
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
        return !!token && !isTokenExpired(token);
    };


    return {
        login,
        logout,
        user,
        getProfile,
        isLoggedIn
    };
};

export default useAuth;