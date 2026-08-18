import React from 'react';
import { EyeIcon, EyeOffIcon } from './icons';

export default function FormField({
                                      id,
                                      name,
                                      label,
                                      icon,
                                      type = 'text',
                                      placeholder,
                                      value,
                                      onChange,
                                      required = true,
                                      showPasswordToggle = false,
                                      showPassword,
                                      onTogglePassword,
                                  }) {
    return (
        <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor={id} className="text-left text-[0.78rem] font-semibold text-ink">
                {label}
            </label>
            <div className="group relative flex items-center rounded-[10px] border border-green-200 bg-[#f8fcf9] transition-all focus-within:border-green-600 focus-within:bg-white focus-within:shadow-[0_0_14px_rgba(22,163,74,0.16)]">
        <span className="pointer-events-none absolute left-3.5 flex items-center text-slate-500 group-focus-within:text-green-600">
          {icon}
        </span>
                <input
                    id={id}
                    name={name}
                    type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-[10px] bg-transparent py-3 pl-[42px] pr-3.5 text-[0.88rem] text-ink outline-none placeholder:text-[#94a3a8]"
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 flex items-center p-1 text-slate-500 hover:text-green-600"
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                )}
            </div>
        </div>
    );
}
