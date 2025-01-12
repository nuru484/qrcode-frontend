import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="container bg-blue mx-auto">
      <SidebarProvider>
        <AppSidebar />
        <main className="container bg-white w-full p-4">
          <SidebarTrigger className="bg-emerald-600 hover:bg-emerald-500 " />

          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
