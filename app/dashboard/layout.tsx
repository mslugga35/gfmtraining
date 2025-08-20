import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { 
  Home, 
  Video, 
  TrendingUp, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - GFMTF',
  description: 'Player dashboard for GFMTF training facility',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Videos', href: '/dashboard/videos', icon: Video },
  { name: 'Progress', href: '/dashboard/progress', icon: TrendingUp },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'rgb(22, 22, 22)' }}>
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto" style={{ backgroundColor: 'rgba(22, 22, 22, 0.8)', borderRight: '1px solid rgb(127, 128, 128)' }}>
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/" className="text-xl font-bold heading-font" style={{ color: 'rgb(247, 247, 247)' }}>
              GFMTF
            </Link>
          </div>
          
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium gfmtf-button transition-colors body-font"
                    style={{ 
                      color: 'rgb(127, 128, 128)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex p-4" style={{ borderTop: '1px solid rgb(127, 128, 128)' }}>
            <div className="flex items-center w-full">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
              <div className="ml-3">
                <p className="text-sm font-medium body-font" style={{ color: 'rgb(247, 247, 247)' }}>Player Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden">
        {/* Mobile menu button would go here - implement with state management */}
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}