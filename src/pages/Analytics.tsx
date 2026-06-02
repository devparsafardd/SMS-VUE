import { Brain, TrendingDown, AlertTriangle, Target, Zap, Award, BookOpen, Activity } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '../utils/cn';

const atRiskStudents = [
  { name: 'امیر توکلی', grade: '۱۱-الف', reason: 'معدل پایین + غیبت زیاد + تکالیف انجام نشده', level: 'high' },
  { name: 'حسین منصوری', grade: '۱۰-ب', reason: 'غیبت بیش از ۷ روز مداوم', level: 'medium' },
  { name: 'نرگس شیرازی', grade: '۱۱-ج', reason: 'کاهش نمره ۲ درس در یک ماه', level: 'low' },
];

const scatterData = [
  { absences: 0, grade: 18.5, name: 'فاطمه احمدی' },
  { absences: 1, grade: 17.2, name: 'علی رضایی' },
  { absences: 2, grade: 16.5, name: 'زهرا کریمی' },
  { absences: 3, grade: 15.1, name: 'مریم صادقی' },
  { absences: 4, grade: 14.8, name: 'محمد حسینی' },
  { absences: 5, grade: 13.2, name: 'رضا نوری' },
  { absences: 7, grade: 11.5, name: 'سارا محمدی' },
  { absences: 9, grade: 10.2, name: 'امیر توکلی' },
];

const teacherRanking = [
  { name: 'خانم احمدی', subject: 'فیزیک', classAvg: 16.8, passRate: 96, gradeTimeliness: 98 },
  { name: 'آقای موسوی', subject: 'ریاضی', classAvg: 15.9, passRate: 93, gradeTimeliness: 100 },
  { name: 'آقای رضایی', subject: 'شیمی', classAvg: 15.2, passRate: 91, gradeTimeliness: 95 },
  { name: 'خانم کریمی', subject: 'ادبیات', classAvg: 17.1, passRate: 98, gradeTimeliness: 92 },
];

const smartAlerts = [
  { type: 'warning', text: 'امیر توکلی ۹ روز غیبت مداوم دارد. ارسال هشدار به مشاور پیشنهاد می‌شود.', time: '۲ ساعت پیش' },
  { type: 'info', text: 'کاهش محسوس نمرات در درس فیزیک ۱۱-ب در دو هفته گذشته مشاهده می‌شود.', time: '۴ ساعت پیش' },
  { type: 'danger', text: '۳ دانش‌آموز پایه دهم در خطر مردودی هستند. بررسی توصیه می‌شود.', time: 'دیروز' },
  { type: 'success', text: 'مشارکت کلاس ۱۱-الف در مراسم پرورشی ۹۵٪ بوده. بهترین کلاس این هفته.', time: 'دیروز' },
];

