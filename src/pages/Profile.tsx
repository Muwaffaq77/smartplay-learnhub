
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart, Trophy, Users, Award, BookOpen, Clock } from "lucide-react";

const Profile = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="flex flex-col items-center text-center pb-2">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl">أحمد محمد</CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">طالب في القسم العلمي</div>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Badge variant="outline" className="px-3 py-1 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span>المستوى الفضي</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">التقدم للمستوى التالي</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-md p-3 text-center">
                        <div className="text-2xl font-bold">42</div>
                        <div className="text-xs text-muted-foreground">الأسئلة المجابة</div>
                      </div>
                      <div className="bg-muted rounded-md p-3 text-center">
                        <div className="text-2xl font-bold">7</div>
                        <div className="text-xs text-muted-foreground">الدورات المكتملة</div>
                      </div>
                      <div className="bg-muted rounded-md p-3 text-center">
                        <div className="text-2xl font-bold">3550</div>
                        <div className="text-xs text-muted-foreground">مجموع النقاط</div>
                      </div>
                      <div className="bg-muted rounded-md p-3 text-center">
                        <div className="text-2xl font-bold">14</div>
                        <div className="text-xs text-muted-foreground">أيام متتالية</div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">تعديل الملف الشخصي</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    الإنجازات
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">مستكشف المعرفة</div>
                      <div className="text-xs text-muted-foreground">أكملت 5 دورات تعليمية</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">المثابر</div>
                      <div className="text-xs text-muted-foreground">قمت بالدراسة 10 أيام متتالية</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">المتفاعل</div>
                      <div className="text-xs text-muted-foreground">شاركت في 3 مناقشات</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-2/3">
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="stats" className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    <span>الإحصائيات</span>
                  </TabsTrigger>
                  <TabsTrigger value="courses" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>الدورات</span>
                  </TabsTrigger>
                  <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>المتصدرين</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="stats" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">نشاطك الأسبوعي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-muted-foreground">رسم بياني لنشاطك الأسبوعي</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          الوقت المستغرق في التعلم
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">24.5 ساعة</div>
                        <p className="text-sm text-muted-foreground">14% أعلى من الأسبوع الماضي</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          نسبة الإجابات الصحيحة
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2">78%</div>
                        <p className="text-sm text-muted-foreground">42 سؤال من أصل 54</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="courses" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">الدورات المكتملة</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                              <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium">أساسيات الرياضيات</div>
                              <div className="text-xs text-muted-foreground">المستوى البرونزي</div>
                            </div>
                          </div>
                          <Badge>100%</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                              <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium">القواعد اللغوية</div>
                              <div className="text-xs text-muted-foreground">المستوى البرونزي</div>
                            </div>
                          </div>
                          <Badge>100%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">الدورات الجارية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium">الفيزياء الأساسية</div>
                              <div className="text-xs text-muted-foreground">المستوى الفضي</div>
                            </div>
                          </div>
                          <Badge variant="outline">65%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="leaderboard" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">المتصدرون في المستوى الفضي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="text-xl font-bold w-6 text-center">1</div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
                              <AvatarFallback>SM</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">سارة محمود</div>
                          </div>
                          <div className="font-bold">4120 نقطة</div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="text-xl font-bold w-6 text-center">2</div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User" />
                              <AvatarFallback>AM</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">أحمد محمد</div>
                          </div>
                          <div className="font-bold">3550 نقطة</div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="text-xl font-bold w-6 text-center">3</div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User" />
                              <AvatarFallback>RA</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">رانيا أحمد</div>
                          </div>
                          <div className="font-bold">3240 نقطة</div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="text-xl font-bold w-6 text-center">4</div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="User" />
                              <AvatarFallback>MY</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">محمد ياسر</div>
                          </div>
                          <div className="font-bold">2980 نقطة</div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="text-xl font-bold w-6 text-center">5</div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="User" />
                              <AvatarFallback>FH</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">فاطمة حسن</div>
                          </div>
                          <div className="font-bold">2750 نقطة</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Profile;
