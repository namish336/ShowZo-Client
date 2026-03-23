import React from 'react'
import HomeSidebar from '../components/HomeSidebar'
import HomeMainContent from '../components/HomeMainContent'

const Home = () => {
  return (
    <div className="h-[100dvh] w-full max-w-[100vw] flex overflow-y-auto overflow-x-hidden lg:overflow-hidden bg-[#C0C9DB] text-gray-900 scroll-smooth">
      {/* Radial soft gradient covering the background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-black/5 pointer-events-none z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-full min-h-full flex flex-col lg:flex-row pt-20 lg:pt-24 gap-8 lg:gap-0">
        <HomeMainContent />
        <HomeSidebar />
      </div>
    </div>
  )
}

export default Home