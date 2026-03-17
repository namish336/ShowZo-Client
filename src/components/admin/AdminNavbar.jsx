import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Menu } from "lucide-react";

const AdminNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden text-gray-300 hover:text-white transition-colors p-1"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-28 md:w-36 h-auto" />
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;