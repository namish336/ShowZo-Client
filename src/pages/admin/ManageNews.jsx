import React, { useEffect, useState } from 'react';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { getNews, createNews, updateNews, deleteNews } from '../../services/api';
import { PlusIcon, EditIcon, Trash2Icon, CalendarIcon, TagIcon, ImageIcon, XIcon, SaveIcon } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const ManageNews = () => {
    const { getToken } = useAuth();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        category: 'Movies',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        content: ''
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await getNews();
            setNews(data);
        } catch (error) {
            console.error("Error fetching news:", error);
            toast.error("Failed to load news");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditId(item._id);
            setFormData({
                title: item.title,
                description: item.description,
                image: item.image,
                category: item.category,
                date: item.date,
                content: item.content || ''
            });
        } else {
            setEditId(null);
            setFormData({
                title: '',
                description: '',
                image: '',
                category: 'Movies',
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                content: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading(editId ? "Updating..." : "Creating...");
        try {
            const token = await getToken();
            if (editId) {
                await updateNews(editId, formData, token);
                toast.success("News updated");
            } else {
                await createNews(formData, token);
                toast.success("News created");
            }
            fetchNews();
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Operation failed");
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this news article?")) return;
        const loadingToast = toast.loading("Deleting...");
        try {
            const token = await getToken();
            await deleteNews(id, token);
            setNews(prev => prev.filter(item => item._id !== id));
            toast.success("News deleted");
        } catch (error) {
            toast.error("Delete failed");
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    return !loading ? (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Title text1="Manage" text2="News" />
                    <p className="text-gray-400 text-sm mt-1">Found {news.length} articles</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dull text-white transition rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add News
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                    <div key={item._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col">
                        <div className="relative h-40">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 flex gap-1">
                                <button onClick={() => handleOpenModal(item)} className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-primary transition">
                                    <EditIcon className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(item._id)} className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:text-red-500 transition">
                                    <Trash2Icon className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest">
                                {item.category}
                            </span>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-white font-bold text-base line-clamp-1 mb-1">{item.title}</h3>
                            <p className="text-gray-400 text-xs line-clamp-2 mb-4 leading-relaxed">{item.description}</p>
                            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-medium">
                                <div className="flex items-center gap-1.5">
                                    <CalendarIcon className="w-3 h-3 text-primary" />
                                    {item.date}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <div className="relative bg-[#1a1a1a] border border-white/10 w-full max-w-xl rounded-3xl overflow-hidden animate-fade-in-up">
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                {editId ? <EditIcon className="w-5 h-5 text-primary" /> : <PlusIcon className="w-5 h-5 text-primary" />}
                                {editId ? "Edit News" : "Create News"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
                            <div className="space-y-1.0">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">News Title</label>
                                <input
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition"
                                    placeholder="Enter news title..."
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Category</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Movies">Movies</option>
                                        <option value="Box Office">Box Office</option>
                                        <option value="Awards">Awards</option>
                                        <option value="Industry">Industry</option>
                                        <option value="Tech">Tech</option>
                                        <option value="Reviews">Reviews</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Date</label>
                                    <input
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition"
                                        placeholder="e.g. October 24, 2024"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 text-primary">Image URL</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                        <input
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-primary outline-none transition"
                                            placeholder="Paste image URL here..."
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        />
                                    </div>
                                    {formData.image && (
                                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl overflow-hidden shrink-0">
                                            <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Short Description</label>
                                <textarea
                                    required
                                    rows={2}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition resize-none"
                                    placeholder="Brief summary of the news..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 text-primary">Full Content (Optional)</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition resize-none"
                                    placeholder="The complete news article..."
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        </form>
                        <div className="p-6 bg-white/5 border-t border-white/10 flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 border border-white/10 rounded-xl font-bold text-sm text-gray-400 hover:bg-white/5 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 py-3 bg-primary hover:bg-primary-dull text-white rounded-xl font-bold text-sm transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                <SaveIcon className="w-4 h-4" />
                                {editId ? "Update Article" : "Create Article"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <Loading />
    );
};

export default ManageNews;
