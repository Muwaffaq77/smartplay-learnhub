
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const levels = [
    {
      id: "A1",
      name: "A1",
      color: "from-cyan-300 to-cyan-400",
      borderColor: "border-cyan-400",
      icon: "👨‍🌾",
      locked: false,
      position: "bottom-32",
    },
    {
      id: "A2",
      name: "A2",
      color: "from-amber-300 to-amber-400",
      borderColor: "border-amber-400",
      icon: "🎸",
      locked: true,
      position: "bottom-80",
    },
    {
      id: "B1",
      name: "B1",
      color: "from-green-300 to-green-400",
      borderColor: "border-green-400",
      icon: "💃",
      locked: true,
      position: "bottom-[32rem]",
    },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-800 via-blue-600 to-blue-900">
      {/* FAQ Banner */}
      <div className="absolute top-0 left-0 right-0 bg-white rounded-b-xl p-4 mx-2 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="bg-blue-200 text-blue-800 rounded-lg p-2 font-bold">
            FAQ
          </div>
          <div className="text-right flex-1">
            <h3 className="font-bold text-lg">الاسئله المتكرره</h3>
            <p className="text-sm text-gray-600">
              يفضل مراجعتك للاسئله المتكرره قبل بدايه استخدام التطبيق
            </p>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-1 mt-2">
          <div className="w-2 h-2 rounded-full bg-blue-900"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Background Decorative Shape (Deer Silhouette) */}
      <div className="absolute bottom-1/4 right-5 text-blue-900 opacity-20">
        <svg width="100" height="120" viewBox="0 0 100 120" className="fill-current">
          <path d="M90,40 C85,20 75,10 60,5 C45,0 30,10 25,15 C20,20 15,30 20,45 C25,60 35,70 30,85 C25,100 15,110 5,115 C0,117 0,120 5,120 C15,120 30,115 40,105 C50,95 55,90 65,95 C75,100 85,95 95,85 C105,75 95,60 90,40 Z" />
        </svg>
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

      {/* Level Icons */}
      <div className="relative h-full">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            className={`absolute left-1/2 ${level.position} -translate-x-1/2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div className="relative flex flex-col items-center">
              <div 
                className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl
                            bg-gradient-to-b ${level.color} 
                            border-4 ${level.borderColor} shadow-lg`}
                onClick={() => !level.locked && navigate(`/levels/${level.id}`)}
              >
                <span>{level.icon}</span>
              </div>
              
              <div className="mt-2 flex items-center gap-1 text-white font-bold text-xl">
                {level.name}
                {level.locked && <Lock size={16} className="text-white" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
