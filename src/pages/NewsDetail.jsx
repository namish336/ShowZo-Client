import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById } from '../services/api';
import { ArrowLeft } from 'lucide-react';
import Loading from '../components/Loading';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const data = await getNewsById(id);
                setNewsItem(data);
            } catch (error) {
                console.error("Error fetching news detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsDetail();
    }, [id]);

    if (loading) return <Loading />;

    if (!newsItem) {
        return (
            <div className="min-h-screen bg-[#C0C9DB] text-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">News Article Not Found</h2>
                    <Link to="/news" className="text-red-600 hover:underline font-medium">Back to News</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#C0C9DB] text-gray-900 pt-24 px-6 md:px-16 lg:px-36 pb-12">
            <Link to="/news" className="inline-flex items-center text-gray-700 hover:text-gray-900 font-medium mb-8 transition-colors">
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
                        <span className="bg-red-600 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                            {newsItem.category}
                        </span>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                            {newsItem.title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center text-gray-700 font-medium text-sm mb-8 border-b border-white/40 pb-4">
                    <span>Published on {newsItem.date}</span>
                </div>

                <div className="prose prose-lg max-w-none text-gray-800">
                    <p className="text-gray-800 font-semibold leading-relaxed text-lg mb-6">
                        {newsItem.description}
                    </p>
                    <div className="text-gray-700 font-medium leading-relaxed whitespace-pre-wrap">
                        {newsItem.content}
                    </div>
                </div>

                {/* Related/More News Section could go here */}
            </div>
        </div>
    );
};

export default NewsDetail;
