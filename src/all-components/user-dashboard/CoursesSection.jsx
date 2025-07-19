const CoursesSection = ({ userData }) => {
    // earnings এর সকল কোড এখানে পেস্ট করুন
    return (
        <div className="space-y-6 text-black">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-[#c5064f]">📚 My Courses</h2>
                <p className="text-gray-600">Continue learning and upgrade your skills</p>
            </div>

            {/* Courses Section */}
            <div className="bg-white p-5 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Your Courses</h3>
                    <button className="text-[#c5064f] text-sm font-medium">Browse All Courses</button>
                </div>

                {purchasedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {purchasedCourses.map((course, i) => (
                            <div key={i} className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                                    <FaBookOpen className="h-12 w-12 text-gray-400" />
                                </div>
                                <h4 className="font-semibold">{course}</h4>
                                <p className="text-sm text-gray-600 mb-2">Course description here</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">In Progress</span>
                                    <span className="text-sm text-gray-500">5h 15m</span>
                                </div>
                                <button className="mt-3 w-full py-2 bg-[#c5064f] text-white rounded hover:bg-[#a30544] transition">
                                    Continue Learning
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <FaBookOpen className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No courses purchased yet</h3>
                        <p className="mt-1 text-gray-500">Browse our courses to upgrade your skills</p>
                        <button className="mt-4 px-4 py-2 bg-[#c5064f] text-white rounded hover:bg-[#a30544] transition">
                            Explore Courses
                        </button>
                    </div>
                )}
            </div>

            {/* Recommended Courses */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="font-bold text-lg mb-4">Recommended For You</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold">Advanced React Techniques</h4>
                        <p className="text-sm text-gray-600 mb-2">Master modern React patterns</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Premium</span>
                            <span className="text-sm text-gray-500">8h 42m</span>
                        </div>
                    </div>
                    <div className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h4 className="font-semibold">Freelance Business Mastery</h4>
                        <p className="text-sm text-gray-600 mb-2">Grow your freelance career</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Free</span>
                            <span className="text-sm text-gray-500">5h 15m</span>
                        </div>
                    </div>
                    <div className="border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="bg-gray-100 h-40 rounded-lg mb-3 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h4 className="font-semibold">Client Management 101</h4>
                        <p className="text-sm text-gray-600 mb-2">Build lasting client relationships</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Premium</span>
                            <span className="text-sm text-gray-500">3h 28m</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursesSection;