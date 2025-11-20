import React from 'react';
import { View } from '../types';
import { Menu, Map, Landmark, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: View.HOME, label: 'Home', icon: Menu },
    { view: View.GUIDE, label: 'Explore GDL', icon: Map },
    { view: View.STADIUM, label: 'Match Day', icon: Landmark },
    { view: View.OFFICIAL, label: 'Gov Connect', icon: ShieldAlert },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg z-50 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-end md:space-x-8 h-16 items-center">
          {/* Mobile/Desktop Hybrid Menu */}
          <div className="hidden md:flex items-center mr-auto font-bold text-xl text-mexico-green">
            <span className="mr-2">⚽</span> GDL 2026
          </div>
          
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`flex flex-col md:flex-row items-center justify-center w-full md:w-auto px-3 py-2 rounded-md transition-colors duration-200
                ${currentView === item.view 
                  ? 'text-mexico-green md:bg-green-50' 
                  : 'text-gray-500 hover:text-mexico-red'
                }`}
            >
              <item.icon size={24} className="mb-1 md:mb-0 md:mr-2" />
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};