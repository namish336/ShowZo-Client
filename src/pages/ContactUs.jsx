import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send to API)
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[#C0C9DB] text-gray-900 pt-32 px-6 md:px-16 lg:px-36 pb-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900">Contact Us</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 border border-white/40 shadow-sm h-fit">
                        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                        <div className="space-y-6 text-gray-800 font-medium">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">📍</span>
                                <p>123 Cinema Street, Movie City, MC 40001, India</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">📞</span>
                                <p>+91 9015353043</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">📧</span>
                                <p>showzo@gmail.com</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center hover:bg-white transition-colors">Twitter</a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center hover:bg-white transition-colors">Insta</a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center hover:bg-white transition-colors">FB</a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 border border-white/40 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm text-gray-800 font-bold mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/60 border border-white/50 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-primary placeholder-gray-500 font-medium shadow-inner transition-colors"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm text-gray-800 font-bold mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/60 border border-white/50 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-primary placeholder-gray-500 font-medium shadow-inner transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm text-gray-800 font-bold mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/60 border border-white/50 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-primary placeholder-gray-500 font-medium shadow-inner transition-colors"
                                    placeholder="How can we help?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white font-bold py-3 pt-3.5 rounded-lg hover:bg-primary-dull transition-colors shadow-md"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
