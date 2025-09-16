import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from './ui/Icon';

const Header: React.FC = () => {
  return (
    <header className="bg-card shadow-sm mb-8 border-b border-border no-print">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center text-xl font-bold text-primary">
              <Icon name="logo" className="h-8 w-8 mr-2" />
              <span>BEOFlow</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-accent text-primary' : 'text-foreground hover:bg-accent'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-accent text-primary' : 'text-foreground hover:bg-accent'
                  }`
                }
              >
                Admin
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;