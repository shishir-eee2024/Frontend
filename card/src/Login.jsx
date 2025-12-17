import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // For demo purposes - in real app, you would make an API call
        if (email === 'demo@example.com' && password === 'password') {
            alert('Login successful!');
            navigate('/'); // Redirect to home
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login to Your Account</h2>
                <p className="auth-subtitle">Welcome back! Please enter your details.</p>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="auth-button">Login</button>
                    
                    <div className="auth-links">
                        <p>
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                        <p>
                            <Link to="/forgot-password">Forgot password?</Link>
                        </p>
                    </div>
                </form>
          
               
            </div>
        </div>
    );
}

export default Login;