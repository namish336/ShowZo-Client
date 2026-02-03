import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, confirmPayment } from '../services/api'; // Check import path if needed (using services/api)
// Wait, api.js exports specific functions, check lines above. Yes.
// Need to import getUserBookings to get amount or pass it? Plan said "Fetch booking details".
import { getUserBookings } from '../services/api';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

// Initialize Stripe outside component to avoid recreation
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ bookingId, redirectPath }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { getToken } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL where Stripe redirects after payment completion
                // We'll handle success manually if redirect is not forced, or redirect to a success page.
                // However, for PaymentIntent with automatic_payment_methods, redirect might be required.
                // Let's set return_url to current page? Or a success page.
                // Actually, with redirect: 'if_required', we can handle it inline.
                return_url: window.location.origin + "/my-bookings",
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            toast.error(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment Succeeded!");
            toast.success("Payment Succeeded!");

            // Confirm on backend
            const token = await getToken();
            const result = await confirmPayment(bookingId, paymentIntent.id, token);

            if (result.success) {
                navigate("/my-bookings");
            } else {
                toast.error("Payment verified but backend update failed: " + result.message);
                // Still navigate to bookings as payment went through? 
                // Best to verify why backend failed.
                navigate("/my-bookings");
            }
            setIsLoading(false);
        } else {
            setMessage("Payment status: " + paymentIntent.status);
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-gray-800">
            <PaymentElement />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full mt-6 bg-primary text-white py-3 rounded-md font-bold hover:bg-primary-dull transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Processing..." : "Pay Now"}
            </button>
            {message && <div id="payment-message" className="mt-4 text-center text-sm text-red-500">{message}</div>}
        </form>
    );
};

const BookingPayment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate("/"); // Redirect if not signed in
        }
    }, [isLoaded, isSignedIn, navigate]);

    useEffect(() => {
        const initializePayment = async () => {
            if (!id) return;

            try {
                const token = await getToken();
                // 1. Get booking details to show amount (optional, but good UX)
                // getUserBookings returns array. We scan it or fetch specific booking API?
                // api.js doesn't have getBookingById... 
                // I'll assume getUserBookings and find it for now, or just rely on createPaymentIntent to handle it.
                // Actually createPaymentIntent calculates amount on server.
                // BUT user wants to SEE "Payment amount = ticketPrice × numberOfSeats" on frontend before paying?
                // Plan said "Verify Amount matches".
                // I'll fetch user bookings and find the one matching ID.
                const bookings = await getUserBookings(token);
                const currentBooking = bookings.find(b => b._id === id);

                if (!currentBooking) {
                    setError("Booking not found");
                    return;
                }
                setBooking(currentBooking);

                if (currentBooking.isPaid) {
                    toast.success("Booking already paid!");
                    navigate("/my-bookings");
                    return;
                }

                // 2. Create PaymentIntent
                const res = await createPaymentIntent(id, token);
                if (res.success) {
                    setClientSecret(res.clientSecret);
                } else {
                    setError(res.message || "Failed to initialize payment");
                    toast.error(res.message);
                }

            } catch (err) {
                console.error(err);
                setError("An error occurred");
            }
        };

        if (isLoaded && isSignedIn) {
            initializePayment();
        }

    }, [id, getToken, isLoaded, isSignedIn, navigate]);

    if (!isLoaded || (!clientSecret && !error)) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p>{error}</p>
                <button onClick={() => navigate("/my-bookings")} className="mt-4 text-primary hover:underline">
                    Back to My Bookings
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 px-6 md:px-16 lg:px-40 pb-10">
            <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Payment</h1>

            {booking && (
                <div className="max-w-md mx-auto mb-8 p-4 bg-gray-800/50 rounded-lg text-center border border-gray-700">
                    <p className="text-gray-400 text-sm">Booking for</p>
                    <p className="text-xl font-semibold mb-2">{booking.showtime?.movie?.title}</p>
                    <p className="text-2xl font-bold text-primary">
                        {import.meta.env.VITE_CURRENCY}{booking.amount}
                    </p>
                </div>
            )}

            {clientSecret && (
                <Elements options={{ clientSecret, appearance: { theme: 'stripe' } }} stripe={stripePromise}>
                    <CheckoutForm bookingId={id} />
                </Elements>
            )}
        </div>
    );
};

export default BookingPayment;
