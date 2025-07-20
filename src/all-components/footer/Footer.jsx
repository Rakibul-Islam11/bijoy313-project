import { useState } from 'react';
import navbrandLogo from '../../assets/navbrand-logo/Untitled design (1).png';
import {
    FaHome, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus,
    FaShareAlt, FaMoneyBillAlt, FaUsers, FaTruck, FaBriefcase,
    FaEnvelopeOpen, FaSearch, FaFacebook, FaTwitter, FaInstagram,
    FaLinkedin, FaYoutube, FaPhone, FaMapMarkerAlt, FaChevronDown
} from 'react-icons/fa';

const Footer = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-gray-800 text-gray-200 w-full mt-[50px]">
            <div className="w-full px-4 py-10 mx-auto max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Logo + Newsletter + Search */}
                    <div className="w-full lg:w-1/3">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={navbrandLogo} alt="Company Logo" className="w-12 h-12" />
                            <span className="text-white text-xl font-bold">bijoy313</span>
                        </div>

                        <p className="text-gray-400 mb-6">
                            Your company tagline or brief description goes here.
                        </p>

                        <div className="mb-6">
                            <h3 className="flex items-center gap-2 text-orange-500 text-lg font-medium mb-3">
                                <FaEnvelopeOpen /> Newsletter
                            </h3>
                            <div className="flex mb-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r flex items-center gap-2 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-gray-500 text-sm">
                                Stay updated with our latest offers
                            </p>
                        </div>

                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 pl-10"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Desktop Grid Menus */}
                    <div className="hidden lg:grid w-full lg:w-2/3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-orange-500 text-lg font-medium mb-4 pb-2 border-b border-orange-500/30">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="/" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaHome /> Home</a></li>
                                <li><a href="/about" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaInfoCircle /> About</a></li>
                                <li><a href="/contact" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaEnvelope /> Contact</a></li>
                                <li><a href="/sign-in" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaSignInAlt /> Login</a></li>
                                <li><a href="/pop-up-sign" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaUserPlus /> Register</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-orange-500 text-lg font-medium mb-4 pb-2 border-b border-orange-500/30">Our Programs</h3>
                            <ul className="space-y-2">
                                <li><a href="/dashboard?section=referrals" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaShareAlt /> Referral System</a></li>
                                <li><a href="/dashboard?section=earnings" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaMoneyBillAlt /> Income System</a></li>
                                <li><a href="/leadership" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaUsers /> Leadership Program</a></li>
                                <li><a href="/dropship" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaTruck /> Dropshipping</a></li>
                                <li><a href="/micro-job" className="flex items-center gap-2 text-gray-300 hover:text-orange-500"><FaBriefcase /> Microjobs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-orange-500 text-lg font-medium mb-4 pb-2 border-b border-orange-500/30">Contact Us</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2"><FaEnvelope className="mt-1 text-orange-500" /><a href="mailto:info@example.com" className="text-gray-300 hover:text-orange-500">info@example.com</a></li>
                                <li className="flex items-start gap-2"><FaPhone className="mt-1 text-orange-500" /><a href="tel:+8801234567890" className="text-gray-300 hover:text-orange-500">+880 1234 567890</a></li>
                                <li className="flex items-start gap-2"><FaMapMarkerAlt className="mt-1 text-orange-500" /><span className="text-gray-300">Company Address, City</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* Mobile Accordion Menus */}
                    <div className="flex flex-col gap-4 lg:hidden">
                        {[
                            {
                                key: 'quick', title: 'Quick Links', links: [
                                    { href: '/', icon: <FaHome />, label: 'Home' },
                                    { href: '/about', icon: <FaInfoCircle />, label: 'About' },
                                    { href: '/contact', icon: <FaEnvelope />, label: 'Contact' },
                                    { href: '/login', icon: <FaSignInAlt />, label: 'Login' },
                                    { href: '/register', icon: <FaUserPlus />, label: 'Register' },
                                ]
                            },
                            {
                                key: 'program', title: 'Our Programs', links: [
                                    { href: '/dashboard?section=referrals', icon: <FaShareAlt />, label: 'Referral System' },
                                    { href: '/dashboard?section=earnings', icon: <FaMoneyBillAlt />, label: 'Income System' },
                                    { href: '/leadership', icon: <FaUsers />, label: 'Leadership Program' },
                                    { href: '/dropship', icon: <FaTruck />, label: 'Dropshipping' },
                                    { href: '/micro-job', icon: <FaBriefcase />, label: 'Microjobs' },
                                ]
                            },
                            {
                                key: 'contact', title: 'Contact Us', links: [
                                    { href: 'mailto:info@example.com', icon: <FaEnvelope className="mt-1 text-orange-500" />, label: 'info@example.com' },
                                    { href: 'tel:+8801234567890', icon: <FaPhone className="mt-1 text-orange-500" />, label: '+880 1234 567890' },
                                    { href: '#', icon: <FaMapMarkerAlt className="mt-1 text-orange-500" />, label: 'Company Address, City' },
                                ]
                            },
                        ].map((section) => (
                            <div key={section.key} className="border border-gray-700 rounded">
                                <button
                                    onClick={() => toggleSection(section.key)}
                                    className="w-full flex justify-between items-center px-4 py-3 text-left text-orange-500 font-medium"
                                >
                                    {section.title}
                                    <FaChevronDown className={`transition-transform ${openSection === section.key ? 'rotate-180' : ''}`} />
                                </button>
                                {openSection === section.key && (
                                    <ul className="px-4 pb-3 space-y-2">
                                        {section.links.map((link, idx) => (
                                            <li key={idx}>
                                                <a href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-orange-500">
                                                    {link.icon} {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 w-full py-6 mb-[-18px]">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} bijoy313. All rights reserved.
                    </p>
                    <div className="flex gap-4 mb-[18px] md:mb-[0]">
                        <a href="#" className="text-gray-400 hover:text-orange-500 text-lg"><FaFacebook /></a>
                        <a href="#" className="text-gray-400 hover:text-orange-500 text-lg"><FaTwitter /></a>
                        <a href="#" className="text-gray-400 hover:text-orange-500 text-lg"><FaInstagram /></a>
                        <a href="#" className="text-gray-400 hover:text-orange-500 text-lg"><FaLinkedin /></a>
                        <a href="#" className="text-gray-400 hover:text-orange-500 text-lg"><FaYoutube /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;