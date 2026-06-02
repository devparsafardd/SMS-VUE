import {
  Users, GraduationCap, UserCheck, AlertCircle, DollarSign,
  Ticket, BookOpen, TrendingUp, Calendar, Clock, ChevronLeft
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from 'recharts';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  dashboardStats, gradeData, attendanceData, incomeData,
  recentActivities, upcomingEvents, classPerformance
} from '../data/mockData';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';

function formatCurrency(n: number) {
  return (n / 1000000).toFixed(1) + ' میلیون';
}

const eventTypes: Record<string, { label: string; color: string }> = {
  meeting: { label: 'جلسه', color: 'info' },
  exam: { label: 'آزمون', color: 'warning' },
  trip: { label: 'اردو', color: 'success' },
  event: { label: 'مراسم', color: 'purple' },
};

export default function Dashboard() {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-5">
      {/* Welcome bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">داشبورد مدیریتی</h1>
          <p className="text-sm text-gray-500 mt-0.5">سال تحصیلی ۱۴۰۳-۱۴۰۴ | ترم اول</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Calendar size={14} />}>
            دی ۱۴۰۳
          </Button>
          <Button size="sm" icon={<TrendingUp size={14} />} onClick={() => setCurrentPage('reports')}>
            گزارشات
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="کل دانش‌آموزان" value={dashboardStats.totalStudents} icon={<Users size={20} />} color="blue" change="۱۴ ثبت‌نام جدید" changeType="up" onClick={() => setCurrentPage('students')} />
        <StatCard title="حاضر امروز" value={dashboardStats.presentToday} icon={<UserCheck size={20} />} color="green" change={`${dashboardStats.absentToday} غایب`} changeType="neutral" onClick={() => setCurrentPage('attendance')} />
        <StatCard title="درآمد ماه جاری" value={formatCurrency(dashboardStats.monthlyIncome)} icon={<DollarSign size={20} />} color="teal" change="۸٪ رشد" changeType="up" onClick={() => setCurrentPage('finance')} />
        <StatCard title="بدهی معوق" value={formatCurrency(dashboardStats.pendingDebt)} icon={<AlertCircle size={20} />} color="orange" change="نیاز به پیگیری" changeType="down" onClick={() => setCurrentPage('finance')} />
        <StatCard title="تیکت‌های باز" value={dashboardStats.openTickets} icon={<Ticket size={20} />} color="red" change="۲ اضطراری" changeType="down" onClick={() => setCurrentPage('tickets')} />
        <StatCard title="کتاب‌های دیرکرده" value={dashboardStats.overdueBooks} icon={<BookOpen size={20} />} color="purple" change="هشدار" changeType="down" onClick={() => setCurrentPage('library')} />
        <StatCard title="معلمان فعال" value={dashboardStats.totalTeachers} icon={<GraduationCap size={20} />} color="blue" change="۳۲ نفر" changeType="neutral" />
        <StatCard title="کلاس‌های فعال" value={dashboardStats.totalClasses} icon={<Users size={20} />} color="green" change="۱۸ کلاس" changeType="neutral" onClick={() => setCurrentPage('classes')} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Grade trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm">روند میانگین نمرات</h3>
              <Badge variant="info">ترم اول</Badge>
            </div>
          </CardHeader>
          <CardBody className="pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={gradeData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[12, 20]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [v, 'میانگین']} />
                <Area type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} fill="url(#gradeGrad)" dot={{ r: 3, fill: '#3b82f6' }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Income vs Expense */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm">درآمد و هزینه (میلیون تومان)</h3>
              <Badge variant="success">۶ ماه</Badge>
            </div>
          </CardHeader>
          <CardBody className="pt-2">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={incomeData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => (v / 1000000).toFixed(0)} />
                <Tooltip />
                <Bar dataKey="income" name="درآمد" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="هزینه" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm">فعالیت‌های اخیر</h3>
              <Clock size={15} className="text-gray-400" />
            </div>
          </CardHeader>
          <div className="divide-y divide-gray-50">
            {recentActivities.map(a => {
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                orange: 'bg-orange-100 text-orange-600',
                purple: 'bg-purple-100 text-purple-600',
                teal: 'bg-teal-100 text-teal-600',
              };
              return (
                <div key={a.id} className="flex items-start gap-3 px-5 py-3">
                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', colorMap[a.color])}>
                    <TrendingUp size={13} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm">رویدادهای پیش‌رو</h3>
              <button onClick={() => setCurrentPage('events')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                همه <ChevronLeft size={12} />
              </button>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {upcomingEvents.map(ev => {
              const et = eventTypes[ev.type];
              return (
                <div key={ev.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex flex-col items-center justify-center flex-shrink-0 border border-gray-100">
                    <span className="text-xs font-bold text-gray-800 leading-tight">{ev.date.split('/')[2]}</span>
                    <span className="text-xs text-gray-400 leading-tight">{ev.date.split('/')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{ev.title}</p>
                    <Badge variant={et.color as any} className="mt-0.5">{et.label}</Badge>
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>

        {/* Class performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm">عملکرد کلاس‌ها</h3>
              <button onClick={() => setCurrentPage('classes')} className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                جزئیات <ChevronLeft size={12} />
              </button>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {classPerformance.map(c => (
              <div key={c.class}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">کلاس {c.class}</span>
                  <span className="text-gray-500">میانگین: {c.avg}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={cn('h-1.5 rounded-full', c.avg >= 16 ? 'bg-green-500' : c.avg >= 14 ? 'bg-blue-500' : 'bg-orange-500')}
                    style={{ width: `${(c.avg / 20) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                  <span>حضور: {c.attendance}%</span>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Attendance chart */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-800 text-sm">حضور و غیاب هفته جاری</h3>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={attendanceData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="present" name="حاضر" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="غایب" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}
