import React from 'react';


const AboutUs = () => {
    return (
        <div className="min-h-screen bg-black text-white pt-20 px-6 md:px-16 lg:px-36">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">About ShowZo</h1>

                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-xl mb-12">
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        Welcome to <span className="font-semibold text-purple-400">ShowZo</span>, your ultimate destination for seamless movie booking experiences.
                        We are passionate about bringing the magic of cinema closer to you by providing a user-friendly platform
                        to discover movies, check showtimes, and book tickets with ease.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Founded in 2024, ShowZo caters to movie enthusiasts who value convenience and speed.
                        Whether you're looking for the latest blockbusters or indie gems, we've got you covered with
                        comprehensive listings from top theaters in your city.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-2xl">
                            🚀
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Fast Booking</h3>
                        <p className="text-gray-400">Book your tickets in seconds with our optimized and secure checkout process.</p>
                    </div>
                    <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700 hover:border-pink-500/50 transition-colors">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 text-2xl">
                            🎟️
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Real-time Availability</h3>
                        <p className="text-gray-400">Get up-to-the-minute updates on seat availability and showtimes.</p>
                    </div>
                    <div className="bg-gray-800/40 p-6 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-2xl">
                            📱
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Mobile Friendly</h3>
                        <p className="text-gray-400">Enjoy a seamless experience across all your devices, anywhere, anytime.</p>
                    </div>
                </div>

                <div className="text-center border-t border-gray-800 pt-12">
                    <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto italic">
                        "To connect people with stories that matter, creating unforgettable cinematic moments through technology and innovation."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
