
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Play, CheckCircle, BookOpen, MessageCircle, AlignJustify } from "lucide-react";

// Mock course data
const getCourseData = (id: string) => {
  return {
    id: parseInt(id),
    title: "الرياضيات الأساسية",
    description: "تعلم المفاهيم الأساسية في الرياضيات واكتسب المهارات اللازمة لحل المشكلات الرياضية",
    progress: 60,
    level: "المستوى البرونزي",
    lessons: [
      {
        id: 1,
        title: "المعادلات الخطية",
        duration: "15 دقيقة",
        completed: true,
        videoUrl: "https://www.youtube.com/embed/videoId1"
      },
      {
        id: 2,
        title: "المعادلات التربيعية",
        duration: "12 دقيقة",
        completed: true,
        videoUrl: "https://www.youtube.com/embed/videoId2"
      },
      {
        id: 3,
        title: "حل المعادلات",
        duration: "20 دقيقة",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/videoId3"
      },
      {
        id: 4,
        title: "التمثيل البياني",
        duration: "18 دقيقة",
        completed: false,
        videoUrl: "https://www.youtube.com/embed/videoId4"
      }
    ],
    quiz: [
      {
        id: 1,
        question: "ما هو الحل للمعادلة: 2x + 5 = 15؟",
        options: ["x = 5", "x = 10", "x = 15", "x = 20"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "أي من المعادلات التالية هي معادلة تربيعية؟",
        options: ["y = 2x + 1", "y = x²", "y = 3/x", "y = 2^x"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "ما هو الحل للمعادلة: x² - 4 = 0؟",
        options: ["x = 2", "x = ±2", "x = 4", "x = ±4"],
        correctAnswer: 1
      }
    ]
  };
};

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("lessons");
  const [currentLesson, setCurrentLesson] = useState(0);
  
  if (!id) {
    return <div>Course ID not found</div>;
  }
  
  const courseData = getCourseData(id);
  const selectedLesson = courseData.lessons[currentLesson];

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
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate("/levels")}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">{courseData.title}</h1>
              </div>
              <p className="text-muted-foreground mt-2">{courseData.description}</p>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              {courseData.level}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex-1 mr-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">التقدم في الدورة</span>
                <span className="text-sm font-medium">{courseData.progress}%</span>
              </div>
              <Progress value={courseData.progress} className="h-2" />
            </div>
          </div>
          
          <Tabs defaultValue="lessons" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="lessons" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>الدروس</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <AlignJustify className="h-4 w-4" />
                <span>اختبار</span>
              </TabsTrigger>
              <TabsTrigger value="discussion" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>نقاش</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="lessons" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{selectedLesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black rounded-md flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="icon" className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary">
                        <Play className="h-8 w-8 fill-white text-white" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentLesson(prev => Math.max(0, prev - 1))}
                    disabled={currentLesson === 0}
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    الدرس السابق
                  </Button>
                  <Button
                    onClick={() => setCurrentLesson(prev => Math.min(courseData.lessons.length - 1, prev + 1))}
                    disabled={currentLesson === courseData.lessons.length - 1}
                  >
                    الدرس التالي
                    <ChevronLeft className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="space-y-3">
                <h3 className="font-semibold">قائمة الدروس</h3>
                {courseData.lessons.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    className={`flex items-center justify-between p-4 rounded-md ${
                      index === currentLesson 
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-card hover:bg-primary/5 cursor-pointer'
                    }`}
                    onClick={() => setCurrentLesson(index)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium flex items-center gap-2">
                        {lesson.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {lesson.title}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="quiz" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>اختبار المفاهيم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {courseData.quiz.map((item) => (
                    <div key={item.id} className="space-y-3">
                      <h3 className="font-medium">{item.question}</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {item.options.map((option, index) => (
                          <div 
                            key={index}
                            className="flex items-center space-x-2 space-x-reverse rtl:space-x-reverse p-3 border rounded-md hover:bg-secondary/50 cursor-pointer"
                          >
                            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">إرسال الإجابات</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>منتدى النقاش</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-12">
                    ستتمكن قريبًا من مناقشة الدروس مع زملائك في الدراسة
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Course;
