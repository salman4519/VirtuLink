import { useLocation } from 'react-router-dom';
import SidebarItem from '../../ui/SidebarItem';
import { 
  RiDashboardLine, 
  RiCalendarCheckLine, 
  RiUserLine, 
  RiLogoutBoxLine,
  RiMenuLine,
  RiCloseLine
} from 'react-icons/ri';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from 'react';

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Determine active route
  const getActiveState = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="md:hidden fixed bottom-4 right-4 z-20 p-3 rounded-full bg-[#8A2BE2] text-white shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
      </button>

      {/* Sidebar container */}
      <aside className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#0D0D14] border-r border-[#1A1A25] flex flex-col z-10`}>
        {/* Logo */}
        <div className="p-6 flex items-center">
          <h1 className="text-2xl font-[Pacifico] text-white">Host</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            <SidebarItem 
              icon={<RiDashboardLine className="ri-lg" />} 
              text="Dashboard" 
              active={getActiveState('/host/dashboard')}
              onClick={() => setMobileMenuOpen(false)}
              href="/host/dashboard"
            />
            <SidebarItem 
              icon={<RiCalendarCheckLine className="ri-lg" />} 
              text="My Events" 
              active={getActiveState('/host/my-events')}
              onClick={() => setMobileMenuOpen(false)}
              href="/host/my-events"
            />
            <SidebarItem 
              icon={<IoIosAddCircleOutline className="ri-lg" />} 
              text="Create Event" 
              active={getActiveState('/host/create-event')}
              onClick={() => setMobileMenuOpen(false)}
              href="/host/create-event"
            />
            <SidebarItem 
              icon={<RiUserLine className="ri-lg" />} 
              text="Profile" 
              active={getActiveState('/host/profile')}
              onClick={() => setMobileMenuOpen(false)}
              href="/host/profile"
            />
          </div>
        </nav>
        
        {/* Logout Button */}
        <div className="p-4 border-t border-[#1A1A25]">
          <SidebarItem 
            icon={<RiLogoutBoxLine className="ri-lg" />} 
            text="Logout" 
            onClick={() => {
              setMobileMenuOpen(false);
              // Add your logout logic here
            }}
          />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;