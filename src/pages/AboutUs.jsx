import React from 'react';
import { assets } from '../assets/assets';


const AboutUs = () => {
    return (
        <div className="min-h-screen bg-[#C0C9DB] text-gray-900 pt-32 px-6 md:px-16 lg:px-36 pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900">About ShowZo</h1>

                <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 border border-white/40 shadow-sm mb-12">
                    <p className="text-lg text-gray-800 font-medium leading-relaxed mb-6">
                        Welcome to <span className="font-bold text-primary">ShowZo</span>, your ultimate destination for seamless movie booking experiences.
                        We are passionate about bringing the magic of cinema closer to you by providing a user-friendly platform
                        to discover movies, check showtimes, and book tickets with ease.
                    </p>
                    <p className="text-lg text-gray-800 font-medium leading-relaxed">
                        Founded in 2024, ShowZo caters to movie enthusiasts who value convenience and speed.
                        Whether you're looking for the latest blockbusters or indie gems, we've got you covered with
                        comprehensive listings from top theaters in your city.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white/50 p-6 rounded-2xl border border-white/40 hover:border-white shadow-sm transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                            🚀
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Fast Booking</h3>
                        <p className="text-gray-700 font-medium">Book your tickets in seconds with our optimized and secure checkout process.</p>
                    </div>
                    <div className="bg-white/50 p-6 rounded-2xl border border-white/40 hover:border-white shadow-sm transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                            🎟️
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Real-time Availability</h3>
                        <p className="text-gray-700 font-medium">Get up-to-the-minute updates on seat availability and showtimes.</p>
                    </div>
                    <div className="bg-white/50 p-6 rounded-2xl border border-white/40 hover:border-white shadow-sm transition-colors">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-2xl shadow-sm">
                            📱
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">Mobile Friendly</h3>
                        <p className="text-gray-700 font-medium">Enjoy a seamless experience across all your devices, anywhere, anytime.</p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Namish Sharma", role: "Lead Developer", img: assets.member1 },
                            { name: "Akhil Sharma", role: "Backend Architect", img: assets.member2 },
                            { name: "Shivang Dhatwalia", role: "Frontend Developer", img: assets.member3 }
                        ].map((member, i) => (
                            <div key={i} className="group bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-white/40 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                                    <p className="text-sm font-semibold text-primary uppercase tracking-wider">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Guide Section */}
                <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 border border-white/60 shadow-inner mb-20 text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">
                        Under the Guidance of
                    </span>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 mb-4">
                            <img
                                src={assets.guide}
                                alt="Project Guide"
                                className="w-full h-full object-cover rounded-2xl border-2 border-white shadow-md transition-all duration-500"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 italic">Professor Priyanka</h3>
                        <p className="text-gray-600 font-medium">Assistant Professor, Department of BCA/PGDCA</p>
                    </div>
                </div>

                <div className="text-center border-t border-white/50 pt-12">
                    <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                    <p className="text-gray-800 font-medium max-w-2xl mx-auto italic">
                        "To connect people with stories that matter, creating unforgettable cinematic moments through technology and innovation."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
