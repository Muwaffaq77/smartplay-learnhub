
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import { Facebook, Mail, Send, Loader2 } from "lucide-react";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  
  const { login, loginWithSocial } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال البريد الإلكتروني وكلمة المرور",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "فشل تسجيل الدخول",
        description: "تأكد من صحة البريد الإلكتروني وكلمة المرور",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      setIsVerifyingPhone(true);
    } catch (error) {
      toast({
        title: "فشل إنشاء الحساب",
        description: "حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhone = async (e) => {
    e.preventDefault();
    if (!phoneNumber || !otpCode) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم الهاتف ورمز التحقق",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      // Simulate OTP verification and account creation
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "فشل التحقق",
        description: "حدث خطأ أثناء التحقق من رقم الهاتف. الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(true);
      await loginWithSocial(provider);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "فشل تسجيل الدخول",
        description: `حدث خطأ أثناء تسجيل الدخول باستخدام ${provider}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-blue-deep mb-2">مرحبًا بك في SmartPlay</h1>
              <p className="text-gray-600">رحلة تعليمية ممتعة بانتظارك</p>
            </motion.div>
          </div>

          {isVerifyingPhone ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleVerifyPhone}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="أدخل رقم هاتفك"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="otpCode">رمز التحقق</Label>
                <Input
                  id="otpCode"
                  type="text"
                  placeholder="أدخل رمز التحقق"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                />
                <p className="text-sm text-gray-500">تم إرسال رمز التحقق إلى رقم هاتفك</p>
              </div>
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>جاري التحقق...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>تأكيد</span>
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsVerifyingPhone(false)}
                disabled={loading}
              >
                العودة
              </Button>
            </motion.form>
          ) : (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="register">إنشاء حساب</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleLogin}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <a href="#" className="text-sm text-blue-deep hover:underline">
                        نسيت كلمة المرور؟
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>جاري تسجيل الدخول...</span>
                      </>
                    ) : (
                      <span>تسجيل الدخول</span>
                    )}
                  </Button>
                </motion.form>
              </TabsContent>
              
              <TabsContent value="register">
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleRegister}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">البريد الإلكتروني</Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">كلمة المرور</Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="أدخل كلمة المرور مرة أخرى"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>جاري إنشاء الحساب...</span>
                      </>
                    ) : (
                      <span>إنشاء حساب</span>
                    )}
                  </Button>
                </motion.form>
              </TabsContent>
            </Tabs>
          )}

          {!isVerifyingPhone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-8"
            >
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-600">أو</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading}
                >
                  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  <span>متابعة باستخدام Google</span>
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loading}
                >
                  <Facebook size={18} />
                  <span>متابعة باستخدام Facebook</span>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Right side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block md:w-1/2 bg-blue-mid relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-waves bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-deep to-transparent opacity-80" />
        
        <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center max-w-md"
          >
            <h2 className="text-3xl font-bold mb-6">ابدأ رحلة التعلم والتفوق</h2>
            <p className="text-lg text-blue-100 mb-8">
              منصة تعليمية تفاعلية تجمع بين المرح والتعلم لمساعدتك على التفوق في الشهادة السودانية
            </p>
            
            <div className="grid grid-cols-1 gap-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold mb-2">5 مستويات تعليمية</h3>
                <p className="text-blue-100">من المستوى البرونزي وحتى الأسطوري</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold mb-2">مجتمع تفاعلي</h3>
                <p className="text-blue-100">تواصل مع الطلاب وتبادل المعرفة</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4"
              >
                <h3 className="text-xl font-semibold mb-2">محتوى مخصص</h3>
                <p className="text-blue-100">للقسمين العلمي والأدبي</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
