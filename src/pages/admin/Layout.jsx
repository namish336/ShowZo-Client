import React, { useEffect } from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Loading from '../../components/Loading'

const Layout = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        navigate("/");
        return;
      }

      const email = user.primaryEmailAddress?.emailAddress;
      if (email !== "namishs457@gmail.com") {
        navigate("/");
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  if (!isLoaded) return <Loading />;

  // Initial check before effect runs to avoid flash of content
  if (!isSignedIn || (user?.primaryEmailAddress?.emailAddress !== "namishs457@gmail.com")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-outfit overflow-hidden relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <AdminNavbar />

      <div className="flex h-[calc(100vh-64px)] pt-4 relative z-10">
        <AdminSidebar />

        <main className="flex-1 px-6 py-6 overflow-y-auto no-scrollbar">
          <div className="max-w-7xl mx-auto pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout