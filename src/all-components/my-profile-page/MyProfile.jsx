import { useContext, useEffect, useState } from 'react';
import { authContext } from '../auth-porvider-context/AuthContext';
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState('basic');
    const [profileCompletePercent, setProfileCompletePercent] = useState(75);
    const [userProfile, setUserProfile] = useState(null);
    const { user, loading } = useContext(authContext);

    const fetchUserData = async () => {
        if (user) {
            try {
                const response = await fetch(`https://bijoy-server-nu.vercel.app/users/by-uid/${user.uid}`);
                const data = await response.json();
                if (data.success) {
                    setUserProfile(data.user);
                    // Calculate profile completion percentage based on filled fields
                    calculateCompletion(data.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    const calculateCompletion = (profile) => {
        let filledFields = 0;
        const totalFields = 10; // Adjust based on your important fields

        if (profile.displayName) filledFields++;
        if (profile.email) filledFields++;
        if (profile.phone) filledFields++;
        if (profile.age) filledFields++;
        if (profile.gender) filledFields++;
        if (profile.profession) filledFields++;
        if (profile.photoURL) filledFields++;
        if (profile.address) filledFields += 2;
        if (profile.kyc?.documents?.length > 0) filledFields++;

        const percentage = Math.round((filledFields / totalFields) * 100);
        setProfileCompletePercent(percentage);
    };

    useEffect(() => {
        if (!loading) {
            fetchUserData();
            const interval = setInterval(() => {
                fetchUserData();
            }, 30000); // Reduced polling to every 30 seconds
            return () => clearInterval(interval);
        }
    }, [user, loading]);

    if (!userProfile) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
            </div>
        );
    }

    // Tab content components
    const renderTabContent = () => {
        switch (activeTab) {
            case 'basic':
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl md:mt-15">
                        <div className="flex flex-col space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                                <Link
                                    to="/edit-basic"
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoCard
                                    title="Email"
                                    value={userProfile.email}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    }
                                />

                                <InfoCard
                                    title="Phone"
                                    value={userProfile.phone || 'Not provided'}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    }
                                />

                                <InfoCard
                                    title="Member Type"
                                    value={userProfile.userType || 'Not specified'}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    }
                                />

                                <InfoCard
                                    title="Referral Code"
                                    value={userProfile.referralCode || 'Not available'}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    }
                                />

                                <VerificationBadge
                                    verified={userProfile.isOtpVerified}
                                    text="Phone Verification"
                                />

                                <VerificationBadge
                                    verified={userProfile.emailVerified}
                                    text="Email Verification"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 'personal':
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl md:mt-12">
                        <div className="flex flex-col space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                                <Link
                                    to="/name-cgange"
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoCard
                                    title="Full Name"
                                    value={userProfile.displayName || 'Not provided'}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    }
                                />

                                <InfoCard
                                    title="Date of Birth"
                                    value={userProfile.age || 'Not provided'}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                />

                                <InfoCard
                                    title="Gender"
                                    value={userProfile.gender || 'Not specified'}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                        </svg>
                                    }
                                />

                                <InfoCard
                                    title="Profession"
                                    value={userProfile.profession || 'Not specified'}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    }
                                />

                                {userProfile.photoURL && (
                                    <div className="md:col-span-2">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                            <h3 className="text-lg font-medium text-gray-700 mb-3">Profile Photo</h3>
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={userProfile.photoURL}
                                                    alt="Profile"
                                                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                                                />
                                                <div className="text-sm text-gray-600">
                                                    <p>Your profile picture is visible to other members</p>
                                                    <p className="text-xs text-gray-500 mt-1">Recommended size: 200x200 pixels</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 'documents':
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl md:mt-12">
                        <div className="flex flex-col space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Document Verification</h2>
                                <Link
                                    to="/nid"
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    {userProfile?.kyc?.documents ? 'Update' : 'Upload'}
                                </Link>
                            </div>

                            {userProfile?.kyc?.documents ? (
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-700 mb-4">NID Documents</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <DocumentPreview
                                                type="Front Side"
                                                documents={userProfile.kyc.documents.filter(doc => doc.type === "nid-front")}
                                            />
                                            <DocumentPreview
                                                type="Back Side"
                                                documents={userProfile.kyc.documents.filter(doc => doc.type === "nid-back")}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 pt-0.5">
                                                <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-blue-800">Verification Status</h3>
                                                <div className="mt-2 text-sm text-blue-700">
                                                    <p>
                                                        {userProfile.kyc.status === 'verified'
                                                            ? 'Your documents have been verified and approved.'
                                                            : userProfile.kyc.status === 'pending'
                                                                ? 'Your documents are under review. This process may take 1-2 business days.'
                                                                : 'Please upload clear photos of your NID for verification.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center">
                                    <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No documents uploaded</h3>
                                    <p className="mt-1 text-sm text-gray-600">Please upload your NID documents to complete your profile verification.</p>
                                    <div className="mt-6">
                                        <Link
                                            to="/nid"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            Upload Documents
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'address':
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl md:mt-12">
                        <div className="flex flex-col space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Address Information</h2>
                                <Link
                                    to="/addrss"
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit
                                </Link>
                            </div>

                            {userProfile.address ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InfoCard
                                        title="Division"
                                        value={userProfile.address.division}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        }
                                    />

                                    <InfoCard
                                        title="District"
                                        value={userProfile.address.district}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        }
                                    />

                                    <InfoCard
                                        title="Area"
                                        value={userProfile.address.area}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                            </svg>
                                        }
                                    />

                                    <InfoCard
                                        title="Postal Code"
                                        value={userProfile.address.postalCode}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        }
                                    />

                                    <div className="md:col-span-2">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                            <h3 className="text-lg font-medium text-gray-700 mb-2">Full Address</h3>
                                            <p className="text-gray-800">{userProfile.address.addressLine}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center">
                                    <svg className="mx-auto h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No address information</h3>
                                    <p className="mt-1 text-sm text-gray-600">Please add your address details to complete your profile.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'additional':
                return (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl md:mt-13">
                        <div className="flex flex-col space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Additional Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InfoCard
                                    title="User ID"
                                    value={userProfile.firebaseUID}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                        </svg>
                                    }
                                    isCode
                                />

                                <InfoCard
                                    title="Account Created"
                                    value={new Date(userProfile.createdAt).toLocaleDateString()}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                />

                                <div className="md:col-span-2">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-700 mb-3">Account Security</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="ml-2 text-sm font-medium text-gray-700">Password</span>
                                                </div>
                                                <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                                    Change Password
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="ml-2 text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                                                </div>
                                                <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                                    Enable 2FA
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Helper components
    const InfoCard = ({ title, value, icon, isCode = false }) => (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-200">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                    {isCode ? (
                        <p className="mt-1 text-sm font-mono text-gray-900 break-all">{value}</p>
                    ) : (
                        <p className="mt-1 text-lg font-medium text-gray-900">{value}</p>
                    )}
                </div>
            </div>
        </div>
    );

    const VerificationBadge = ({ verified, text }) => (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    {verified ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    )}
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">{text}</h3>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                        {verified ? 'Verified' : 'Not Verified'}
                    </p>
                    {!verified && (
                        <p className="mt-1 text-xs text-gray-500">
                            {text.includes('Email') ? 'Check your email for verification link' : 'Verify now for full access'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

    const DocumentPreview = ({ type, documents }) => (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-sm font-medium text-gray-700 mb-3">{type}</h4>
            {documents.length > 0 ? (
                <div className="space-y-2">
                    {documents.map((doc, index) => (
                        <div key={index} className="group relative">
                            <img
                                src={doc.url}
                                alt={type}
                                className="w-full h-auto rounded border border-gray-200 shadow-sm transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded flex items-center justify-center">
                                <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 p-2 rounded-full shadow-md"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-100 p-8 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No {type.toLowerCase()} uploaded</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Sidebar */}
            <div className="w-full md:w-80 bg-white shadow-xl md:min-h-screen p-6">
                <div className="sticky top-0 z-10 bg-white pb-6">
                    <div className="flex flex-col items-center mb-8 mt-16">
                        <div className="relative mb-4 group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                            <div className="relative">
                                <img
                                    src={userProfile.photoURL || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transform transition duration-500 hover:scale-105"
                                />
                                {userProfile.isVerifiedMember && (
                                    <div className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-1.5 rounded-full shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            {userProfile.displayName || 'No Name'}
                        </h1>
                        <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${userProfile.isVerifiedMember
                            ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                            : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
                            }`}>
                            {userProfile.isVerifiedMember ? 'Verified Member' : 'Unverified Member'}
                        </span>
                    </div>

                    <div className="mb-8 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 font-medium">Profile Completion</span>
                            <span className="font-bold text-blue-600">{profileCompletePercent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full shadow-md transition-all duration-500"
                                style={{ width: `${profileCompletePercent}%` }}
                            ></div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 text-center">
                            {profileCompletePercent < 50
                                ? 'Complete your profile to unlock all features'
                                : profileCompletePercent < 80
                                    ? 'Almost there! Complete a few more details'
                                    : 'Great job! Your profile looks complete'}
                        </p>
                    </div>
                </div>

                <nav className="overflow-y-auto max-h-[calc(100vh-300px)] pr-2">
                    <div className="space-y-2">
                        {[
                            { id: 'basic', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', label: 'Basic' },
                            { id: 'personal', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', label: 'Personal' },
                            { id: 'documents', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Documents' },
                            { id: 'address', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Address' },
                            { id: 'additional', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', label: 'Additional' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-inner border border-blue-100'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-gray-100'
                                    } flex items-center`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                                </svg>
                                {tab.label} Information
                            </button>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8">
                <div className="max-w-5xl mx-auto">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;