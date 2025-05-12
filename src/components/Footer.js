import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-[#133E87] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left md:text-left mt-10">
        {/* Address Section */}
        <div className="text-lg">
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          <p>123 Street Name</p>
          <p>City, State, ZIP</p>
          <p>Country</p>
          <p>Email: example@email.com</p>
          <p>Phone: +123 456 7890</p>

          {/* Follow Us Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-all duration-200 ease-in-out">
                <FaTwitter size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-all duration-200 ease-in-out">
                <FaFacebook size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-all duration-200 ease-in-out">
                <FaLinkedin size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-all duration-200 ease-in-out">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest ">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">About</Link></li>
            <li><Link to="/services" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Gallery</Link></li>
            <li><Link to="/components/contact" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Contact</Link></li>
          </ul>
        </div>
        
        {/* Products Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Our Products</h3>
          <ul className="space-y-2">
          <li><Link to="/components/products/water" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Water Proof LED Lights</Link></li>
          <li><Link to="/components/products/boat" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Boat Lights</Link></li>
          <li><Link to="/components/products/fog" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Fog Lights</Link></li>
          <li><Link to="/components/products/twowheeler" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Two Wheeler Lights</Link></li>
          <li><Link to="/components/products/converters" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Converters</Link></li>
          <li><Link to="/components/products/roof" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Roof Lamps</Link></li>
          <li><Link to="/components/products/tail" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Tail Lamp Assembly</Link></li>
          <li><Link to="/components/products/side" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Side Indicators</Link></li>
          <li><Link to="/components/products/decorative" className="hover:text-gray-400 transition-all duration-200 ease-in-out hover:tracking-widest">Decorative Lights</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="text-center mt-6 text-gray-200 text-sm">
        &copy;AUTOMAX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;