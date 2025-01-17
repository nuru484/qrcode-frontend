import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import Dashboard from '@/components/dashboard/Dashboard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Layout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full max-w-screen-lg p-4 space-y-4">
        <div className=" flex justify-between items-center gap-4 sticky top-5 bg-white p-6 shadow-lg z-20">
          <SidebarTrigger className="bg-emerald-600 hover:bg-emerald-500 " />

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
            <Input
              className="pl-10 w-full border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg shadow-sm"
              placeholder="Search..."
            />
          </div>
        </div>
        {location.pathname === '/dashboard' && <Dashboard />}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
