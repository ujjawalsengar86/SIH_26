import React from 'react';
import { ArrowLeftIcon } from './icons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function FormPanel({
                                      isLogin,
                                      onToggle,
                                      formData,
                                      onChange,
                                      onSubmit,
                                      showPassword,
                                      onTogglePassword,
                                  }) {
    return (
        <section
            className={`relative z-[1] flex min-h-[640px] w-1/2 flex-col justify-center bg-white px-12 py-10
        transition-transform duration-[750ms] ease-auth-slide will-change-transform
        max-[980px]:relative max-[980px]:w-full max-[980px]:min-h-0 max-[980px]:translate-x-0 max-[980px]:px-6 max-[980px]:py-8
        ${isLogin ? '-translate-x-full' : 'translate-x-0'}`}
        >
            <div className="mx-0 w-full max-w-[440px] animate-fade-in-content text-left">
                <button
                    type="button"
                    onClick={onToggle}
                    className="mb-4 inline-flex items-center gap-1.5 border-none bg-transparent p-0 text-[0.78rem] text-slate-500 transition-colors hover:text-green-700"
                >
                    <ArrowLeftIcon />
                    <span>Back to Home Page</span>
                </button>

                <div className="mb-2.5 text-left">
          <span className="inline-block rounded-md border border-green-200 bg-green-50 px-2.5 py-[3px] text-[0.65rem] font-bold tracking-widest text-green-700">
            {isLogin ? 'WORKSPACE LOGIN' : 'WORKSPACE REGISTRATION'}
          </span>
                </div>

                <h1 className="mb-1.5 text-left text-[1.85rem] font-extrabold tracking-tight text-ink">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>

                <p className="mb-[22px] text-left text-[0.82rem] leading-relaxed text-slate-500">
                    {isLogin
                        ? 'Sign in to access your secure real-time workspace and operational insights'
                        : 'Register to access your secure real-time workspace and operational insights'}
                </p>

                <form className="flex flex-col gap-3.5" onSubmit={onSubmit}>
                    {isLogin ? (
                        <LoginForm
                            formData={formData}
                            onChange={onChange}
                            showPassword={showPassword}
                            onTogglePassword={onTogglePassword}
                        />
                    ) : (
                        <RegisterForm
                            formData={formData}
                            onChange={onChange}
                            showPassword={showPassword}
                            onTogglePassword={onTogglePassword}
                        />
                    )}
                </form>
            </div>
        </section>
    );
}
