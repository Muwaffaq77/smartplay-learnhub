
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, MessageSquare } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import PageLayout from "@/components/layout/PageLayout";

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
      description: "البداية الأولى في رحلة التعلم"
    },
    {
      id: "silver",
      name: "فضي",
      color: "from-gray-300 to-gray-400",
      borderColor: "border-gray-400",
      icon: "🥈",
      locked: user?.level < 2,
      description: "تعزيز المهارات الأساسية"
    },
    {
      id: "gold",
      name: "ذهبي",
      color: "from-yellow-400 to-yellow-500",
      borderColor: "border-yellow-500",
      icon: "🥇",
      locked: user?.level < 3,
      description: "التعمق في المفاهيم المتوسطة"
    },
    {
      id: "diamond",
      name: "ماسي",
      color: "from-blue-300 to-blue-400",
      borderColor: "border-blue-400",
      icon: "💎",
      locked: user?.level < 4,
      description: "إتقان المهارات المتقدمة"
    },
    {
      id: "legendary",
      name: "أسطوري",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-400",
      icon: "👑",
      locked: user?.level < 5,
      description: "اكتساب المهارات المتخصصة"
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
    navigate(`/levels/${level.id}`);
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
    <PageLayout withoutPadding>
      <div className="relative min-h-screen w-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-900">
        {/* FAQ Banner */}
        <div 
          className="absolute top-0 left-0 right-0 bg-white rounded-b-xl p-4 mx-2 shadow-lg z-10"
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

        {/* User Info Badge */}
        <div className="absolute top-24 left-0 right-0 flex justify-center">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-bold">
            {user?.track === 'literary' ? 'القسم الأدبي' : 'القسم العلمي'} | {user?.name}
          </div>
        </div>

        {/* Stacked Levels */}
        <div className="relative pt-36 pb-20 px-4">
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`w-full rounded-xl shadow-lg overflow-hidden ${
                  level.locked ? 'opacity-70' : ''
                }`}
                onClick={() => handleLevelClick(level)}
              >
                <div className={`p-4 bg-gradient-to-r ${level.color} relative`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl 
                      border-4 ${level.borderColor} bg-white bg-opacity-20 backdrop-blur-sm`}
                    >
                      <span>{level.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold">{level.name}</h3>
                      <p className="text-white text-sm opacity-80">{level.description}</p>
                    </div>
                    {level.locked && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <Lock size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-30"
          onClick={() => navigate('/chat')}
        >
          <MessageSquare size={24} />
        </motion.button>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