const alertColors: Record<string, string> = {
  warning: 'bg-orange-50 border-orange-200 text-orange-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  danger: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
};

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <Brain size={20} className="text-purple-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">تحلیل هوشمند</h1>
          <p className="text-sm text-gray-500">گزارشات مبتنی بر داده - بدون برچسب ارزشی</p>
        </div>
      </div>

      {/* Ethical note */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-purple-700 leading-relaxed">
          <span className="font-semibold">اصول اخلاقی سیستم:</span> تمام تحلیل‌ها صرفاً بر اساس داده‌های عددی (درصد حضور، نمرات، غیبت) هستند و هیچ برچسب شخصیتی یا ارزشی صادر نمی‌شود. تفسیر نهایی به عهده معلم، مشاور و مدیر است.
        </p>
      </div>

      {/* Smart Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-orange-500" />
            <span className="font-semibold text-sm text-gray-800">هشدارهای هوشمند</span>
          </div>
        </CardHeader>
        <CardBody className="space-y-3">
          {smartAlerts.map((a, i) => (
            <div key={i} className={cn('border rounded-xl p-3 text-xs flex items-start gap-2', alertColors[a.type])}>
              <span className="flex-1 leading-relaxed">{a.text}</span>
              <span className="opacity-60 flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* At-risk students */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="font-semibold text-sm text-gray-800">دانش‌آموزان در معرض خطر مردودی</span>
          </div>
        </CardHeader>
        <div className="divide-y divide-gray-50">
          {atRiskStudents.map(s => (
            <div key={s.name} className="flex items-center gap-4 px-5 py-3">
              <div className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', {
                'bg-red-500': s.level === 'high',
                'bg-orange-500': s.level === 'medium',
                'bg-yellow-500': s.level === 'low',
              })} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{s.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.reason}</p>
              </div>
              <div className="text-left flex-shrink-0">
                <Badge variant={s.level === 'high' ? 'danger' : s.level === 'medium' ? 'warning' : 'default'}>
                  {s.level === 'high' ? 'بحرانی' : s.level === 'medium' ? 'هشدار' : 'پیگیری'}
                </Badge>
                <p className="text-xs text-gray-400 mt-0.5 text-center">{s.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Absence vs Grade scatter */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-blue-500" />
            <span className="font-semibold text-sm text-gray-800">ارتباط غیبت و نمره (تحلیل توصیفی)</span>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-xs text-gray-400 mb-3">نمودار زیر صرفاً همبستگی آماری داده‌ها را نشان می‌دهد و نتیجه‌گیری علی نیست.</p>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="absences" name="روز غیبت" tick={{ fontSize: 11 }} label={{ value: 'روز غیبت', position: 'insideBottom', offset: -5, fontSize: 11 }} />
              <YAxis dataKey="grade" domain={[8, 20]} name="نمره" tick={{ fontSize: 11 }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0]?.payload;
                return (
                  <div className="bg-white border border-gray-200 rounded-lg p-2 text-xs shadow-sm">
                    <p className="font-medium">{d?.name}</p>
                    <p className="text-gray-500">غیبت: {d?.absences} روز | نمره: {d?.grade}</p>
                  </div>
                );
              }} />
              <Scatter data={scatterData} fill="#3b82f6">
                {scatterData.map((_, i) => (
                  <Cell key={i} fill={scatterData[i].grade >= 15 ? '#22c55e' : scatterData[i].grade >= 10 ? '#f97316' : '#ef4444'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Teacher performance (admin only) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-green-500" />
                <span className="font-semibold text-sm text-gray-800">عملکرد معلمان (فقط برای مدیر)</span>
              </div>
              <Badge variant="warning">محرمانه</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            {teacherRanking.map((t, i) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="w-5 text-xs text-gray-400 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-gray-800">{t.name}</span>
                    <span className="text-gray-400">{t.subject}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${(t.classAvg / 20) * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500 w-8">{t.classAvg}</span>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-gray-400">قبولی: {t.passRate}٪</span>
                    <span className="text-xs text-gray-400">نظم ثبت: {t.gradeTimeliness}٪</span>
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Participation indices */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target size={16} className="text-purple-500" />
              <span className="font-semibold text-sm text-gray-800">شاخص‌های مشارکت مدرسه</span>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            {[
              { label: 'شاخص مشارکت پرورشی', value: 78, color: 'bg-purple-500', desc: 'درصد حضور در مراسم' },
              { label: 'شاخص مشارکت فرهنگی', value: 65, color: 'bg-blue-500', desc: 'مسابقات و جشن‌ها' },
              { label: 'شاخص مشارکت اجتماعی', value: 72, color: 'bg-green-500', desc: 'اردوها و فعالیت گروهی' },
              { label: 'نرخ تحویل تکالیف', value: 85, color: 'bg-orange-500', desc: 'درصد تکالیف تحویل‌داده‌شده' },
            ].map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{s.label}</span>
                  <span className="font-medium text-gray-800">{s.value}٪</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={cn('h-2 rounded-full transition-all', s.color)} style={{ width: `${s.value}%` }} />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Exam quality analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-orange-500" />
            <span className="font-semibold text-sm text-gray-800">تشخیص سوالات امتحانی نامناسب</span>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-xs text-gray-400 mb-3">سوالاتی که بیش از ۸۰٪ کلاس به آن‌ها پاسخ اشتباه داده‌اند:</p>
          <div className="space-y-2">
            {[
              { exam: 'آزمون ریاضی نوبت اول', q: 'سوال ۱۲ (هندسه تحلیلی)', wrongPct: 87, teacher: 'آقای موسوی' },
              { exam: 'آزمون فیزیک میان‌ترم', q: 'سوال ۸ (الکتریسیته)', wrongPct: 82, teacher: 'خانم احمدی' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 bg-orange-50 border border-orange-100 rounded-lg p-3">
                <TrendingDown size={16} className="text-orange-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800">{s.exam} - {s.q}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.teacher}</p>
                </div>
                <Badge variant="danger">{s.wrongPct}٪ اشتباه</Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
