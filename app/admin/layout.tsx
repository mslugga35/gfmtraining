// Temporarily disabled Clerk authentication
// import { auth, currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  Calendar, 
  ShoppingBag, 
  Settings, 
  Upload,
  BarChart3,
  Bell,
  BookOpen
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - GFMTF',
  description: 'Administrative dashboard for GFMTF training facility',
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: BookOpen },
  { name: 'Players', href: '/admin/players', icon: Users },
  { name: 'Video Upload', href: '/admin/videos/upload', icon: Upload },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Shop', href: '/admin/shop', icon: ShoppingBag },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Temporarily disabled authentication for testing
  // const { userId } = await auth();
  // const user = await currentUser();
  
  // if (!userId) {
  //   redirect('/sign-in');
  // }

  // For now, allow access without authentication
  const user = { firstName: 'Coach', lastName: 'Larry' };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto" style={{ backgroundColor: '#ffffff', borderRight: '1px solid #e5e5e5' }}>
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/" className="text-xl font-bold heading-font" style={{ color: '#DC2626' }}>
              GFMTF Admin
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
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors body-font hover:bg-gray-100"
                    style={{ 
                      color: '#333333',
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
          
          <div className="flex-shrink-0 flex p-4" style={{ borderTop: '1px solid #e5e5e5' }}>
            <div className="flex items-center w-full">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold">CL</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium body-font" style={{ color: '#333333' }}>
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs body-font" style={{ color: '#666666' }}>Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="px-6 py-4" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold heading-font" style={{ color: '#333333' }}>Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 transition-colors hover:bg-gray-100 rounded-lg" style={{ color: '#666666' }}>
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <Link 
                href="/dashboard"
                className="text-sm transition-colors body-font hover:text-red-600"
                style={{ color: '#666666' }}
              >
                View Player Dashboard
              </Link>
            </div>
          </div>
        </header>

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