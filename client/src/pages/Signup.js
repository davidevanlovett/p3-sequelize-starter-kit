import { Link, Redirect, useHistory } from 'react-router-dom';
import useInput from 'react-hanger/useInput';
import useAuth from '../hooks/auth';

const Signup = () => {
    const {signup,isLoggedIn} = useAuth();
    const history = useHistory();
    const email = useInput('');
    const password = useInput('');

    const handleSubmit = event => {
        event.preventDefault();
        signup(email.value,password.value).then(res => {
            history.push('/');
        });
    };

    if (isLoggedIn()) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <h2>
                Signup Page
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
                <button type='submit'>Signup</button>
            </form>
            <p>
            Already have an account? <Link to='/login'>Login Here</Link>
            </p>
            
        </div>
    );
};

export default Signup;