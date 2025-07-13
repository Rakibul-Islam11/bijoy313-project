import { useState } from 'react';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount] = useState(3); // ডেমো ডেটা, আপনি API থেকে রিয়েল ডেটা নিতে পারেন

    return (
        <div className="flex items-center ml-2 relative">
            {/* বেল আইকন বাটন */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full bg-black/30 backdrop-blur-md border border-pink-400/30 shadow-[0_0_15px_rgba(255,0,120,0.2)] hover:shadow-[0_0_20px_rgba(255,0,120,0.3)] transition-all duration-300 relative"
            >
                {/* বেল আইকন SVG */}
                <svg
                    className="w-4 h-4 text-pink-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>

                {/* আনরিড নোটিফিকেশন কাউন্টার */}
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* নোটিফিকেশন ড্রপডাউন */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#1a1a1a] rounded-xl shadow-2xl z-50 border border-pink-900/50 overflow-hidden">
                    {/* হেডার */}
                    <div className="px-4 py-3 border-b border-pink-900/30 flex justify-between items-center">
                        <h3 className="text-sm font-medium text-pink-200">Notifications ({unreadCount})</h3>
                        <button className="text-xs text-pink-400 hover:text-white">
                            Mark all as read
                        </button>
                    </div>

                    {/* নোটিফিকেশন আইটেমস */}
                    <div className="divide-y divide-pink-900/30 max-h-80 overflow-y-auto">
                        {/* আনরিড নোটিফিকেশন */}
                        <div className="px-4 py-3 hover:bg-pink-900/10 cursor-pointer bg-pink-900/5">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-pink-500/10 p-1.5 rounded-full">
                                    <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-white">নতুন মেসেজ</p>
                                    <p className="text-xs text-pink-300 mt-1">এডমিন থেকে আপনি একটি নতুন মেসেজ পেয়েছেন</p>
                                    <p className="text-xs text-pink-400 mt-1">২ মিনিট আগে</p>
                                </div>
                            </div>
                        </div>

                        {/* রিড নোটিফিকেশন */}
                        <div className="px-4 py-3 hover:bg-pink-900/10 cursor-pointer">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 bg-blue-500/10 p-1.5 rounded-full">
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-white/80">বোনাস পেয়েছেন</p>
                                    <p className="text-xs text-pink-300/80 mt-1">আপনার অ্যাকাউন্টে ৳৫০০ বোনাস যোগ করা হয়েছে</p>
                                    <p className="text-xs text-pink-400/80 mt-1">১ ঘন্টা আগে</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ফুটার */}
                    <div className="px-4 py-2 border-t border-pink-900/30 text-center">
                        <button className="text-xs font-medium text-pink-400 hover:text-white">
                            সব নোটিফিকেশন দেখুন
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;