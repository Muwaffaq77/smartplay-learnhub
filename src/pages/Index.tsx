
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import PageLayout from "@/components/layout/PageLayout";
import { 
  GraduationCap, 
  Trophy, 
  Users, 
  BookOpen, 
  Star, 
  MessageCircle,
  ChevronRight
} from "lucide-react";

const Hero = () => {
  const { isAuthenticated } = useUser();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <div 
      ref={targetRef}
      className="relative h-screen bg-gradient-to-b from-blue-deep via-blue-mid to-blue-light flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/lovable-uploads/49d49003-c508-45f4-b204-29ddc0fa8b82.png')", backgroundSize: "cover" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
            }}
            animate={{
              y: [0, -(Math.random() * 100 + 50)],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ opacity, scale, y }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          SmartPlay - تعلم، العب، تفوق
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          منصة تعليمية تفاعلية لطلاب الشهادة السودانية تجمع بين التعلم والمرح في تجربة متكاملة
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg" className="group">
                انتقل إلى المنصة
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/auth">
                <Button size="lg" className="group">
                  ابدأ التعلم الآن
                  <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-deep transition-all duration-300">
                  اكتشف المزيد
                </Button>
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        }}
        onClick={() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center pt-2">
          <motion.div 
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-full bg-blue-light bg-opacity-20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-deep mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout withoutPadding>
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-blue-deep mb-4">مميزات منصة SmartPlay</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">اكتشف كيف يمكن لمنصتنا أن تساعدك في تحقيق التفوق الدراسي من خلال مجموعة من الميزات المبتكرة</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<GraduationCap size={28} className="text-blue-deep" />}
              title="تعلم تفاعلي"
              description="دروس فيديو شاملة ومحتوى تعليمي متميز يغطي منهج الشهادة السودانية بطريقة مبسطة وجذابة"
              delay={0.1}
            />
            <FeatureCard 
              icon={<Trophy size={28} className="text-blue-deep" />}
              title="نظام المستويات"
              description="تقدم عبر 5 مستويات تعليمية متدرجة الصعوبة، مع مكافآت وشارات تحفز على الاستمرار والتفوق"
              delay={0.2}
            />
            <FeatureCard 
              icon={<Users size={28} className="text-blue-deep" />}
              title="مجتمع تفاعلي"
              description="تواصل مع زملائك الطلاب، تبادل المعرفة، وشارك في غرف الدردشة التعليمية لمناقشة الدروس"
              delay={0.3}
            />
            <FeatureCard 
              icon={<BookOpen size={28} className="text-blue-deep" />}
              title="محتوى مخصص"
              description="محتوى تعليمي مصمم خصيصًا حسب القسم الدراسي، سواء كنت في القسم الأدبي أو العلمي"
              delay={0.4}
            />
            <FeatureCard 
              icon={<Star size={28} className="text-blue-deep" />}
              title="التحديات والأسئلة"
              description="اختبر معرفتك من خلال مجموعة متنوعة من الأسئلة والتحديات التي تعزز فهمك للمواد الدراسية"
              delay={0.5}
            />
            <FeatureCard 
              icon={<MessageCircle size={28} className="text-blue-deep" />}
              title="كن أستاذًا"
              description="عند وصولك للمستوى الخامس، يمكنك الانضمام لفريق الأساتذة وإضافة أسئلة جديدة ومساعدة زملائك"
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-blue-deep mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">رحلة تعليمية متكاملة من التسجيل وحتى التفوق، بخطوات بسيطة ومرنة</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-deep text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-blue-deep mb-2">التسجيل والإعداد</h3>
              <p className="text-gray-600">سجل دخولك، اختر القسم الدراسي المناسب، وابدأ رحلتك التعليمية</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-deep text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-blue-deep mb-2">تعلم وتفاعل</h3>
              <p className="text-gray-600">شاهد الدروس، أجب على الأسئلة، وتفاعل مع زملائك في غرف الدردشة</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-deep text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-blue-deep mb-2">ارتقِ وتطور</h3>
              <p className="text-gray-600">انتقل عبر المستويات، اجمع النقاط والشارات، وصولاً إلى مستوى الأستاذية</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-deep to-blue-mid text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ رحلة التعلم والتفوق الآن</h2>
            <p className="text-xl text-blue-100 mb-10">انضم إلى الآلاف من الطلاب الذين يحققون نتائج مميزة مع منصة SmartPlay</p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="bg-white text-blue-deep hover:bg-blue-50 transition-colors">
                سجل الآن مجانًا
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
