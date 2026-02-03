import axios from "axios";
import apiRoutes from "../lib/apiRoutes";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getMovies = async (params) => {
    try {
        const response = await api.get(apiRoutes.movies, { params });
        return response.data.movies;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};

export const getMovieById = async (id) => {
    try {
        const response = await api.get(`${apiRoutes.movies}/${id}`);
        return response.data.movie;
    } catch (error) {
        console.error("Error fetching movie by ID:", error);
        return null;
    }
};

export const updateMovie = async (id, data) => {
    try {
        const response = await api.put(`${apiRoutes.movies}/${id}`, data);
        return response.data.movie;
    } catch (error) {
        console.error("Error updating movie:", error);
        return null;
    }
};

export const getTheaters = async () => {
    try {
        const response = await api.get(apiRoutes.theaters);
        return response.data.theaters;
    } catch (error) {
        console.error("Error fetching theaters:", error);
        return [];
    }
};

export const addShow = async (data) => {
    try {
        const response = await api.post(apiRoutes.showtimes, data);
        return response.data;
    } catch (error) {
        console.error("Error adding show:", error);
        return { success: false, message: error.message };
    }
};

export const getAllShowtimes = async (params) => {
    try {
        const response = await api.get(apiRoutes.showtimes, { params });
        return response.data.showtimes;
    } catch (error) {
        console.error("Error fetching showtimes:", error);
        return [];
    }
};

export const deleteShow = async (id) => {
    try {
        const response = await api.delete(`${apiRoutes.showtimes}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting show:", error);
        return { success: false, message: error.message };
    }
};

export const createBooking = async (data, token) => {
    try {
        console.log("Sending booking request with token:", token ? "Token present" : "Token missing");
        const response = await api.post(apiRoutes.bookings, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating booking:", error);
        return { success: false, message: error.message };
    }
};

// Get user bookings
export const getUserBookings = async (token) => {
    try {
        const response = await api.get(`${apiRoutes.bookings}/my-bookings`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.bookings;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};

// Get all bookings (Admin)
export const getAllBookings = async () => {
    try {
        const response = await api.get(`${apiRoutes.bookings}/all-bookings`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all bookings:", error);
        throw error;
    }
};

export const cancelBooking = async (id, token) => {
    try {
        const response = await api.delete(`${apiRoutes.bookings}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return { success: false, message: error.message };
    }
};



export const addToFavorites = async (movieId, token) => {
    try {
        const response = await api.post(apiRoutes.favorites, { movieId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding favorite:", error);
        return { success: false, message: error.message };
    }
};

export const removeFromFavorites = async (movieId, token) => {
    try {
        const response = await api.delete(`${apiRoutes.favorites}/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing favorite:", error);
        return { success: false, message: error.message };
    }
};

export const getFavorites = async (token) => {
    try {
        const response = await api.get(apiRoutes.favorites, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.favorites;
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return [];
    }
};

// --- Collections ---

export const createCollection = async (name, token) => {
    try {
        const response = await api.post(apiRoutes.collections, { name }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating collection:", error);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const getCollections = async (token) => {
    try {
        const response = await api.get(apiRoutes.collections, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.collections;
    } catch (error) {
        console.error("Error fetching collections:", error);
        return [];
    }
};

export const addMovieToCollection = async (collectionId, movieId, token) => {
    try {
        const response = await api.post(`${apiRoutes.collections}/add`, { collectionId, movieId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to collection:", error);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const removeMovieFromCollection = async (collectionId, movieId, token) => {
    try {
        const response = await api.delete(`${apiRoutes.collections}/${collectionId}/movie/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing from collection:", error);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const deleteCollection = async (collectionId, token) => {
    try {
        const response = await api.delete(`${apiRoutes.collections}/${collectionId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting collection:", error);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const createPaymentIntent = async (bookingId, token) => {
    try {
        const response = await api.post(`${apiRoutes.payments}/create-payment-intent`, { bookingId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating payment intent:", error);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const confirmPayment = async (bookingId, paymentIntentId, token) => {
    try {
        const response = await api.post(`${apiRoutes.payments}/confirm-payment`, { bookingId, paymentIntentId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error confirming payment:", error);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const getOccupiedSeats = async (showtimeId) => {
    try {
        // No auth required for checking seats usually, or public? allow public content
        // No auth required for checking seats usually, or public? allow public content
        const response = await api.get(`${apiRoutes.bookings}/occupied/${showtimeId}`);
        return response.data.occupiedSeats;
    } catch (error) {
        console.error("Error fetching occupied seats:", error);
        return [];
    }
};

export const getDashboardStats = async (token) => {
    try {
        const response = await api.get("/dashboard/stats", {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return { success: false, message: error.message };
    }
};

export default api;
