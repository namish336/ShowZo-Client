import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

const CreateCollectionModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name);
            setName('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#18181B] border border-white/10 p-6 rounded-2xl w-full max-w-md relative animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                <h2 className="text-2xl font-bold mb-1">New Collection</h2>
                <p className="text-sm text-gray-400 mb-6">Create a new collection to organize your favorite movies.</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Collection Name</label>
                        <input
                            type="text"
                            className="w-full bg-[#09090B] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                            placeholder="e.g. Weekend Watchlist, Horror Classics"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-primary hover:bg-primary-dull text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Collection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCollectionModal;
