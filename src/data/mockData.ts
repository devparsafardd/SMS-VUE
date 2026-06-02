import type { Student, School, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'احمد محمدی',
  role: 'school_admin',
  school: 'دبیرستان شهید رجایی',
  nationalCode: '1234567890',
};

export const schools: School[] = [
  { id: '1', name: 'دبیرستان شهید رجایی', code: 'SCH001', color: '#2563eb', level: 'متوسطه دوم', active: true },
  { id: '2', name: 'دبستان امام خمینی', code: 'SCH002', color: '#16a34a', level: 'دبستان', active: true },
  { id: '3', name: 'راهنمایی شهید مطهری', code: 'SCH003', color: '#9333ea', level: 'متوسطه اول', active: true },
];

export const students: Student[] = [
  { id: '1', name: 'علی رضایی', nationalCode: '0011234567', grade: 'دهم', field: 'ریاضی', className: '۱۰-الف', parentPhone: '09121234567', status: 'active' },
  { id: '2', name: 'فاطمه احمدی', nationalCode: '0012345678', grade: 'یازدهم', field: 'تجربی', className: '۱۱-ب', parentPhone: '09131234567', status: 'active' },
  { id: '3', name: 'محمد حسینی', nationalCode: '0013456789', grade: 'دوازدهم', field: 'ریاضی', className: '۱۲-الف', parentPhone: '09141234567', status: 'active' },
  { id: '4', name: 'زهرا کریمی', nationalCode: '0014567890', grade: 'دهم', field: 'انسانی', className: '۱۰-ج', parentPhone: '09151234567', status: 'active' },
  { id: '5', name: 'امیر توکلی', nationalCode: '0015678901', grade: 'یازدهم', field: 'ریاضی', className: '۱۱-الف', parentPhone: '09161234567', status: 'active' },
  { id: '6', name: 'مریم صادقی', nationalCode: '0016789012', grade: 'دوازدهم', field: 'تجربی', className: '۱۲-ب', parentPhone: '09171234567', status: 'active' },
  { id: '7', name: 'حسین منصوری', nationalCode: '0017890123', grade: 'دهم', field: 'تجربی', className: '۱۰-ب', parentPhone: '09181234567', status: 'active' },
  { id: '8', name: 'نرگس شیرازی', nationalCode: '0018901234', grade: 'یازدهم', field: 'انسانی', className: '۱۱-ج', parentPhone: '09191234567', status: 'active' },
];

export const dashboardStats = {
  totalStudents: 487,
  totalTeachers: 32,
  totalClasses: 18,
  presentToday: 461,
  monthlyIncome: 142500000,
  pendingDebt: 28900000,
  openTickets: 7,
  overdueBooks: 12,
  absentToday: 26,
  newRegistrations: 14,
};

export const gradeData = [
  { month: 'مهر', avg: 15.2 },
  { month: 'آبان', avg: 15.8 },
  { month: 'آذر', avg: 14.9 },
  { month: 'دی', avg: 16.1 },
  { month: 'بهمن', avg: 15.5 },
  { month: 'اسفند', avg: 16.8 },
];

export const attendanceData = [
  { day: 'شنبه', present: 460, absent: 27 },
  { day: 'یکشنبه', present: 455, absent: 32 },
  { day: 'دوشنبه', present: 470, absent: 17 },
  { day: 'سه‌شنبه', present: 462, absent: 25 },
  { day: 'چهارشنبه', present: 448, absent: 39 },
];

export const incomeData = [
  { month: 'مهر', income: 125000000, expense: 48000000 },
  { month: 'آبان', income: 138000000, expense: 52000000 },
  { month: 'آذر', income: 142000000, expense: 49000000 },
  { month: 'دی', income: 131000000, expense: 55000000 },
  { month: 'بهمن', income: 145000000, expense: 51000000 },
  { month: 'اسفند', income: 152000000, expense: 58000000 },
];

export const classPerformance = [
  { class: '۱۰-الف', avg: 16.8, attendance: 94 },
  { class: '۱۰-ب', avg: 15.2, attendance: 91 },
  { class: '۱۱-الف', avg: 17.1, attendance: 96 },
  { class: '۱۱-ب', avg: 14.8, attendance: 89 },
  { class: '۱۲-الف', avg: 16.5, attendance: 93 },
  { class: '۱۲-ب', avg: 15.9, attendance: 92 },
];

