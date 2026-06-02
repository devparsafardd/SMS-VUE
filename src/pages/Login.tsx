import { useState } from 'react';
import { GraduationCap, Eye, EyeOff, Phone, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { UserRole } from '../types';

const demoRoles: { label: string; role: UserRole; desc: string }[] = [
  { label: 'مدیر مدرسه', role: 'school_admin', desc: 'دسترسی کامل' },
  { label: 'معلم', role: 'teacher', desc: 'کلاس‌داری و نمرات' },
  { label: 'حسابدار', role: 'accountant', desc: 'مدیریت مالی' },
  { label: 'دانش‌آموز', role: 'student', desc: 'پورتال دانش‌آموزی' },
  { label: 'والدین', role: 'parent', desc: 'مشاهده وضعیت فرزند' },
  { label: 'مدیرکل', role: 'superadmin', desc: 'مدیریت همه مدارس' },
];

export default function Login() {
  const { setIsLoggedIn, setCurrentPage, setUserRole } = useApp();
  const [phone, setPhone] = useState('09121234567');
  const [pass, setPass] = useState('123456');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('school_admin');

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUserRole(selectedRole);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }, 800);
  };

  const handleDemoLogin = (role: UserRole) => {
    setSelectedRole(role);
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-4">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">سامانه مدیریت مدرسه</h1>
          <p className="text-blue-200 text-sm mt-1">نسخه ۱.۰ - سال تحصیلی ۱۴۰۳-۱۴۰۴</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6">
            {step === 'login' ? (
              <>
                <h2 className="text-lg font-bold text-gray-900 mb-5">ورود به سیستم</h2>
                <div className="space-y-4">
                  <Input
                    label="شماره موبایل / کد ملی"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="09XXXXXXXXX"
                    icon={<Phone size={16} />}
                    type="tel"
                  />
                  <div>
                    <Input
                      label="رمز عبور"
                      value={pass}
                      onChange={e => setPass(e.target.value)}
                      placeholder="رمز عبور"
                      icon={
                        <button type="button" onClick={() => setShowPass(!showPass)} className="cursor-pointer">
                          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      }
                      type={showPass ? 'text' : 'password'}
                    />
                    <div className="flex justify-between mt-1">
                      <button className="text-xs text-blue-600 hover:underline">فراموشی رمز عبور</button>
                      <button className="text-xs text-gray-500 hover:underline">ورود با رمز یکبارمصرف</button>
                    </div>
                  </div>
                  <Button onClick={handleLogin} loading={loading} className="w-full justify-center" size="lg">
                    ورود
                    <ChevronLeft size={16} />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold text-gray-900 mb-2">تأیید هویت دو مرحله‌ای</h2>
                <p className="text-sm text-gray-500 mb-5">کد ۶ رقمی به شماره {phone} ارسال شد</p>
                <div className="space-y-4">
                  <Input
                    label="کد تأیید"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="- - - - - -"
                    className="text-center text-xl tracking-widest"
                    maxLength={6}
                  />
                  <Button onClick={handleOtp} loading={loading} className="w-full justify-center" size="lg">
                    تأیید و ورود
                  </Button>
                  <button onClick={() => setStep('login')} className="w-full text-sm text-gray-500 hover:text-gray-700">
                    بازگشت
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Demo Roles */}
          <div className="bg-gray-50 border-t border-gray-100 p-4">
            <p className="text-xs text-gray-400 text-center mb-3">ورود سریع (نسخه آزمایشی)</p>
            <div className="grid grid-cols-2 gap-2">
              {demoRoles.map(r => (
                <button
                  key={r.role}
                  onClick={() => handleDemoLogin(r.role)}
                  className="text-right bg-white border border-gray-200 rounded-lg p-2.5 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-xs font-medium text-gray-800">{r.label}</p>
                  <p className="text-xs text-gray-400">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
