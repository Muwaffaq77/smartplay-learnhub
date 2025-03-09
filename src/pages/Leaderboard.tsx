import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy, Medal } from "lucide-react";
import { useState, useEffect } from "react";

// Mock data for leaderboard
const mockLeaderboardData = [
  { id: 1, name: "أحمد محمد", points: 2500, track: "scientific", avatar: "👨‍🔬" },
  { id: 2, name: "فاطمة علي", points: 2350, track: "literary", avatar: "👩‍🎨" },
  { id: 3, name: "محمد خالد", points: 2200, track: "scientific", avatar: "🧠" },
  { id: 4, name: "نور حسن", points: 2100, track: "literary", avatar: "📚" },
  { id: 5, name: "يوسف أحمد", points: 2000, track: "scientific", avatar: "🔍" },
  { id: 6, name: "سارة محمود", points: 1950, track: "literary", avatar: "✒️" },
  { id: 7, name: "عمر فاروق", points: 1900, track: "scientific", avatar: "⚗️" },
  { id: 8, name: "لينا كريم", points: 1850, track: "literary", avatar: "📝" },
  { id: 9, name: "خالد عبدالله", points: 1800, track: "scientific", avatar: "🧪" },
  { id: 10, name: "رنا سمير", points: 1750, track: "literary", avatar: "📖" },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'scientific' | 'literary'>('all');
  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboardData);

  // Filter data based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      setLeaderboardData(mockLeaderboardData);
    } else {
      setLeaderboardData(mockLeaderboardData.filter(user => user.track === activeTab));
    }
  }, [activeTab]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              المتصدرين
            </h1>
            
            <div className="flex rounded-md overflow-hidden border">
              <button 
                onClick={() => setActiveTab('all')} 
                className={`px-4 py-2 text-sm ${
                  activeTab === 'all' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background hover:bg-muted'
                }`}
              >
                الكل
              </button>
              <button 
                onClick={() => setActiveTab('scientific')} 
                className={`px-4 py-2 text-sm ${
                  activeTab === 'scientific' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background hover:bg-muted'
                }`}
              >
                القسم العلمي
              </button>
              <button 
                onClick={() => setActiveTab('literary')} 
                className={`px-4 py-2 text-sm ${
                  activeTab === 'literary' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background hover:bg-muted'
                }`}
              >
                القسم الأدبي
              </button>
            </div>
          </div>

          {/* Top 3 winners */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {leaderboardData.slice(0, 3).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${
                  index === 0 
                    ? 'col-span-1 order-2 transform translate-y-0' 
                    : index === 1 
                      ? 'col-span-1 order-1 transform -translate-y-4' 
                      : 'col-span-1 order-3 transform -translate-y-8'
                }`}
              >
                <Card className={`overflow-hidden border-t-8 ${
                  index === 1 
                    ? 'border-t-yellow-500' 
                    : index === 0 
                      ? 'border-t-gray-400' 
                      : 'border-t-amber-700'
                }`}>
                  <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-4xl">
                      {user.avatar}
                    </div>
                    <CardTitle className="mt-2">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {user.track === 'literary' ? 'القسم الأدبي' : 'القسم العلمي'}
                    </p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="font-bold text-2xl text-primary">
                      {user.points} نقطة
                    </div>
                    <div className="mt-2">
                      {index === 1 && (
                        <Trophy className="h-8 w-8 text-yellow-500 mx-auto" />
                      )}
                      {index === 0 && (
                        <Award className="h-8 w-8 text-gray-500 mx-auto" />
                      )}
                      {index === 2 && (
                        <Award className="h-8 w-8 text-amber-700 mx-auto" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Rest of the leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>قائمة المتصدرين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboardData.slice(3).map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xl">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.track === 'literary' ? 'القسم الأدبي' : 'القسم العلمي'}
                        </p>
                      </div>
                    </div>
                    <div className="font-bold">{user.points} نقطة</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Leaderboard;
