import { useState } from 'react';
import { FiBell, FiGlobe, FiLock, FiToggleLeft, FiToggleRight, FiCheck } from 'react-icons/fi';

const Setting = () => {
    // Notification states
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);

    // Language state
    const [language, setLanguage] = useState('en');
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'bn', name: 'বাংলা' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'ar', name: 'العربية' }
    ];

    // 2FA state
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

            {/* Notification Settings */}
            <div className="mb-8 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-4">
                    <FiBell className="text-blue-500 text-xl mr-3" />
                    <h2 className="text-lg font-semibold text-gray-700">Notification Settings</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-gray-800">Enable Notifications</h3>
                            <p className="text-sm text-gray-500">Receive all notifications</p>
                        </div>
                        <button
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-gray-800">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Get important updates via email</p>
                        </div>
                        <button
                            onClick={() => setEmailNotifications(!emailNotifications)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {emailNotifications ? <FiToggleRight className="text-blue-500 text-2xl" /> : <FiToggleLeft className="text-2xl" />}
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-gray-800">Push Notifications</h3>
                            <p className="text-sm text-gray-500">Receive instant notifications</p>
                        </div>
                        <button
                            onClick={() => setPushNotifications(!pushNotifications)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            {pushNotifications ? <FiToggleRight className="text-blue-500 text-2xl" /> : <FiToggleLeft className="text-2xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Language Settings */}
            <div className="mb-8 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-4">
                    <FiGlobe className="text-green-500 text-xl mr-3" />
                    <h2 className="text-lg font-semibold text-gray-700">Language Settings</h2>
                </div>

                <div className="space-y-3">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${language === lang.code ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50'}`}
                        >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${language === lang.code ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                                {language === lang.code && <FiCheck className="text-white text-xs" />}
                            </div>
                            <span className={`font-medium ${language === lang.code ? 'text-blue-600' : 'text-gray-700'}`}>{lang.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-4">
                    <FiLock className="text-purple-500 text-xl mr-3" />
                    <h2 className="text-lg font-semibold text-gray-700">Two-Factor Authentication</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-gray-800">Enable 2FA</h3>
                            <p className="text-sm text-gray-500">Extra layer of security for your account</p>
                        </div>
                        <button
                            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${twoFactorEnabled ? 'bg-purple-500' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {twoFactorEnabled && (
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2">1</span>
                                <span>Download an authenticator app (Google Authenticator, Authy, etc.)</span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                                <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2">2</span>
                                <span>Scan the QR code or enter this key: <span className="font-mono bg-gray-100 px-2 py-1 rounded">JBSWY3DPEHPK3PXP</span></span>
                            </div>

                            <div className="flex items-start text-sm text-gray-600">
                                <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2 mt-1">3</span>
                                <div>
                                    <p className="mb-2">Enter the 6-digit code from the app</p>
                                    <input
                                        type="text"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        placeholder="123456"
                                        className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    <button className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors text-sm">
                                        Verify & Activate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Setting;