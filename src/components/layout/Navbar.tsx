
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  HelpCircle
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (location.pathname === "/auth") return null;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isAuthenticated
          ? "bg-white bg-opacity-80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center space-x-2 text-blue-deep"
        >
          <motion.div 
            whileHover={{ rotate: 5 }}
            className="text-2xl font-bold"
          >
            SmartPlay
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard"
                className="relative text-blue-deep hover:text-blue-mid transition-colors"
              >
                <span className="flex items-center gap-1">
                  <LayoutDashboard size={16} />
                  <span>الرئيسية</span>
                </span>
                {location.pathname === '/dashboard' && (
                  <motion.div 
                    layoutId="navbar-indicator" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-mid rounded-full" 
                  />
                )}
              </Link>
              <Link 
                to="/levels"
                className="relative text-blue-deep hover:text-blue-mid transition-colors"
              >
                <span className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>المستويات</span>
                </span>
                {location.pathname === '/levels' && (
                  <motion.div 
                    layoutId="navbar-indicator" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-mid rounded-full" 
                  />
                )}
              </Link>
              <Link 
                to="/profile"
                className="relative text-blue-deep hover:text-blue-mid transition-colors"
              >
                <span className="flex items-center gap-1">
                  <User size={16} />
                  <span>الملف الشخصي</span>
                </span>
                {location.pathname === '/profile' && (
                  <motion.div 
                    layoutId="navbar-indicator" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-mid rounded-full" 
                  />
                )}
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                <LogOut size={16} />
                <span>تسجيل خروج</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/" className="relative text-blue-deep hover:text-blue-mid transition-colors">
                <span>الرئيسية</span>
                {location.pathname === '/' && (
                  <motion.div 
                    layoutId="navbar-indicator" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-mid rounded-full" 
                  />
                )}
              </Link>
              <Link to="/auth" className="relative">
                <Button size="sm" className="flex items-center gap-1">
                  <span>تسجيل الدخول</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100">
                  <LayoutDashboard size={20} />
                  <span className="text-lg">الرئيسية</span>
                </Link>
                <Link to="/levels" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100">
                  <BookOpen size={20} />
                  <span className="text-lg">المستويات</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100">
                  <User size={20} />
                  <span className="text-lg">الملف الشخصي</span>
                </Link>
                <div className="pt-2 border-t border-slate-200">
                  <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2" size={20} />
                    <span>تسجيل خروج</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="p-2 text-lg hover:text-blue-mid transition-colors">
                  الرئيسية
                </Link>
                <Link to="/auth">
                  <Button className="w-full">تسجيل الدخول</Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
