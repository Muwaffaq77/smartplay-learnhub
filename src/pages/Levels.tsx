
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lock, Unlock, Trophy, Star } from "lucide-react";

const levels = [
  {
    id: 1,
    name: "المستوى البرونزي",
    description: "البداية الأولى في رحلة التعلم",
    progress: 100,
    completed: true,
    unlocked: true,
    courses: [
      { id: 101, name: "أساسيات الرياضيات", completed: true },
      { id: 102, name: "القواعد اللغوية", completed: true },
      { id: 103, name: "مقدمة في العلوم", completed: true }
    ]
  },
  {
    id: 2,
    name: "المستوى الفضي",
    description: "تعزيز المهارات الأساسية",
    progress: 65,
    completed: false,
    unlocked: true,
    courses: [
      { id: 201, name: "الجبر المتوسط", completed: true },
      { id: 202, name: "قواعد النحو المتقدمة", completed: true },
      { id: 203, name: "الفيزياء الأساسية", completed: false }
    ]
  },
  {
    id: 3,
    name: "المستوى الذهبي",
    description: "التعمق في المفاهيم المتوسطة",
    progress: 0,
    completed: false,
    unlocked: false,
    courses: [
      { id: 301, name: "التفاضل والتكامل", completed: false },
      { id: 302, name: "البلاغة والأدب", completed: false },
      { id: 303, name: "الكيمياء العضوية", completed: false }
    ]
  },
  {
    id: 4,
    name: "المستوى الماسي",
    description: "إتقان المهارات المتقدمة",
    progress: 0,
    completed: false,
    unlocked: false,
    courses: [
      { id: 401, name: "الإحصاء والاحتمالات", completed: false },
      { id: 402, name: "تحليل النصوص", completed: false },
      { id: 403, name: "الأحياء المتقدمة", completed: false }
    ]
  },
  {
    id: 5,
    name: "المستوى الأسطوري",
    description: "اكتساب المهارات المتخصصة",
    progress: 0,
    completed: false,
    unlocked: false,
    courses: [
      { id: 501, name: "الهندسة التحليلية", completed: false },
      { id: 502, name: "النقد الأدبي", completed: false },
      { id: 503, name: "الفيزياء الحديثة", completed: false }
    ]
  }
];

const Levels = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">المستويات التعليمية</h1>
              <p className="text-muted-foreground mt-2">اختر المستوى المناسب لك واستمر في رحلة التعلم</p>
            </div>
            <Badge variant="outline" className="px-3 py-1 text-sm flex items-center gap-2">
              <Trophy size={16} className="text-yellow-500" />
              <span>المستوى الحالي: الفضي</span>
            </Badge>
          </div>

          <div className="grid gap-6">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden ${level.unlocked ? '' : 'opacity-70'}`}>
                  <CardHeader className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {level.name}
                          {level.completed && (
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          )}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                      </div>
                      <div className="text-2xl font-bold">
                        {level.unlocked ? (
                          <Unlock className="h-6 w-6 text-green-500" />
                        ) : (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">التقدم</span>
                        <span className="text-sm font-medium">{level.progress}%</span>
                      </div>
                      <Progress value={level.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      <h3 className="font-semibold text-sm">الدروس:</h3>
                      {level.courses.map((course) => (
                        <div 
                          key={course.id}
                          className="flex items-center justify-between p-3 bg-secondary/50 rounded-md"
                        >
                          <span className="font-medium">{course.name}</span>
                          {course.completed ? (
                            <Badge className="bg-green-500">مكتمل</Badge>
                          ) : (
                            <Badge variant="outline">قيد التقدم</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t bg-muted/20 p-4">
                    <Button 
                      onClick={() => level.unlocked && navigate(`/course/${level.courses[0].id}`)}
                      disabled={!level.unlocked}
                      variant={level.completed ? "outline" : "default"}
                    >
                      {level.completed ? "مراجعة" : level.unlocked ? "متابعة" : "مقفل"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Levels;
