import { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../hooks/auth';

const Signup = () => {
    const { signup, isLoggedIn } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToLogin, toggleRedirect] = useState(false);
    const { from } = location.state || { from: { pathname: '/' } };

    const handleSubmit = event => {
        event.preventDefault();
        signup(email, password).then(res => {
            history.replace(from);
        });
    };

    if (isLoggedIn()) {
        return <Redirect to={location.state || '/'} />;
    }

    if (redirectToLogin) {
        return <Redirect to={{
            pathname: '/login',
            state: { from: from }
        }}
        />;
    }

    return (
        <div>
            <h2>
                Signup Page
            </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <input
                    name='email'
                    placeholder='Email'
                    type='email'
                    autoComplete='username'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <br />
                <label htmlFor='password'>Password:</label>
                <input
                    name='password'
                    placeholder='Password'
                    type='password'
                    autoComplete='password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <br />
                <button type='submit'>Signup</button>
            </form>
            <p>
                Already have an account? <button onClick={() => toggleRedirect(true)}>Login Here</button>
            </p>

        </div>
    );
};

export default Signup;