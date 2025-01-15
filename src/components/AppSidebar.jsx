import React from 'react';
import {
  NotebookPen,
  CalendarCheck2,
  UserRoundPen,
  ChevronUp,
  ChevronDown,
  User2,
  Home,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, useLogout } from '@/hooks/useAuth';

const getMenuItems = (isAdmin) => [
  {
    title: 'Dashboard',
    icon: Home,
  },
  {
    title: 'Event',
    icon: CalendarCheck2,
    subItems: [
      ...(isAdmin ? [{ title: 'Create Event', url: 'create-event' }] : []),
      { title: 'View Events', url: 'events' },
    ],
  },
  {
    title: 'Attendance',
    icon: UserRoundPen,
    subItems: [
      ...(isAdmin ? [{ title: 'Take Attendance', url: 'takeAttendance' }] : []),
      { title: 'View Reports', url: 'viewReports' },
    ],
  },
  {
    title: 'Event Registration',
    icon: NotebookPen,
    subItems: [{ title: 'Registered Events', url: 'registered-events' }],
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = React.useState(null);
  const { user } = useAuth();
  const isAdmin = user?.data?.role === 'ADMIN';
  const items = React.useMemo(() => getMenuItems(isAdmin), [isAdmin]);
  const navigate = useNavigate();
  const { mutate: logout, isPending, isError, error } = useLogout();

  return (
    <Sidebar className="border-r border-emerald-200 bg-emerald-50">
      <SidebarHeader className="border-b border-emerald-200 bg-emerald-600">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="font-bold text-white hover:bg-emerald-700 transition-colors"
                  aria-haspopup="true"
                  aria-label="QR Code Attendance Menu"
                  tabIndex={0}
                >
                  QR CODE ATTENDANCE
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-emerald-200">
                <DropdownMenuItem className="hover:bg-emerald-50">
                  <span>Go to Dashboard</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem className="hover:bg-emerald-50">
                    <span>Modify Settings</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <Collapsible
                  key={item.title}
                  open={activeItem === index}
                  onOpenChange={() =>
                    setActiveItem(activeItem === index ? null : index)
                  }
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        onClick={() => {
                          if (!item.subItems) {
                            navigate(`/dashboard`);
                          }
                        }}
                        className="w-full flex items-center hover:bg-emerald-100 transition-colors"
                        aria-expanded={
                          item.subItems
                            ? activeItem === index
                              ? 'true'
                              : 'false'
                            : undefined
                        }
                        aria-controls={
                          item.subItems ? `collapsible-${index}` : undefined
                        }
                      >
                        <item.icon className="mr-2 h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-900">{item.title}</span>
                        {activeItem === index && item.subItems ? (
                          <ChevronUp className="ml-auto h-4 w-4 text-emerald-600" />
                        ) : (
                          item.subItems && (
                            <ChevronDown className="ml-auto h-4 w-4 text-emerald-600" />
                          )
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent
                      id={`collapsible-${index}`}
                      role="region"
                      className="bg-emerald-50"
                    >
                      <SidebarMenuSub>
                        {item.subItems?.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.title}
                            className="hover:bg-emerald-100 my-1 py-1 border-b border-gray-200"
                          >
                            <NavLink
                              to={`/dashboard/${subItem.url}`}
                              className={({ isActive }) =>
                                isActive
                                  ? 'text-emerald-600 font-bold'
                                  : 'text-emerald-700 hover:text-emerald-900'
                              }
                            >
                              {subItem.title}
                            </NavLink>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-emerald-200 bg-emerald-600">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="w-full text-white hover:bg-emerald-700 transition-colors"
                  aria-haspopup="true"
                  aria-label="User Settings"
                  tabIndex={0}
                >
                  <User2 className="mr-2 h-4 w-4" />
                  <span>
                    {isPending
                      ? 'Signing Out...'
                      : user?.data?.username || 'Username'}
                  </span>

                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-white border border-emerald-200"
              >
                <DropdownMenuItem className="hover:bg-emerald-50">
                  <span>Account</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem className="hover:bg-emerald-50">
                    <span>Billing</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => {
                    logout();
                  }}
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
