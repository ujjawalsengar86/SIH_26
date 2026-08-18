import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ShowcasePanel from '../components/ShowcasePanel';
import FormPanel from '../components/FormPanel';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';

const INITIAL_FORM = {
    username: '',
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
};

export default function AuthPage({ defaultMode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { login, register, isAuthenticated } = useAuth();

    // If defaultMode is provided ('login' or 'signup'), use it; otherwise check path
    const isLoginPath = defaultMode 
        ? defaultMode === 'login' 
        : location.pathname === '/login';

    const [isLogin, setIsLogin] = useState(isLoginPath);
    const [showPassword, setShowPassword] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM);

    // Sync path with mode
    useEffect(() => {
        if (location.pathname === '/login') {
            setIsLogin(true);
        } else if (location.pathname === '/signup') {
            setIsLogin(false);
        }
        setErrorMessage(null);
    }, [location.pathname]);

    // If already authenticated, redirect to dashboard
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errorMessage) setErrorMessage(null);
    };

    const toggleMode = () => {
        const nextMode = !isLogin;
        setIsLogin(nextMode);
        setErrorMessage(null);
        navigate(nextMode ? '/login' : '/signup', { replace: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        if (isLogin) {
            // LOGIN FLOW
            if (!formData.email || !formData.password) {
                setErrorMessage('Please enter both email and password.');
                return;
            }

            setIsLoading(true);
            try {
                const res = await login({
                    email: formData.email,
                    password: formData.password,
                });

                setToastMessage(res?.message || 'Login successful!');
                const destination = location.state?.from?.pathname || '/dashboard';
                setTimeout(() => {
                    navigate(destination, { replace: true });
                }, 500);
            } catch (err) {
                setErrorMessage(err.message || 'Login failed. Please check your credentials.');
            } finally {
                setIsLoading(false);
            }
        } else {
            // SIGNUP FLOW
            if (!formData.name?.trim()) {
                setErrorMessage('Please enter your full name.');
                return;
            }
            if (!formData.email?.trim()) {
                setErrorMessage('Please enter your email address.');
                return;
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(formData.email.trim())) {
                setErrorMessage('Please enter a valid email address.');
                return;
            }
            if (!formData.password || formData.password.length < 8) {
                setErrorMessage('Password must be at least 8 characters long.');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setErrorMessage('Passwords do not match.');
                return;
            }

            setIsLoading(true);
            try {
                const res = await register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                setToastMessage(res?.message || 'Registration successful! Please log in.');
                
                // Clear password, keep email, navigate to login
                setFormData((prev) => ({
                    ...prev,
                    password: '',
                    confirmPassword: '',
                }));

                setTimeout(() => {
                    setIsLogin(true);
                    navigate('/login', { replace: true });
                }, 1000);
            } catch (err) {
                setErrorMessage(err.message || 'Registration failed. Email might already be in use.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div
            className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden px-7 pb-12 pt-6
        bg-[radial-gradient(circle_at_10%_30%,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(22,163,74,0.10),transparent_30%),linear-gradient(135deg,#f4fbf6_0%,#ffffff_52%,#eaf8ef_100%)]"
        >
            {/* Ambient dynamic glowing orbs */}
            <div className="pointer-events-none absolute left-[20%] top-[15%] z-0 h-[550px] w-[550px] animate-pulse-orb rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.16)_0%,rgba(22,163,74,0.08)_40%,transparent_70%)] blur-[80px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[18%] z-0 h-[480px] w-[480px] animate-pulse-orb-reverse rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,rgba(22,163,74,0.06)_45%,transparent_70%)] blur-[90px]" />

            <Header 
                onLoginClick={() => {
                    setIsLogin(true);
                    navigate('/login');
                }} 
                onSignupClick={() => {
                    setIsLogin(false);
                    navigate('/signup');
                }} 
            />

            <main className="relative z-10 flex min-h-[640px] w-full max-w-[1100px] overflow-hidden rounded-3xl border border-green-700/20 bg-white shadow-[0_20px_60px_rgba(22,101,52,0.16)] max-[980px]:min-h-0 max-[980px]:flex-col">
                <ShowcasePanel isLogin={isLogin} onToggle={toggleMode} />
                <FormPanel
                    isLogin={isLogin}
                    onToggle={toggleMode}
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword((prev) => !prev)}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                />
            </main>

            <Toast message={toastMessage} />
        </div>
    );
}
