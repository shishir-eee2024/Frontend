
import { Link } from "react-router-dom";
import { useAuth } from './AuthContext.jsx'; // Add this import
import './Navigation.css';

function Navigation() {
    const { user, logout, isAuthenticated } = useAuth(); // Get auth state

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Left side - Logo with icon */}
                <div className="nav-left">
                    <div className="nav-logo">
                        <Link to="/" className="logo-link">
                            <span className="logo-icon">🛒</span>
                            <span className="logo-text">BazarNepal</span>
                        </Link>
                    </div>
                </div>

                {/* Right side - Navigation menu */}
                <div className="nav-right">
                    <div className="nav-menu">
                        <Link to="/" className="nav-link">
                            <span className="nav-icon">🏠</span>
                            <span className="nav-text">Home</span>
                        </Link>
                        <Link to="/products" className="nav-link">
                            <span className="nav-icon">📦</span>
                            <span className="nav-text">Products</span>
                        </Link>
                        <Link to="/cart" className="nav-link">
                            <span className="nav-icon">🛍️</span>
                            <span className="nav-text">Cart</span>
                        </Link>
                        <Link to="/contact" className="nav-link">
                            <span className="nav-icon">📞</span>
                            <span className="nav-text">Contact</span>
                        </Link>
                        
                        {/* Conditional rendering based on auth state */}
                        {isAuthenticated ? (
                            <>
                                <div className="user-welcome">
                                    <span className="nav-icon">👤</span>
                                    <span className="nav-text">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
                                </div>
                                <button 
                                    onClick={logout} 
                                    className="nav-link logout-btn"
                                >
                                    <span className="nav-icon">🚪</span>
                                    <span className="nav-text">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">
                                    <span className="nav-icon">🔐</span>
                                    <span className="nav-text">Login</span>
                                </Link>
                                <Link to="/register" className="nav-link">
                                    <span className="nav-icon">📝</span>
                                    <span className="nav-text">Register</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
