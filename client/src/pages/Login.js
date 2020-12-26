import { Link, Redirect, useHistory } from 'react-router-dom';
import useInput from 'react-hanger/useInput';
import useAuth from '../hooks/auth';

const Login = () => {
    const { login, isLoggedIn } = useAuth();
    const history = useHistory();
    const email = useInput('');
    const password = useInput('');

    const handleSubmit = event => {
        event.preventDefault();
        login(email.value, password.value).then(res => {
            history.push('/');
        });
    };

    if (isLoggedIn()) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h2>
                Login Page
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                    name='email'
                    placeholder='Email'
                    type='email'
                    autoComplete='username'
                    {...email.eventBind}
                />
                <input
                    name='password'
                    placeholder='Password'
                    type='password'
                    autoComplete='password'
                    {...password.eventBind}
                />
                <button type='submit'>Login</button>
            </form>
            <p>
                Need an account? <Link to='/signup'>Signup Here</Link>
            </p>

        </div>
    );
};

export default Login;