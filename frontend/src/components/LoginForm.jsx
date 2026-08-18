import React from 'react';
import FormField from './FormField';
import { MailIcon, LockIcon, ArrowRightIcon } from './icons';

export default function LoginForm({
    formData,
    onChange,
    showPassword,
    onTogglePassword,
    isLoading = false,
    errorMessage = null,
}) {
    return (
        <>
            {errorMessage && (
                <div
                    id="login-error-alert"
                    className="mb-2 rounded-xl border border-red-200 bg-red-50 p-3 text-left text-xs font-medium text-red-700"
                >
                    <p className="flex items-center gap-1.5">
                        <span className="font-bold">Error:</span> {errorMessage}
                    </p>
                </div>
            )}

            <FormField
                id="login-email"
                name="email"
                label="Work / Personal Email"
                icon={<MailIcon />}
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={onChange}
                required
            />

            <FormField
                id="login-password"
                name="password"
                label="Password"
                icon={<LockIcon />}
                placeholder="••••••••"
                value={formData.password}
                onChange={onChange}
                showPasswordToggle
                showPassword={showPassword}
                onTogglePassword={onTogglePassword}
                required
            />

            <div className="mt-0.5 flex items-center justify-between text-[0.78rem]">
                <label className="flex cursor-pointer items-center gap-2 text-slate-500">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={onChange}
                        className="h-[15px] w-[15px] accent-green-600"
                    />
                    <span>Remember me</span>
                </label>

                <button
                    type="button"
                    onClick={() => alert('Please contact your LCA administrator to reset your credentials.')}
                    className="border-none bg-transparent p-0 text-[0.78rem] font-medium text-green-600 hover:underline"
                >
                    Forgot Password?
                </button>
            </div>

            <button
                type="submit"
                id="login-submit-btn"
                disabled={isLoading}
                className="mt-1.5 flex w-full items-center justify-center gap-2.5 rounded-xl border-none bg-gradient-to-r from-green-700 via-green-600 to-green-500 px-5 py-[13px] text-[0.92rem] font-bold text-white shadow-[0_6px_25px_rgba(22,163,74,0.30)] transition-all hover:-translate-y-0.5 hover:from-green-800 hover:via-green-700 hover:to-green-600 hover:shadow-[0_8px_30px_rgba(22,163,74,0.38)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
                {isLoading ? (
                    <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Logging in...</span>
                    </>
                ) : (
                    <>
                        <span>Login to Platform</span>
                        <ArrowRightIcon />
                    </>
                )}
            </button>
        </>
    );
}
