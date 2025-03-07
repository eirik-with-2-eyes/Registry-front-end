import React from 'react';
import { User } from '../App';

interface NavbarProps {
  currentUser: User;
  activeView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, activeView, onNavigate }) => {
  return (
    <nav className="flex items-center justify-between mb-8 pb-4 border-b">
      <div>
        <button 
          onClick={() => onNavigate("events")}
          className={`mr-4 px-3 py-1 rounded ${activeView === "events" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-blue-500"}`}
        >
          My Events
        </button>
      </div>
      <div className="flex items-center">
        <span className="text-gray-700">Welcome, {currentUser.name}</span>
      </div>
    </nav>
  );
};