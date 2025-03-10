
import React, { createContext, useContext, useState, useEffect } from 'react';

type Track = 'literary' | 'scientific';

interface Subject {
  id: string;
  progress: number;
  completedLessons: number[];
  totalQuestions: number;
  correctAnswers: number;
}

interface UserSubjects {
  [key: string]: Subject;  // مفتاح هو معرف المادة
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  track?: Track;
  level: number;
  stage: number;
  points: number;
  correctAnswers: number;
  totalAnswers: number;
  avatar?: string;
  subjects?: UserSubjects;
  streakDays?: number;
  lastActive?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithSocial: (provider: 'google' | 'facebook') => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setTrack: (track: Track) => void;
  isOnboarded: () => boolean;
  completeOnboarding: (name: string, track: Track) => void;
  updateSubjectProgress: (subjectId: string, lessonId: number, correct: number, total: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // تحقق مما إذا كان المستخدم مسجل الدخول عند تحميل الصفحة
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // محاكاة جلب بيانات المستخدم من التخزين المحلي
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // تحديث تاريخ آخر نشاط وأيام المتابعة المتتالية
  useEffect(() => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      if (user.lastActive !== today) {
        let updatedStreakDays = user.streakDays || 0;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (user.lastActive === yesterdayStr) {
          updatedStreakDays += 1;
        } else if (!user.lastActive) {
          updatedStreakDays = 1;
        } else {
          updatedStreakDays = 1; // إعادة تعيين أيام المتابعة إذا فات يوم
        }
        
        updateUser({
          lastActive: today,
          streakDays: updatedStreakDays,
        });
      }
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // محاكاة استدعاء API المصادقة
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // بيانات مستخدم وهمية
      const mockUser: User = {
        id: '1',
        name: '',
        email,
        level: 1,
        stage: 1,
        points: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        streakDays: 0,
        subjects: {},
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithSocial = async (provider: 'google' | 'facebook') => {
    try {
      setLoading(true);
      // محاكاة المصادقة الاجتماعية
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // بيانات مستخدم وهمية
      const mockUser: User = {
        id: '1',
        name: '',
        email: `user@${provider}.com`,
        level: 1,
        stage: 1,
        points: 0,
        correctAnswers: 0,
        totalAnswers: 0,
        streakDays: 0,
        subjects: {},
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error(`${provider} login error:`, error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const setTrack = (track: Track) => {
    if (user) {
      const updatedUser = { ...user, track };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const isOnboarded = () => {
    if (!user) return false;
    return !!(user.name && user.track);
  };

  const completeOnboarding = (name: string, track: Track) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        name, 
        track,
        subjects: {},
        lastActive: new Date().toISOString().split('T')[0],
        streakDays: 1,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateSubjectProgress = (subjectId: string, lessonId: number, correct: number, total: number) => {
    if (user) {
      const subjects = user.subjects || {};
      const subject = subjects[subjectId] || { 
        id: subjectId, 
        progress: 0, 
        completedLessons: [], 
        totalQuestions: 0,
        correctAnswers: 0
      };
      
      const newCompletedLessons = [...(subject.completedLessons || [])];
      if (!newCompletedLessons.includes(lessonId)) {
        newCompletedLessons.push(lessonId);
      }
      
      const updatedSubject = {
        ...subject,
        completedLessons: newCompletedLessons,
        totalQuestions: (subject.totalQuestions || 0) + total,
        correctAnswers: (subject.correctAnswers || 0) + correct,
        progress: Math.round((newCompletedLessons.length / 6) * 100), // افتراض 6 دروس لكل مادة
      };
      
      const updatedSubjects = {
        ...subjects,
        [subjectId]: updatedSubject
      };
      
      const totalCorrect = user.correctAnswers + correct;
      const totalAnswers = user.totalAnswers + total;
      
      updateUser({
        subjects: updatedSubjects,
        correctAnswers: totalCorrect,
        totalAnswers: totalAnswers,
        points: user.points + (correct * 10) // إضافة 10 نقاط لكل إجابة صحيحة
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        loginWithSocial,
        logout,
        updateUser,
        setTrack,
        isOnboarded,
        completeOnboarding,
        updateSubjectProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
