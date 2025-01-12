import React from 'react';
import {
  NotebookPen,
  CalendarCheck2,
  UserRoundPen,
  ChevronUp,
  ChevronDown,
  User2,
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
import { NavLink } from 'react-router-dom';

const items = [
  {
    title: 'Event',
    icon: CalendarCheck2,
    subItems: [
      { title: 'Create Event', url: 'create-event' },
      { title: 'View Events', url: 'events' },
    ],
  },
  {
    title: 'Attendance',
    icon: UserRoundPen,
    subItems: [
      { title: 'Take Attendance', url: 'takeAttendance' },
      { title: 'View Reports', url: 'viewReports' },
    ],
  },
  {
    title: 'Event Registration',
    icon: NotebookPen,
    subItems: [{ title: 'Register For Event', url: 'registerForEvent' }],
  },
];

export function AppSidebar() {
  const [activeItem, setActiveItem] = React.useState(null);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="font-bold"
                  aria-haspopup="true"
                  aria-label="QR Code Attendance Menu"
                  tabIndex={0}
                >
                  QR CODE ATTENDANCE
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <span>Go to Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Modify Settings</span>
                </DropdownMenuItem>
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
                        className="w-full flex items-center"
                        aria-expanded={activeItem === index ? 'true' : 'false'}
                        aria-controls={`collapsible-${index}`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                        {activeItem === index ? (
                          <ChevronUp className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent
                      id={`collapsible-${index}`}
                      role="region"
                    >
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <NavLink
                              to={`/dashboard/${subItem.url}`}
                              className={({ isActive }) =>
                                isActive
                                  ? 'text-blue-500 font-bold'
                                  : 'text-gray-500'
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

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="w-full"
                  aria-haspopup="true"
                  aria-label="User Settings"
                  tabIndex={0}
                >
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Username</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
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
