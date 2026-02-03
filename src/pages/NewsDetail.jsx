import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsItems } from '../data/newsData';
import { ArrowLeft } from 'lucide-react';

const NewsDetail = () => {
    const { id } = useParams();
    const newsItem = newsItems.find(item => item.id === parseInt(id));

    if (!newsItem) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">News Article Not Found</h2>
                    <Link to="/news" className="text-red-500 hover:underline">Back to News</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white pt-24 px-6 md:px-16 lg:px-36 pb-12">
            <Link to="/news" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to News
            </Link>

            <div className="max-w-4xl mx-auto">
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
                    <img
                        src={newsItem.image}
                        alt={newsItem.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                        <span className="bg-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                            {newsItem.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            {newsItem.title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center text-gray-400 text-sm mb-8 border-b border-gray-800 pb-4">
                    <span>Published on {newsItem.date}</span>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {newsItem.description}
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="text-gray-300 leading-relaxed text-lg mt-4">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>
                </div>

                {/* Related/More News Section could go here */}
            </div>
        </div>
    );
};

export default NewsDetail;
