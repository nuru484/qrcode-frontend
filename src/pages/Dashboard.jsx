import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import Dashboard from '@/components/dashboard/Dashboard';
import SearchBox from '@/components/dashboard/SearchBox';

export default function Layout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full max-w-screen-lg p-4 space-y-4">
        <div className=" flex justify-between items-center gap-4 sticky top-5 bg-white p-6 shadow-lg z-20">
          <SidebarTrigger className="bg-emerald-600 hover:bg-emerald-500 " />

          <SearchBox />
        </div>
        {location.pathname === '/dashboard' && <Dashboard />}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
