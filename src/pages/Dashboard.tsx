
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>المستويات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">استكشف المستويات المختلفة وابدأ رحلة التعلم</p>
                <Button onClick={() => navigate("/levels")} className="w-full">
                  استعرض المستويات
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>الملف الشخصي</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">راجع تقدمك وإنجازاتك الشخصية</p>
                <Button onClick={() => navigate("/profile")} variant="outline" className="w-full">
                  الملف الشخصي
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle>الأسئلة اليومية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">تحدي يومي من الأسئلة لاختبار معرفتك</p>
                <Button variant="secondary" className="w-full">
                  ابدأ التحدي
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">آخر نشاطاتك</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">أكملت درس الرياضيات</h3>
                      <p className="text-sm text-muted-foreground">المستوى الأول: الدرس 2</p>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ ساعتين</span>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">أجبت على 5 أسئلة</h3>
                      <p className="text-sm text-muted-foreground">4 إجابات صحيحة</p>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ 3 ساعات</span>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">ترقيت إلى المستوى البرونزي</h3>
                      <p className="text-sm text-muted-foreground">أحسنت!</p>
                    </div>
                    <span className="text-sm text-muted-foreground">منذ يوم واحد</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
