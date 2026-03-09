import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '#footer' },  // Changed from '/#footer' to '#footer'
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: footer, offsetY: 0 },
        ease: 'power2.inOut',
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href === '#footer') {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      
      // If already on home page, just scroll to footer
      if (location.pathname === '/') {
        scrollToFooter();
      } else {
        // If on another page, navigate home first then scroll
        navigate('/', { state: { scrollToFooter: true } });
      }
    }
  };

  // Handle scroll after navigation
  useEffect(() => {
    const state = location.state as { scrollToFooter?: boolean };
    if (state?.scrollToFooter && location.pathname === '/') {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        scrollToFooter();
        // Clear the state
        navigate('/', { replace: true, state: {} });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const isActive = (href: string) => {
    if (href.startsWith('#')) return false; // Hash links are never "active" in the nav
    return location.pathname === href;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
    } paper-texture`}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 4xl:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="font-mansalva text-2xl sm:text-3xl md:text-4xl text-black transform -rotate-2 hover:rotate-0 transition-transform duration-300 flex items-center gap-2"
          >
            <img src="/favicon.png" alt="ZENZEN" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            <span>ZENZEN</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href.startsWith('#') ? '/' : link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 font-share-tech text-sm xl:text-base transition-all duration-300 transform ${
                  isActive(link.href)
                    ? 'bg-[#FFAA00] text-black -translate-y-1 shadow-md' 
                    : 'hover:-translate-y-0.5 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            className="lg:hidden p-2 text-black hover:text-[#FFAA00] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 top-16 bg-white z-40 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href.startsWith('#') ? '/' : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-mansalva text-3xl sm:text-4xl text-black hover:text-[#FFAA00] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}