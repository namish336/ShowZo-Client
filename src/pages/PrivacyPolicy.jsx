import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-20 px-6 md:px-16 lg:px-36">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Privacy Policy</h1>

                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-xl space-y-8 text-gray-300 leading-relaxed">
                    <p className="text-sm text-gray-500">Last Updated: February 2026</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                        <p>
                            Welcome to ShowZo. We value your privacy and are committed to protecting your personal information.
                            This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                            <li><span className="text-white">Personal Information:</span> Name, email address, phone number, and payment details when you book tickets.</li>
                            <li><span className="text-white">Usage Data:</span> Information about how you use our website, including IP address, browser type, and pages visited.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                            <li>Process your ticket bookings and payments.</li>
                            <li>Send you booking confirmations and updates.</li>
                            <li>Improve our website and user experience.</li>
                            <li>Comply with legal obligations.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                            However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <span className="text-purple-400">support@showzo.com</span>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
