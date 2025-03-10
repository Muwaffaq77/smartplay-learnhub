
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Play, CheckCircle, Video, BookOpen, AlignJustify, Award } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SubjectDetail = () => {
  const { levelId, subjectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("lessons");
  const [currentLesson, setCurrentLesson] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  // تحديد فيديوهات يوتيوب حسب المادة - هذه مجرد عينة، يمكن تخصيصها
  const getYoutubeVideos = () => {
    switch(subjectId) {
      case 'arabic':
        return [
          { id: 1, videoId: "D85Q9JDHc8A", title: "اللغة العربية - البلاغة: علم البيان" },
          { id: 2, videoId: "1dLQu7OvzrI", title: "اللغة العربية - تطبيقات نحوية" },
          { id: 3, videoId: "EV3vQ3Z9_PM", title: "اللغة العربية - الفعل الماضي" }
        ];
      case 'physics':
        return [
          { id: 1, videoId: "QZOS_YnEhmo", title: "الفيزياء - قوانين نيوتن" },
          { id: 2, videoId: "J_yBgZdwCrk", title: "الفيزياء - الحركة الدورانية" },
          { id: 3, videoId: "M_r_s9GWnMg", title: "الفيزياء - الطاقة الميكانيكية" }
        ];
      case 'chemistry':
        return [
          { id: 1, videoId: "wPt5XPuKfmI", title: "الكيمياء - الجدول الدوري" },
          { id: 2, videoId: "2YrM5Y56Ylo", title: "الكيمياء - التفاعلات الكيميائية" },
          { id: 3, videoId: "mBvOIUvLQGU", title: "الكيمياء - الروابط الكيميائية" }
        ];
      case 'english':
        return [
          { id: 1, videoId: "3kRT2cV-9Gc", title: "اللغة الإنجليزية - قواعد الأزمنة" },
          { id: 2, videoId: "IUMh3dm4xYo", title: "اللغة الإنجليزية - المفردات الأساسية" },
          { id: 3, videoId: "I15GKXI5JsI", title: "اللغة الإنجليزية - الكتابة الإبداعية" }
        ];
      default:
        return [
          { id: 1, videoId: "D85Q9JDHc8A", title: "درس تعليمي 1" },
          { id: 2, videoId: "1dLQu7OvzrI", title: "درس تعليمي 2" },
          { id: 3, videoId: "EV3vQ3Z9_PM", title: "درس تعليمي 3" }
        ];
    }
  };

  // أسئلة الدرس الحالي
  const getQuizQuestions = () => {
    const videos = getYoutubeVideos();
    const currentVideo = videos[currentLesson];
    
    switch(currentVideo.id) {
      case 1:
        return [
          {
            id: 1,
            question: "ما هو الموضوع الرئيسي الذي تمت مناقشته في الفيديو؟",
            options: [
              "المفهوم الأساسي للمادة",
              "التطبيقات العملية",
              "النظريات المتقدمة",
              "تاريخ تطور المادة"
            ],
            correctAnswer: 0
          },
          {
            id: 2,
            question: "أي من العبارات التالية صحيحة بناءً على محتوى الفيديو؟",
            options: [
              "النظرية تنطبق على جميع الحالات",
              "هناك استثناءات محددة للنظرية",
              "النظرية غير قابلة للتطبيق عملياً",
              "النظرية تم إثباتها حديثاً فقط"
            ],
            correctAnswer: 1
          },
          {
            id: 3,
            question: "ما الخطوة الأولى في حل المسائل المتعلقة بهذا الموضوع؟",
            options: [
              "تحديد المعطيات",
              "اختيار القانون المناسب",
              "رسم الشكل التوضيحي",
              "التحقق من وحدات القياس"
            ],
            correctAnswer: 2
          }
        ];
      case 2:
        return [
          {
            id: 1,
            question: "ما النتيجة الأساسية التي توصل إليها الدرس؟",
            options: [
              "العلاقة طردية بين المتغيرات",
              "العلاقة عكسية بين المتغيرات",
              "لا توجد علاقة واضحة بين المتغيرات",
              "العلاقة غير خطية بين المتغيرات"
            ],
            correctAnswer: 3
          },
          {
            id: 2,
            question: "أي من التطبيقات التالية تم ذكرها في الفيديو؟",
            options: [
              "التطبيقات الصناعية",
              "التطبيقات الطبية",
              "التطبيقات التعليمية",
              "جميع ما سبق"
            ],
            correctAnswer: 3
          }
        ];
      default:
        return [
          {
            id: 1,
            question: "ما هو الموضوع الرئيسي الذي تمت مناقشته في الفيديو؟",
            options: [
              "المفهوم الأساسي للمادة",
              "التطبيقات العملية",
              "النظريات المتقدمة",
              "تاريخ تطور المادة"
            ],
            correctAnswer: 0
          },
          {
            id: 2,
            question: "أي من العبارات التالية صحيحة بناءً على محتوى الفيديو؟",
            options: [
              "النظرية تنطبق على جميع الحالات",
              "هناك استثناءات محددة للنظرية",
              "النظرية غير قابلة للتطبيق عملياً",
              "النظرية تم إثباتها حديثاً فقط"
            ],
            correctAnswer: 1
          }
        ];
    }
  };
  
  const videos = getYoutubeVideos();
  const currentVideo = videos[currentLesson];

  const subjectNames = {
    arabic: "اللغة العربية",
    english: "اللغة الإنجليزية",
    islamic: "التربية الإسلامية",
    physics: "الفيزياء",
    chemistry: "الكيمياء",
    geography: "الجغرافيا",
    history: "التاريخ",
    arts: "الفنون",
    biology: "الأحياء"
  };

  const handleVideoComplete = () => {
    setShowQuiz(true);
    setVideoPlaying(false);
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    const questions = getQuizQuestions();
    let correctCount = 0;
    let totalQuestions = questions.length;
    
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / totalQuestions) * 100);
    
    if (score >= 70) {
      toast({
        title: "أحسنت!",
        description: `لقد أجبت على ${correctCount} من ${totalQuestions} أسئلة بشكل صحيح.`,
      });
      
      if (currentLesson < videos.length - 1) {
        setCurrentLesson(currentLesson + 1);
      } else {
        toast({
          title: "تهانينا!",
          description: "لقد أكملت جميع دروس هذه المادة بنجاح.",
        });
        navigate(`/levels/${levelId}`);
      }
      
      setShowQuiz(false);
      setSelectedAnswers({});
    } else {
      toast({
        title: "حاول مرة أخرى",
        description: `تحتاج إلى 70% على الأقل للانتقال إلى الدرس التالي. حصلت على ${score}%.`,
        variant: "destructive"
      });
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate(`/levels/${levelId}`)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {subjectNames[subjectId] || subjectId}
              </h1>
              <p className="text-sm text-gray-600">
                تقدمك: {Math.round((currentLesson / videos.length) * 100)}%
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex-1 mr-4">
              <Progress value={Math.round((currentLesson / videos.length) * 100)} className="h-2" />
            </div>
          </div>
          
          <Tabs defaultValue="lessons" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="lessons" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>الفيديوهات</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>الملخصات</span>
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center gap-2">
                <AlignJustify className="h-4 w-4" />
                <span>الاختبارات</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="lessons" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{currentVideo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {showQuiz ? (
                    <div className="space-y-6 py-4">
                      <h3 className="font-bold text-lg">أسئلة على الدرس</h3>
                      
                      {getQuizQuestions().map((question) => (
                        <div key={question.id} className="space-y-3">
                          <h4 className="font-medium">{question.question}</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {question.options.map((option, index) => (
                              <div 
                                key={index}
                                className={`flex items-center space-x-2 space-x-reverse rtl:space-x-reverse p-3 border rounded-md cursor-pointer ${
                                  selectedAnswers[question.id] === index ? 'bg-primary/10 border-primary' : 'hover:bg-secondary/50'
                                }`}
                                onClick={() => handleAnswerSelect(question.id, index)}
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
                      
                      <Button 
                        className="w-full"
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length < getQuizQuestions().length}
                      >
                        <Award className="h-4 w-4 mr-2" />
                        تأكيد الإجابات
                      </Button>
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded-md overflow-hidden">
                      {videoPlaying ? (
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1`}
                          title={currentVideo.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative bg-gray-900">
                          <img
                            src={`https://img.youtube.com/vi/${currentVideo.videoId}/hqdefault.jpg`}
                            alt={currentVideo.title}
                            className="w-full h-full object-cover opacity-60"
                          />
                          <Button
                            size="lg"
                            className="absolute h-16 w-16 rounded-full"
                            onClick={() => setVideoPlaying(true)}
                          >
                            <Play className="h-8 w-8" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      if (!showQuiz) {
                        setCurrentLesson(prev => Math.max(0, prev - 1));
                        setVideoPlaying(false);
                      }
                    }}
                    disabled={currentLesson === 0 || showQuiz}
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    الدرس السابق
                  </Button>
                  
                  {!showQuiz && (
                    <Button
                      onClick={handleVideoComplete}
                    >
                      الانتقال للاختبار
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              <div className="space-y-3">
                <h3 className="font-semibold">قائمة الدروس</h3>
                {videos.map((video, index) => (
                  <div 
                    key={video.id}
                    className={`flex items-center justify-between p-4 rounded-md ${
                      index === currentLesson 
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-card hover:bg-primary/5 cursor-pointer'
                    }`}
                    onClick={() => {
                      if (!showQuiz) {
                        setCurrentLesson(index);
                        setVideoPlaying(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium flex items-center gap-2">
                        {index < currentLesson && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {video.title}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">4:30</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ملخصات الدروس</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-12">
                    ستتوفر ملخصات الدروس قريبًا
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="quizzes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>الاختبارات العامة</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-12">
                    ستتوفر اختبارات شاملة للمادة قريبًا
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

export default SubjectDetail;
