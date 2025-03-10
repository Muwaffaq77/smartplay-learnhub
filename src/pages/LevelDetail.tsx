
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, ChevronRight, BookOpen, Beaker, Language, BookText, History, Map, Atom, Palette, AlertTriangle } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const LevelDetail = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const levelsData = {
    bronze: {
      id: "bronze",
      name: "المستوى البرونزي",
      color: "from-amber-600 to-amber-700",
      borderColor: "border-amber-500",
      textColor: "text-amber-800",
      bgColor: "bg-amber-50",
      icon: "🏆",
    },
    silver: {
      id: "silver",
      name: "المستوى الفضي",
      color: "from-gray-300 to-gray-400",
      borderColor: "border-gray-400",
      textColor: "text-gray-800",
      bgColor: "bg-gray-50",
      icon: "🥈",
    },
    gold: {
      id: "gold",
      name: "المستوى الذهبي",
      color: "from-yellow-400 to-yellow-500",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-800",
      bgColor: "bg-yellow-50",
      icon: "🥇",
    },
    diamond: {
      id: "diamond",
      name: "المستوى الماسي",
      color: "from-blue-300 to-blue-400",
      borderColor: "border-blue-400",
      textColor: "text-blue-800",
      bgColor: "bg-blue-50",
      icon: "💎",
    },
    legendary: {
      id: "legendary",
      name: "المستوى الأسطوري",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-purple-400",
      textColor: "text-purple-800",
      bgColor: "bg-purple-50",
      icon: "👑",
    }
  };

  // المواد حسب التخصص
  const commonSubjects = [
    { id: "arabic", name: "اللغة العربية", icon: <BookText className="h-5 w-5" />, color: "bg-red-100 text-red-700" },
    { id: "english", name: "اللغة الإنجليزية", icon: <Language className="h-5 w-5" />, color: "bg-blue-100 text-blue-700" },
    { id: "islamic", name: "التربية الإسلامية", icon: <BookOpen className="h-5 w-5" />, color: "bg-green-100 text-green-700" },
  ];

  const literarySubjects = [
    { id: "geography", name: "الجغرافيا", icon: <Map className="h-5 w-5" />, color: "bg-yellow-100 text-yellow-700" },
    { id: "history", name: "التاريخ", icon: <History className="h-5 w-5" />, color: "bg-orange-100 text-orange-700" },
  ];

  const scientificSubjects = [
    { id: "chemistry", name: "الكيمياء", icon: <Beaker className="h-5 w-5" />, color: "bg-purple-100 text-purple-700" },
    { id: "physics", name: "الفيزياء", icon: <Atom className="h-5 w-5" />, color: "bg-indigo-100 text-indigo-700" },
  ];

  const optionalSubjects = [
    { id: "arts", name: "الفنون", icon: <Palette className="h-5 w-5" />, color: "bg-pink-100 text-pink-700" },
    { id: "biology", name: "الأحياء", icon: <AlertTriangle className="h-5 w-5" />, color: "bg-teal-100 text-teal-700" }
  ];

  const level = levelsData[levelId];
  
  if (!level) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubjectClick = (subjectId) => {
    navigate(`/subject/${levelId}/${subjectId}`);
  };

  const getSubjects = () => {
    let subjects = [...commonSubjects];
    
    if (user?.track === 'literary') {
      subjects = [...subjects, ...literarySubjects];
    } else {
      subjects = [...subjects, ...scientificSubjects];
    }
    
    return [...subjects, ...optionalSubjects];
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-2xl">{level.icon}</span>
                {level.name}
              </h1>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${level.bgColor}`}>
            <div className="font-medium">المواد الدراسية</div>
            <p className="text-sm text-gray-600">اختر المادة التي ترغب بدراستها</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {getSubjects().map((subject) => (
              <motion.div
                key={subject.id}
                whileHover={{ scale: 1.03 }}
                className="cursor-pointer"
                onClick={() => handleSubjectClick(subject.id)}
              >
                <Card className="overflow-hidden h-full">
                  <CardHeader className={`${subject.color} p-4`}>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {subject.icon}
                      {subject.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="px-2 py-1">
                        <Book className="h-3 w-3 mr-1" />
                        <span>6 دروس</span>
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default LevelDetail;
