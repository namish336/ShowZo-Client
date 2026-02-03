import { assets } from "../../assets/assets";
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const user = {
    firstName: "Namish",
    lastName: "Admin",
    role: "Administrator",
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: "Overview", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Manage Movies", path: "/admin/manage-movies", icon: ListIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    { name: "Bookings", path: "/admin/list-bookings", icon: ListCollapseIcon },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-full px-4 pb-6 ml-4 mb-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
      {/* User Profile Section */}
      <div className="flex items-center gap-3 py-6 px-2 mb-6 border-b border-white/10">
        <div className="relative">
          <img
            className="h-10 w-10 rounded-full object-cover border-2 border-primary/50"
            src={user.imageUrl}
            alt="profile"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold truncate text-white">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-400 truncate">{user.role}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto no-scrollbar">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Menu</p>
        {adminNavlinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${isActive
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
                <span className="font-medium text-sm">{link.name}</span>

                {/* Active Indicator Glow */}
                {isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>


    </div>
  );
};

export default AdminSidebar;