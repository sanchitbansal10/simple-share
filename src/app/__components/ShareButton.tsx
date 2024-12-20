'use client';
import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';

export default function ShareButton() {
    const [showTooltip, setShowTooltip] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={copyToClipboard}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Share page"
            >
                <ShareIcon className="w-5 h-5 text-gray-600" />
            </button>
            
            {showTooltip && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-600 text-white text-sm rounded whitespace-nowrap">
                    Link copied!
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mt-1">
                        <div className="border-4 border-transparent border-b-gray-400"></div>
                    </div>
                </div>
            )}
        </div>
    );
} 