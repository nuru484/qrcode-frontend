import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet, useLocation } from 'react-router-dom';
import Dashboard from '@/components/dashboard/Dashboard';
import SearchBox from '@/components/dashboard/SearchBox';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvent';
import { useUserAttendedEvents } from '@/hooks/useAttendance';
import { useUserEventRegistrations } from '@/hooks/useEventRegistration';
import { useState } from 'react';

export default function Layout() {
  const { user } = useAuth();
  const { events } = useEvents();
  const { userAttendedEvents = [] } =
    useUserAttendedEvents(user?.data?.id) || {};
  const { userEventRegistrations } = useUserEventRegistrations(user?.data.id);

  const location = useLocation();
  const [activeTab, setActiveTab] = useState('all');

  const tabEventMap = {
    all: events?.data || [],
    attended: userAttendedEvents?.data || [],
    registered: userEventRegistrations?.data || [],
  };

  const selectedEvents = tabEventMap[activeTab] || [];

  console.log(location.pathname);

  const query = selectedEvents.map((event) => ({
    title: event.title,
    description: event.description,
  }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full max-w-screen-lg p-4 space-y-4">
        <div className="flex justify-between items-center gap-4 sticky top-5 bg-white p-6 shadow-lg z-20">
          <SidebarTrigger className="bg-emerald-600 hover:bg-emerald-500 " />

          <SearchBox query={query} />
        </div>
        {location.pathname === '/dashboard' && <Dashboard />}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
