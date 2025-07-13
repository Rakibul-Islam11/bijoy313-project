import React from 'react';

const TinyCardMenu = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4 py-2  md:p-4">
            {/* সেবা নিন Button */}
            <a href="#" className="w-full sm:w-auto">
                <button className="
                    relative inline-flex items-center justify-center 
                    p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium  
                    text-gray-900 rounded-lg group bg-gradient-to-br 
                    from-purple-600 to-blue-500 group-hover:from-purple-600 
                    group-hover:to-blue-500 hover:text-white dark:text-white 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
                    w-full sm:w-64 md:w-72 lg:w-80 h-16
                    // Add the custom animation class
                    animated-border button-purple-blue
                ">
                    <span className="
                        relative px-6 py-3 transition-all ease-in duration-75 
                        bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0
                        w-full h-full flex items-center justify-center gap-2 
                    ">
                        {/* Service Icon (e.g., Hand holding heart or wrench) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        সেবা নিন
                    </span>
                </button>
            </a>

            {/* সেভা দিন Button */}
            <a href="#" className="w-full sm:w-auto">
                <button className="
                    relative inline-flex items-center justify-center 
                    // p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium 
                    text-gray-900 rounded-lg group bg-gradient-to-br 
                    from-green-400 to-blue-600 group-hover:from-green-400 
                    group-hover:to-blue-600 hover:text-white dark:text-white 
                    focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800
                    w-full sm:w-64 md:w-72 lg:w-80 h-16
                    // Add the custom animation class
                    animated-border button-green-blue
                ">
                    <span className="
                        relative px-6 py-3 transition-all ease-in duration-75 
                        bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0
                        w-full h-full flex items-center justify-center gap-2 
                    ">
                        {/* Provide Service Icon (e.g., Plus sign or user plus) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        সেব দিন
                    </span>
                </button>
            </a>

            {/* বাই-সেল Button */}
            <a href="#" className="w-full sm:w-auto">
                <button className="
                    relative inline-flex items-center justify-center 
                    // p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium 
                    text-gray-900 rounded-lg group bg-gradient-to-br 
                    from-red-500 to-orange-400 group-hover:from-red-500 
                    group-hover:to-orange-400 hover:text-white dark:text-white 
                    focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800
                    w-full sm:w-64 md:w-72 lg:w-80 h-16
                    // Add the custom animation class
                    animated-border button-red-orange
                ">
                    <span className="
                        relative px-6 py-3 transition-all ease-in duration-75 
                        bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0
                        w-full h-full flex items-center justify-center gap-2 
                    ">
                        {/* Buy-Sell Icon (e.g., Shopping cart or arrows) */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.47A.75.75 0 0 0 7.5 7.5H18a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.962-9.742.75.75 0 0 0-.232-.775L19.5 5.143M12.75 16.5H9.75m3 0a1.5 1.5 0 0 1-3 0m3 0h3v4.5m-1.5 0a1.5 1.5 0 0 1-3 0M3.75 21a1.5 1.5 0 0 1-3 0V7.5h.75m0 0 1.5 1.5M12.75 16.5H9.75m3 0a1.5 1.5 0 0 1-3 0m3 0h3v4.5m-1.5 0a1.5 1.5 0 0 1-3 0" />
                        </svg>
                        বাই-সেল
                    </span>
                </button>
            </a>
        </div>
    );
};

export default TinyCardMenu;