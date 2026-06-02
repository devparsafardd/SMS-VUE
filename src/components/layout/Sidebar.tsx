import {
  LayoutDashboard, Users, BookOpen, Calendar, BarChart2, UserCheck,
  AlertTriangle, Heart, MessageSquare, Megaphone, Ticket,
  DollarSign, TrendingUp, Library, Bus, Package, Stethoscope,
  ShoppingCart, Star, Settings, ChevronLeft, ChevronRight,
  GraduationCap, Building2, ClipboardList, Brain, FolderOpen,
  CheckSquare
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useApp } from '../../context/AppContext';
import type { PageView } from '../../types';

interface NavItem {
  id: PageView;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'اصلی',
    items: [
      { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard size={18} /> },
      { id: 'analytics', label: 'تحلیل هوشمند', icon: <Brain size={18} /> },
      { id: 'reports', label: 'گزارشات', icon: <TrendingUp size={18} /> },
    ],
  },
  {
    title: 'آموزش',
    items: [
      { id: 'students', label: 'دانش‌آموزان', icon: <Users size={18} /> },
      { id: 'classes', label: 'کلاس‌ها', icon: <Building2 size={18} /> },
      { id: 'schedule', label: 'برنامه هفتگی', icon: <Calendar size={18} /> },
      { id: 'grades', label: 'نمرات و کارنامه', icon: <BarChart2 size={18} /> },
      { id: 'attendance', label: 'حضور و غیاب', icon: <UserCheck size={18} /> },
      { id: 'exams', label: 'آزمون و بانک سوال', icon: <ClipboardList size={18} /> },
      { id: 'content', label: 'محتوای آموزشی', icon: <BookOpen size={18} />, badge: 3 },
    ],
  },
  {
    title: 'دانش‌آموز',
    items: [
      { id: 'discipline', label: 'انضباط', icon: <AlertTriangle size={18} /> },
      { id: 'counseling', label: 'مشاوره', icon: <Heart size={18} /> },
      { id: 'health', label: 'سلامت و بهداشت', icon: <Stethoscope size={18} /> },
      { id: 'events', label: 'مراسم و پرورشی', icon: <Star size={18} /> },
    ],
  },
  {
    title: 'ارتباطات',
    items: [
      { id: 'messages', label: 'پیام‌رسان', icon: <MessageSquare size={18} />, badge: 5 },
      { id: 'announcements', label: 'اطلاعیه‌ها', icon: <Megaphone size={18} /> },
      { id: 'tickets', label: 'تیکت‌ها', icon: <Ticket size={18} />, badge: 7 },
      { id: 'forms', label: 'فرم‌ساز', icon: <CheckSquare size={18} /> },
    ],
  },
  {
    title: 'مالی و خدمات',
    items: [
      { id: 'finance', label: 'مالی و حسابداری', icon: <DollarSign size={18} /> },
      { id: 'library', label: 'کتابخانه', icon: <Library size={18} /> },
      { id: 'transport', label: 'سرویس مدرسه', icon: <Bus size={18} /> },
      { id: 'inventory', label: 'انبار و اموال', icon: <Package size={18} /> },
      { id: 'cafeteria', label: 'بوفه', icon: <ShoppingCart size={18} /> },
    ],
  },
  {
    title: 'مدیریت',
    items: [
      { id: 'registration', label: 'ثبت‌نام و پذیرش', icon: <GraduationCap size={18} /> },
      { id: 'documents', label: 'بایگانی اسناد', icon: <FolderOpen size={18} /> },
      { id: 'settings', label: 'تنظیمات', icon: <Settings size={18} /> },
    ],
  },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full bg-white border-l border-gray-100 z-40 flex flex-col transition-all duration-300',
          sidebarOpen ? 'w-60' : 'w-14'
        )}
      >
        {/* Logo */}
        <div className={cn('flex items-center gap-3 px-4 h-14 border-b border-gray-100 flex-shrink-0', !sidebarOpen && 'justify-center px-0')}>
          {sidebarOpen ? (
            <>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">سامانه مدرسه</p>
              </div>
            </>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -left-3 top-16 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 z-50"
        >
          {sidebarOpen ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {navGroups.map(group => (
            <div key={group.title}>
              {sidebarOpen && (
                <p className="text-xs text-gray-400 font-medium px-2 mb-1.5 uppercase tracking-wider">{group.title}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentPage(item.id); if (window.innerWidth < 1024) setSidebarOpen(false); }}
                    className={cn(
                      'w-full flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors relative',
                      currentPage === item.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      !sidebarOpen && 'justify-center px-0'
                    )}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && <span className="truncate flex-1 text-right">{item.label}</span>}
                    {sidebarOpen && item.badge ? (
                      <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">
                        {item.badge}
                      </span>
                    ) : null}
                    {!sidebarOpen && item.badge ? (
                      <span className="absolute top-1 left-1 bg-red-500 text-white text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
