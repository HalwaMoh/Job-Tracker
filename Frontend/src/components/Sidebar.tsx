import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, LogOut } from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Job",
      path: "/add-job",
      icon: Briefcase,
    },
  ];

  return (
    <aside className="border-b border-[#2f4336] bg-[#112018]/95 px-4 py-4 text-white backdrop-blur md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r md:px-6 md:py-6">
      <div className="flex items-center justify-between md:block">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6E8B74] to-[#4F6756] text-sm font-semibold shadow-lg shadow-[#6E8B74]/25">
            JT
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">JobTracker</h1>
            <p className="text-sm text-[#b9cdb8]">Career dashboard</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex gap-2 overflow-x-auto md:mt-8 md:flex-col md:gap-3 md:overflow-visible">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                  isActive ? "bg-[#6E8B74] text-white shadow-sm" : "text-[#dce7dd] hover:bg-white/10"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-[#dce7dd] transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:mt-auto"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