export const recentActivities = [
  { id: '1', type: 'grade', text: 'نمرات ریاضی ۱۱-الف ثبت شد', time: '۱۰ دقیقه پیش', icon: 'BookOpen', color: 'blue' },
  { id: '2', type: 'payment', text: 'پرداخت شهریه علی رضایی دریافت شد', time: '۳۵ دقیقه پیش', icon: 'DollarSign', color: 'green' },
  { id: '3', type: 'absence', text: 'فاطمه احمدی غیبت غیرموجه - پیامک ارسال شد', time: '۱ ساعت پیش', icon: 'AlertCircle', color: 'orange' },
  { id: '4', type: 'ticket', text: 'تیکت جدید از والدین محمد حسینی', time: '۲ ساعت پیش', icon: 'MessageSquare', color: 'purple' },
  { id: '5', type: 'registration', text: 'ثبت‌نام جدید: زینب موسوی', time: '۳ ساعت پیش', icon: 'UserPlus', color: 'teal' },
];

export const upcomingEvents = [
  { id: '1', title: 'جلسه انجمن اولیا', date: '۱۴۰۳/۱۰/۱۵', type: 'meeting' },
  { id: '2', title: 'امتحان ریاضی پایه دهم', date: '۱۴۰۳/۱۰/۱۸', type: 'exam' },
  { id: '3', title: 'اردوی علمی پایه یازدهم', date: '۱۴۰۳/۱۰/۲۲', type: 'trip' },
  { id: '4', title: 'مراسم تکریم معلم', date: '۱۴۰۳/۱۰/۲۵', type: 'event' },
];

export const tickets = [
  { id: '1', title: 'مشکل در دسترسی به کارنامه', student: 'علی رضایی', priority: 'high', status: 'new', date: '۱۴۰۳/۱۰/۱۰', category: 'آموزشی' },
  { id: '2', title: 'سوال درباره بدهی شهریه', student: 'فاطمه احمدی', priority: 'normal', status: 'in_progress', date: '۱۴۰۳/۱۰/۰۹', category: 'مالی' },
  { id: '3', title: 'گزارش مشکل سرویس مدرسه', student: 'محمد حسینی', priority: 'urgent', status: 'answered', date: '۱۴۰۳/۱۰/۰۸', category: 'سرویس' },
  { id: '4', title: 'درخواست گواهی اشتغال به تحصیل', student: 'زهرا کریمی', priority: 'normal', status: 'closed', date: '۱۴۰۳/۱۰/۰۷', category: 'آموزشی' },
];

export const classes = [
  { id: '1', name: '۱۰-الف', grade: 'دهم', field: 'ریاضی', capacity: 30, enrolled: 28, teacher: 'آقای موسوی', room: 'کلاس ۱' },
  { id: '2', name: '۱۰-ب', grade: 'دهم', field: 'تجربی', capacity: 30, enrolled: 29, teacher: 'خانم رحمانی', room: 'کلاس ۲' },
  { id: '3', name: '۱۱-الف', grade: 'یازدهم', field: 'ریاضی', capacity: 28, enrolled: 27, teacher: 'آقای احمدی', room: 'کلاس ۳' },
  { id: '4', name: '۱۱-ب', grade: 'یازدهم', field: 'تجربی', capacity: 28, enrolled: 25, teacher: 'خانم کریمی', room: 'کلاس ۴' },
  { id: '5', name: '۱۲-الف', grade: 'دوازدهم', field: 'ریاضی', capacity: 25, enrolled: 24, teacher: 'آقای صادقی', room: 'کلاس ۵' },
  { id: '6', name: '۱۲-ب', grade: 'دوازدهم', field: 'تجربی', capacity: 25, enrolled: 23, teacher: 'خانم محمدی', room: 'کلاس ۶' },
];

export const financialDebtors = [
  { id: '1', name: 'علی رضایی', amount: 4500000, days: 45, grade: 'دهم', status: 'mid' },
  { id: '2', name: 'فاطمه احمدی', amount: 2800000, days: 15, grade: 'یازدهم', status: 'new' },
  { id: '3', name: 'محمد حسینی', amount: 8200000, days: 92, grade: 'دوازدهم', status: 'old' },
  { id: '4', name: 'زهرا کریمی', amount: 1500000, days: 8, grade: 'دهم', status: 'new' },
];

export const announcements = [
  { id: '1', title: 'تغییر ساعت آزمون نوبت اول', content: 'به اطلاع می‌رساند آزمون‌های نوبت اول از تاریخ ۱۵ دی ماه آغاز می‌گردد.', priority: 'urgent', date: '۱۴۰۳/۱۰/۰۵', audience: 'همه', views: 342 },
  { id: '2', title: 'جلسه انجمن اولیا و مربیان', content: 'جلسه انجمن اولیا در تاریخ ۱۵ دی ماه ساعت ۱۶ برگزار می‌شود.', priority: 'important', date: '۱۴۰۳/۱۰/۰۳', audience: 'والدین', views: 218 },
  { id: '3', title: 'مسابقه علمی دانش‌آموزان', content: 'ثبت‌نام مسابقه علمی پایه دهم تا ۲۰ دی ادامه دارد.', priority: 'normal', date: '۱۴۰۳/۱۰/۰۱', audience: 'دانش‌آموزان', views: 175 },
];
