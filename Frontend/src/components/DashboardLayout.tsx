import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(110,139,116,0.16),_transparent_30%),linear-gradient(135deg,_#f7fbf6_0%,_#eef4eb_100%)] text-[#1F2937]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <Sidebar />

        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;