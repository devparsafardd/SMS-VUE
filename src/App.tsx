import { Toaster } from 'react-hot-toast';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Grades from './pages/Grades';
import Attendance from './pages/Attendance';
import Finance from './pages/Finance';
import Messages from './pages/Messages';
import Tickets from './pages/Tickets';
import Announcements from './pages/Announcements';
import Analytics from './pages/Analytics';
import Library from './pages/Library';
import Settings from './pages/Settings';
import GenericPage from './pages/GenericPage';
import {
  ClipboardList, AlertTriangle, Heart, BookOpen, Bus,
  Package, Stethoscope, ShoppingCart, Star, TrendingUp,
  GraduationCap, FolderOpen, CheckSquare
} from 'lucide-react';

function AppContent() {
  const { isLoggedIn, currentPage } = useApp();

  if (!isLoggedIn) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'students': return <Students />;
      case 'classes': return <Classes />;
      case 'schedule': return <Classes />;
      case 'grades': return <Grades />;
      case 'attendance': return <Attendance />;
      case 'exams': return <GenericPage title="آزمون و بانک سوال" description="ساخت آزمون، بانک سوال، تصحیح خودکار و گزارشات" icon={<ClipboardList size={28} />} />;
      case 'content': return <GenericPage title="محتوای آموزشی" description="آپلود و مدیریت محتوای آموزشی (PDF، ویدیو، پاورپوینت)" icon={<BookOpen size={28} />} />;
      case 'discipline': return <GenericPage title="پرونده انضباطی" description="ثبت تذکر، اخطار، تعلیق، تشویق و کمیته انضباطی" icon={<AlertTriangle size={28} />} />;
      case 'counseling': return <GenericPage title="مشاوره" description="پرونده مشاوره، جلسات و هدایت تحصیلی" icon={<Heart size={28} />} />;
      case 'health': return <GenericPage title="سلامت و بهداشت" description="واکسیناسیون، معاینات دوره‌ای و پرونده بیماری" icon={<Stethoscope size={28} />} />;
      case 'events': return <GenericPage title="مراسم و فعالیت‌های پرورشی" description="مدیریت مراسم، ثبت حضور و نمره پرورشی" icon={<Star size={28} />} />;
      case 'messages': return <Messages />;
      case 'announcements': return <Announcements />;
      case 'tickets': return <Tickets />;
      case 'forms': return <GenericPage title="فرم‌ساز" description="طراحی فرم بدون کدنویسی، رضایت‌نامه‌ها و نظرسنجی" icon={<CheckSquare size={28} />} />;
      case 'finance': return <Finance />;
      case 'reports': return <GenericPage title="گزارشات" description="گزارشات جامع، خروجی Excel و PDF، تبادل با سناد و سیدا" icon={<TrendingUp size={28} />} />;
      case 'library': return <Library />;
      case 'transport': return <GenericPage title="سرویس مدرسه" description="مدیریت مسیرها، رانندگان و تأیید سوار شدن" icon={<Bus size={28} />} />;
      case 'inventory': return <GenericPage title="انبار و اموال" description="ثبت دارایی، QR Code، درخواست تعمیر و بازرسی سالانه" icon={<Package size={28} />} />;
      case 'cafeteria': return <GenericPage title="بوفه" description="مدیریت محصولات، کیف پول الکترونیک و گزارش فروش" icon={<ShoppingCart size={28} />} />;
      case 'registration': return <GenericPage title="ثبت‌نام و پذیرش" description="فرآیند پذیرش، آزمون ورودی، رتبه‌بندی و لیست انتظار" icon={<GraduationCap size={28} />} />;
      case 'documents': return <GenericPage title="بایگانی اسناد" description="بایگانی الکترونیک اسناد دانش‌آموزان، پرسنل و مدرسه" icon={<FolderOpen size={28} />} />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'Tahoma, Arial, sans-serif',
            direction: 'rtl',
            fontSize: '13px',
          },
        }}
      />
      <AppContent />
    </AppProvider>
  );
}
