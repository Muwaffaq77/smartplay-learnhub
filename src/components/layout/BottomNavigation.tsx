
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Book, MessageSquare, Award, User } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useUser();

  // لا تعرض لوحة التنقل للمستخدمين غير المسجلين أو في صفحات معينة
  if (!isAuthenticated || location.pathname === "/" || location.pathname === "/auth" || location.pathname === "/onboarding") {
    return null;
  }

  const navItems = [
    { path: "/dashboard", icon: Home, label: "الرئيسية" },
    { path: "/levels", icon: Book, label: "المستويات" },
    { path: "/chat", icon: MessageSquare, label: "الدردشة" },
    { path: "/leaderboard", icon: Award, label: "المتصدرين" },
    { path: "/profile", icon: User, label: "الملف الشخصي" },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-t-xl z-40"
    >
      <div className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center p-2 ${
              location.pathname === item.path 
                ? "text-blue-800" 
                : "text-gray-600"
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;
