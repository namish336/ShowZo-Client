import React from 'react';
import { Link } from 'react-router-dom';
import { newsItems } from '../data/newsData';

const News = () => {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white pt-24 px-6 md:px-16 lg:px-36 pb-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
                    Latest Movie News
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Stay updated with the latest happenings in the world of cinema, from box office hits to casting rumors.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsItems.map((item) => (
                    <div key={item.id} className="bg-[#242424] rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-800 group">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {item.category}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center text-gray-500 text-sm mb-3">
                                <span>{item.date}</span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-red-500 transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                {item.description}
                            </p>

                            <Link to={`/news/${item.id}`} className="text-red-500 font-semibold text-sm hover:underline flex items-center gap-1 group/btn">
                                Read More
                                <span className="transform transition-transform group-hover/btn:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
