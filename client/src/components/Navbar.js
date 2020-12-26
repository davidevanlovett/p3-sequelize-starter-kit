import { Link } from 'react-router-dom';
import useAuth from '../hooks/auth';

const styles = {
    ul: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: '#333'
    },
    li: {
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        padding: '14px 16px',
        textDecoration: 'none'
    },
    link:{
        color: 'white',
    }
};


const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    return (
        <div>
            <ul style={styles.ul}>
                <li style={styles.li}><Link style={styles.link} to="/">Home</Link></li>
                {isLoggedIn() ?
                    <>
                        <li style={styles.li}><Link style={styles.link} onClick={() => logout()} to='/'>Logout</Link></li>
                        <li style={styles.li}><Link style={styles.link} to='/posts'>Posts</Link></li>
                    </>
                    :
                    <>
                        <li style={styles.li}><Link style={styles.link} to="/signup">Signup</Link></li>
                        <li style={styles.li}><Link style={styles.link} to="/login">Login</Link></li>
                    </>
                }
            </ul>
        </div>
    );
};

export default Navbar;