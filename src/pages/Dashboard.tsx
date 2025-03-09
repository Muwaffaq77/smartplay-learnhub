
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Home, User, Book, Award, MessageSquare } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeFaqPage, setActiveFaqPage] = useState(0);

  const levels = [
    {
      id: "bronze",
      name: "برونزي",
      color: "from-amber-600 to-amber-700",
      borderColor: "border-amber-500",
      icon: "🏆",
      locked: false,
      position: "bottom-32 left-[20%]",
    },
    {
      id: "silver",
      name: "فضي",
      color: "from-gray-300 to-gray-400",
      borderColor: "border-gray-400",
      icon: "🥈",
      locked: user?.level < 2,
      position: "bottom-60 left-[35%]",
    },
    {
      id: "gold",
      name: "ذهبي",
      color: "from-yellow-400 to-yellow-500",
      borderColor: "border-yellow-500",
      icon: "🥇",
      locked: user?.level < 3,
      position: "bottom-80 left-1/2 -translate-x-1/2",
    },
    {
      id: "diamond",
      name: "ماسي",
      color: "from-blue-300 to-blue-400",
      borderColor: "border-blue-400",
      icon: "💎",
      locked: user?.level < 4,
      position: "bottom-60 right-[35%]",
    },
    {
      id: "legendary",
      name: "أسطوري",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-400",
      icon: "👑",
      locked: user?.level < 5,
      position: "bottom-32 right-[20%]",
    },
  ];

  const handleLevelClick = (level) => {
    if (level.locked) {
      toast({
        title: "المستوى مقفل",
        description: "يجب إكمال المستويات السابقة أولاً",
        variant: "destructive",
      });
      return;
    }
    navigate(`/levels`);
  };

  const faqPages = [
    "يفضل مراجعتك للاسئله المتكرره قبل بدايه استخدام التطبيق",
    "قم بإكمال المستويات بالترتيب للحصول على أفضل تجربة تعليمية",
    "يمكنك مشاهدة تقدمك في صفحة الملف الشخصي"
  ];

  const nextFaqPage = () => {
    setActiveFaqPage((prev) => (prev + 1) % faqPages.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-800 via-blue-600 to-blue-900">
      {/* FAQ Banner */}
      <div 
        className="absolute top-0 left-0 right-0 bg-white rounded-b-xl p-4 mx-2 shadow-lg"
        onClick={nextFaqPage}
      >
        <div className="flex items-start gap-3">
          <div className="bg-blue-200 text-blue-800 rounded-lg p-2 font-bold">
            FAQ
          </div>
          <div className="text-right flex-1">
            <h3 className="font-bold text-lg">الاسئله المتكرره</h3>
            <p className="text-sm text-gray-600">
              {faqPages[activeFaqPage]}
            </p>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-1 mt-2">
          {faqPages.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeFaqPage ? "bg-blue-900" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Background Decorative Shape */}
      <div className="absolute bottom-1/4 right-5 text-blue-900 opacity-20">
        <svg width="100" height="120" viewBox="0 0 100 120" className="fill-current">
          <path d="M90,40 C85,20 75,10 60,5 C45,0 30,10 25,15 C20,20 15,30 20,45 C25,60 35,70 30,85 C25,100 15,110 5,115 C0,117 0,120 5,120 C15,120 30,115 40,105 C50,95 55,90 65,95 C75,100 85,95 95,85 C105,75 95,60 90,40 Z" />
        </svg>
      </div>

      {/* User Info Badge */}
      <div className="absolute top-24 left-0 right-0 flex justify-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold">
          {user?.track === 'literary' ? 'القسم الأدبي' : 'القسم العلمي'} | {user?.name}
        </div>
      </div>

      {/* Wavy Background Patterns */}
      <div className="absolute w-full h-1/3 bottom-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,20 350,50 500,50 C650,50 700,0 850,80 C1000,160 1100,0 1200,0 L1200,120 L0,120 Z" className="fill-blue-400"></path>
        </svg>
      </div>
      <div className="absolute w-full h-1/3 bottom-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,20 C150,80 350,0 500,40 C650,80 700,10 850,30 C1000,50 1100,0 1200,20 L1200,120 L0,120 Z" className="fill-blue-500"></path>
        </svg>
      </div>

      {/* Connect the Levels with Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path 
          d="M 20% 68% Q 35% 40% 50% 20% Q 65% 40% 80% 68%" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth="3" 
          fill="none" 
          strokeDasharray="5,5"
        />
      </svg>

      {/* Level Icons */}
      <div className="relative h-full">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            className={`absolute ${level.position}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="relative flex flex-col items-center">
              <div 
                className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl
                            bg-gradient-to-b ${level.color} 
                            border-4 ${level.borderColor} shadow-lg
                            ${!level.locked ? 'cursor-pointer hover:scale-110 transition-transform' : 'opacity-70'}`}
                onClick={() => handleLevelClick(level)}
              >
                <span>{level.icon}</span>
                {level.locked && (
                  <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center">
                    <Lock size={24} className="text-white" />
                  </div>
                )}
              </div>
              
              <div className="mt-2 flex items-center gap-1 text-white font-bold text-xl">
                {level.name}
                {level.locked && <Lock size={16} className="text-white" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-t-xl">
        <div className="flex justify-around items-center p-2">
          <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center p-2 text-blue-800">
            <Home size={24} />
            <span className="text-xs mt-1">الرئيسية</span>
          </button>
          
          <button onClick={() => navigate('/levels')} className="flex flex-col items-center p-2 text-gray-600">
            <Book size={24} />
            <span className="text-xs mt-1">الدروس</span>
          </button>
          
          <button onClick={() => {
            toast({
              title: "قريباً",
              description: "سيتم إضافة هذه الميزة قريباً",
            });
          }} className="flex flex-col items-center p-2 text-gray-600">
            <MessageSquare size={24} />
            <span className="text-xs mt-1">الدردشة</span>
          </button>
          
          <button onClick={() => {
            toast({
              title: "قريباً",
              description: "سيتم إضافة هذه الميزة قريباً",
            });
          }} className="flex flex-col items-center p-2 text-gray-600">
            <Award size={24} />
            <span className="text-xs mt-1">المتصدرين</span>
          </button>
          
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center p-2 text-gray-600">
            <User size={24} />
            <span className="text-xs mt-1">الملف الشخصي</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
