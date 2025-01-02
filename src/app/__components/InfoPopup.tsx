'use client';
import { useState, useRef, useEffect } from 'react';
import { IoInformationCircleOutline, IoClose } from 'react-icons/io5';

export default function InfoPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 0);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Handle escape key to close popup
    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, []);

    return (
        <div className="relative" ref={popupRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 rounded-full hover:bg-gray-100"
                aria-label="About this application"
                aria-expanded={isOpen}
                aria-haspopup="dialog"
            >
                <IoInformationCircleOutline className="w-6 h-6" />
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        role="dialog"
                        aria-label="About this application"
                        className="absolute right-0 mt-0 w-80 bg-white rounded-lg shadow-xl p-6 z-50 border border-gray-200"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-1 right-3 m-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Close popup"
                        >
                            <IoClose className="w-5 h-5" />
                        </button>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Want to jot down something quickly and share it with others? This is the app for those temporary notes.
                            </p>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Rich text editing</li>
                                    <li>Real-time saving</li>
                                    <li>Shareable notes</li>
                                    <li>No login required</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">How to use:</h4>
                                <p>
                                    Start typing to create your note. Changes are saved automatically. 
                                    Share the URL to let others view your note.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
} 