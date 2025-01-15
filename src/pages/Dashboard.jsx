import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import Dashboard from '@/components/dashboard/Dashboard';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="container mx-auto">
      <SidebarProvider>
        <AppSidebar />
        <main className="container bg-white w-full p-4 space-y-4">
          <SidebarTrigger className="bg-emerald-600 hover:bg-emerald-500 " />
          {location.pathname === '/dashboard' && <Dashboard />}
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
