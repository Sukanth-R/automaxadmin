import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import '../index.css';

const Navbar = () => {
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const fetchMessageCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contacts');
        const data = await response.json();
        setMessageCount(data.length);
      } catch (error) {
        console.error('Error fetching message count:', error);
      }
    };

    fetchMessageCount();
    // Set up polling every 30 seconds to check for new messages
    const interval = setInterval(fetchMessageCount, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white text-black p-4 md:sticky md:top-0 md:z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo (Image Placeholder) */}
          <div className="ms-5">
            <img
              src="https://astraautomax.in/images/logo1.png" // Replace with your actual logo path
              alt="Automax Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 gap-4 items-center text-lg me-5">
            <Link to="/components/contact" className="flex items-center text-red-600 gap-2 hover:text-gray-500 relative">
              <MessageSquare size={20} />
              {messageCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {messageCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="p-4 space-y-2">
          <Link to="/components/contact" className="flex items-center text-red-600 gap-2 hover:text-gray-500 pb-2 relative">
            <MessageSquare size={20} />
            {messageCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {messageCount}
              </span>
            )}
          </Link>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;