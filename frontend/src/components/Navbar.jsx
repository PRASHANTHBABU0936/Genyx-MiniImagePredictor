import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <Sparkles size={24} color="#818cf8" />
                MiniPredict
            </Link>

            <div className="navbar-nav">
                {user ? (
                    <>
                        <Link to="/upload" className="nav-link">Predict</Link>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <button onClick={onLogout} className="btn-logout">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
