import { Link } from 'react-router-dom';

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
    }
};


const Navbar = () => {
    return (
        <div>
            <ul style={styles.ul}>
                <li style={styles.li}><Link to="/">Home</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;