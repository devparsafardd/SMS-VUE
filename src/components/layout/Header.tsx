import { Bell, Search, Menu, ChevronDown, LogOut, Settings, User, Building2 } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { schools } from '../../data/mockData';
import { cn } from '../../utils/cn';

export default function Header() {
  const { user, setSidebarOpen, setIsLoggedIn, setCurrentPage, currentSchool, setCurrentSchool, sidebarOpen } = useApp();
  const [showUser, setShowUser] = useState(false);
  const [showSchools, setShowSchools] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: '1', text: 'علی رضایی غیبت غیرموجه ثبت کرد', time: '۱۰ دقیقه پیش', read: false },
    { id: '2', text: 'تیکت جدید از والدین احمدی', time: '۳۰ دقیقه پیش', read: false },
    { id: '3', text: 'نمرات ریاضی ثبت شد', time: '۱ ساعت پیش', read: true },
    { id: '4', text: 'پرداخت شهریه دریافت شد', time: '۲ ساعت پیش', read: true },
  ];
  const unread = notifications.filter(n => !n.read).length;

  const roleLabels: Record<string, string> = {
    school_admin: 'مدیر مدرسه',
    teacher: 'معلم',
    accountant: 'حسابدار',
    student: 'دانش‌آموز',
    parent: 'والدین',
    superadmin: 'مدیرکل',
    counselor: 'مشاور',
    librarian: 'کتابدار',
    transport_manager: 'مسئول سرویس',
    nutrition_manager: 'مسئول تغذیه',
    pta_manager: 'مسئول انجمن اولیا',
    edu_deputy: 'معاون آموزشی',
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 z-20 flex items-center justify-between px-4 gap-3"
      style={{ paddingRight: sidebarOpen ? '15.5rem' : '4rem' }}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden">
          <Menu size={20} />
        </button>

        {/* School switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowSchools(!showSchools); setShowUser(false); setShowNotif(false); }}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors"
          >
            <Building2 size={15} className="text-blue-600" />
            <span className="hidden sm:block max-w-32 truncate">{currentSchool}</span>
            <ChevronDown size={14} />
          </button>
          {showSchools && (
            <div className="absolute top-10 left-0 bg-white rounded-xl border border-gray-100 shadow-lg py-2 min-w-52 z-50">
              {schools.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setCurrentSchool(s.name); setShowSchools(false); }}
                  className={cn('w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-right', s.name === currentSchool && 'bg-blue-50')}
                >
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.level}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xs hidden md:block">
        <div className="relative">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg pr-9 pl-3 py-1.5 text-sm placeholder-gray-400 focus:outline-none transition-colors"
            placeholder="جستجو در سیستم..."
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotif(!showNotif); setShowUser(false); setShowSchools(false); }}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
          {showNotif && (
            <div className="absolute top-11 left-0 bg-white rounded-xl border border-gray-100 shadow-lg py-2 w-72 z-50">
              <p className="text-sm font-bold px-4 pb-2 text-gray-800">اعلانات</p>
              {notifications.map(n => (
                <div key={n.id} className={cn('px-4 py-2.5 hover:bg-gray-50', !n.read && 'bg-blue-50/50')}>
                  <p className="text-xs text-gray-700">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
              ))}
              <div className="border-t border-gray-100 mt-1 pt-1 px-4">
                <button className="text-xs text-blue-600 hover:underline">مشاهده همه</button>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => { setShowUser(!showUser); setShowNotif(false); setShowSchools(false); }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-xs font-medium text-gray-800 leading-tight">{user.name}</p>
              <p className="text-xs text-gray-400 leading-tight">{roleLabels[user.role] || user.role}</p>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
          </button>
          {showUser && (
            <div className="absolute top-11 left-0 bg-white rounded-xl border border-gray-100 shadow-lg py-2 min-w-44 z-50">
              <div className="px-4 py-2 border-b border-gray-100 mb-1">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-400">{roleLabels[user.role] || user.role}</p>
              </div>
              <button onClick={() => { setCurrentPage('settings'); setShowUser(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                <User size={15} />
                پروفایل
              </button>
              <button onClick={() => { setCurrentPage('settings'); setShowUser(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                <Settings size={15} />
                تنظیمات
              </button>
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={() => { setIsLoggedIn(false); setCurrentPage('login'); }}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-sm text-red-600"
                >
                  <LogOut size={15} />
                  خروج از سیستم
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
