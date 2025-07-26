import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-secondary text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif mb-4">Lali Design</h3>
            <p className="text-gray-300">Crafting elegance, one thread at a time.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-brand-primary transition-colors">Buy</Link></li>
              <li><Link to="/rentals" className="hover:text-brand-primary transition-colors">Rent</Link></li>
              <li><Link to="/tailoring" className="hover:text-brand-primary transition-colors">Tailoring</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-primary transition-colors"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-brand-primary transition-colors"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-brand-primary transition-colors"><FaPinterest size={24} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-2">Get updates on new arrivals and special offers.</p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-l-md text-brand-text focus:outline-none" />
              <button type="submit" className="bg-brand-primary px-4 py-2 rounded-r-md font-semibold">Go</button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Lali Design. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;