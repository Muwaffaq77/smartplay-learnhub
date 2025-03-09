
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";
import { Check, Loader2, BookText, Flask } from "lucide-react";

const OnboardingPage = () => {
  const [name, setName] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<'literary' | 'scientific' | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { completeOnboarding } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسمك",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTrack) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار القسم الدراسي",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Complete onboarding and save data
      completeOnboarding(name, selectedTrack);
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ البيانات، الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-800 via-blue-600 to-blue-900 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 shadow-lg"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">أهلاً بك في SmartPlay</h1>
            <p className="text-blue-100">لنكمل إعداد حسابك</p>
          </motion.div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">الاسم</Label>
            <Input
              id="name"
              placeholder="أدخل اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white bg-opacity-20 text-white placeholder:text-gray-300 border-0"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white block mb-3">اختر القسم الدراسي</Label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg flex flex-col items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 transition-all border-2 ${
                  selectedTrack === 'literary' ? 'border-blue-300' : 'border-transparent'
                }`}
                onClick={() => setSelectedTrack('literary')}
              >
                <BookText size={40} className="text-white mb-2" />
                <span className="text-white font-bold">القسم الأدبي</span>
                {selectedTrack === 'literary' && (
                  <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg flex flex-col items-center justify-center bg-white bg-opacity-20 hover:bg-opacity-30 transition-all border-2 ${
                  selectedTrack === 'scientific' ? 'border-blue-300' : 'border-transparent'
                }`}
                onClick={() => setSelectedTrack('scientific')}
              >
                <Flask size={40} className="text-white mb-2" />
                <span className="text-white font-bold">القسم العلمي</span>
                {selectedTrack === 'scientific' && (
                  <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </motion.button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <span>متابعة</span>
            )}
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
