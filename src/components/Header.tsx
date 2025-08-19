import React from 'react';
import { Shield, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FraudGuard</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </a>
            <a href="#detection" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Detection
            </a>
            <a href="#metrics" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Analytics
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <a href="#home" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </a>
            <a href="#detection" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Detection
            </a>
            <a href="#metrics" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Analytics
            </a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;