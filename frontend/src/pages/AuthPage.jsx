import React, { useState } from 'react';
import Header from '../components/Header';
import ShowcasePanel from '../components/ShowcasePanel';
import FormPanel from '../components/FormPanel';
import Toast from '../components/Toast';

const INITIAL_FORM = {
    username: '',
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
};

export default function AuthPage() {
    // isLogin = false: Register is on the RIGHT, Showcase on the LEFT
    // isLogin = true: Login slides to the LEFT, Showcase slides to the RIGHT
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [formData, setFormData] = useState(INITIAL_FORM);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = isLogin ? 'Signed in successfully' : 'Account registered successfully';
        const identifier = formData.username || formData.email || 'User';
        setToastMessage(`${action} for ${identifier}!`);
        setTimeout(() => setToastMessage(null), 4000);
    };

    const toggleMode = () => setIsLogin((prev) => !prev);

    return (
        <div
            className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden px-7 pb-12 pt-6
        bg-[radial-gradient(circle_at_10%_30%,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(22,163,74,0.10),transparent_30%),linear-gradient(135deg,#f4fbf6_0%,#ffffff_52%,#eaf8ef_100%)]"
        >
            {/* Ambient dynamic glowing orbs */}
            <div className="pointer-events-none absolute left-[20%] top-[15%] z-0 h-[550px] w-[550px] animate-pulse-orb rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.16)_0%,rgba(22,163,74,0.08)_40%,transparent_70%)] blur-[80px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[18%] z-0 h-[480px] w-[480px] animate-pulse-orb-reverse rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,rgba(22,163,74,0.06)_45%,transparent_70%)] blur-[90px]" />

            <Header onLoginClick={() => setIsLogin(true)} onSignupClick={() => setIsLogin(false)} />

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
                />
            </main>

            <Toast message={toastMessage} />
        </div>
    );
}
