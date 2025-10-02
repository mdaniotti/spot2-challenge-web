import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <Link to="/urls" className="flex items-center space-x-2 md:space-x-3">
            <Logo size="h-8 md:h-12" />
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              <span className="hidden sm:inline">URL Shortener</span>
              <span className="sm:hidden">URLS</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/urls"
              className={`p-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/urls"
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-900 hover:bg-primary"
              }`}
            >
              URLs List
            </Link>
            <Link
              to="/create"
              className={`p-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/create"
                  ? "text-primary"
                  : "text-gray-600 hover:text-gray-900 hover:bg-primary"
              }`}
            >
              Create New URL
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-primary"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                to="/urls"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/urls"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900 hover:bg-primary"
                }`}
              >
                URLs List
              </Link>
              <Link
                to="/create"
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/create"
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900 hover:bg-primary"
                }`}
              >
                Create URL
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
