import React from 'react';
import { CheckCircleIcon } from './icons';

export default function Toast({ message }) {
    if (!message) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 rounded-xl border border-green-600 bg-white px-5 py-3.5 text-[0.85rem] text-ink shadow-[0_8px_30px_rgba(22,163,74,0.20)]">
            <CheckCircleIcon />
            <span>{message}</span>
        </div>
    );
}
