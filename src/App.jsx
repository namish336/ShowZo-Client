import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import SeatLayout from "./pages/SeatLayout"
import MyBookings from "./pages/MyBookings"
import Collections from "./pages/Collections"
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import WatchGuides from './pages/WatchGuides'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ManageMovies from './pages/admin/ManageMovies'

import ManageNews from './pages/admin/ManageNews'

import ListBookings from './pages/admin/ListBookings'
import SearchResults from './pages/SearchResults'
import Details from './pages/Details'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Theaters from './pages/Theaters'
import TheaterShows from './pages/TheaterShows'
import BookingPayment from './pages/BookingPayment'
import AboutUs from './pages/AboutUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ContactUs from './pages/ContactUs'


const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/booking/payment/:id" element={<BookingPayment />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/watchguides" element={<WatchGuides />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/theaters" element={<Theaters />} />
        <Route path="/theaters/:id/shows" element={<TheaterShows />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/news/:id" element={<NewsDetail />} />

        <Route path='/admin/*' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-movies" element={<ManageMovies />} />
          <Route path="manage-news" element={<ManageNews />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />

        </Route>



      </Routes >
      {!isAdminRoute && <Footer />}

    </>
  )
}

export default App