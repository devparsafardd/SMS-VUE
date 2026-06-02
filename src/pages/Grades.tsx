import { useState } from 'react';
import { Download, Lock, Unlock, Check, AlertCircle, BarChart2, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Input';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const classOptions = [
  { value: '10a', label: '۱۰-الف' },
  { value: '10b', label: '۱۰-ب' },
  { value: '11a', label: '۱۱-الف' },
];

const termOptions = [
  { value: '1', label: 'نوبت اول' },
  { value: '2', label: 'نوبت دوم' },
  { value: 'mid', label: 'میان‌ترم' },
];

const subjects = [
  { name: 'ریاضی', coeff: 4, type: 'نظری', teacher: 'آقای موسوی' },
  { name: 'فیزیک', coeff: 3, type: 'عملی', teacher: 'خانم احمدی' },
  { name: 'شیمی', coeff: 3, type: 'نظری', teacher: 'آقای رضایی' },
  { name: 'ادبیات فارسی', coeff: 3, type: 'نظری', teacher: 'خانم کریمی' },
  { name: 'زبان انگلیسی', coeff: 2, type: 'نظری', teacher: 'آقای صادقی' },
  { name: 'دینی', coeff: 2, type: 'نظری', teacher: 'آقای حسینی' },
];

const gradeStudents = [
  { id: '1', name: 'علی رضایی', continuous: 17.5, midterm: 16, final: 18.5, locked: true },
  { id: '2', name: 'فاطمه احمدی', continuous: 19, midterm: 18, final: 19.5, locked: true },
  { id: '3', name: 'محمد حسینی', continuous: 14, midterm: 13, final: 15, locked: false },
  { id: '4', name: 'زهرا کریمی', continuous: 16, midterm: 15.5, final: 17, locked: false },
  { id: '5', name: 'امیر توکلی', continuous: 11, midterm: 10, final: 12, locked: false },
];

const radarData = [
  { subject: 'ریاضی', avg: 75 },
  { subject: 'فیزیک', avg: 82 },
  { subject: 'شیمی', avg: 68 },
  { subject: 'ادبیات', avg: 88 },
  { subject: 'زبان', avg: 71 },
  { subject: 'دینی', avg: 90 },
];

function calcTotal(s: typeof gradeStudents[0]) {
  return (s.continuous * 0.3 + s.midterm * 0.2 + s.final * 0.5).toFixed(1);
}

function gradeColor(g: number) {
  if (g >= 17) return 'text-green-600 font-semibold';
  if (g >= 14) return 'text-blue-600';
  if (g >= 10) return 'text-orange-600';
  return 'text-red-600 font-semibold';
}

export default function Grades() {
  const [selectedClass, setSelectedClass] = useState('10a');
  const [selectedTerm, setSelectedTerm] = useState('1');
  const [activeTab, setActiveTab] = useState<'entry' | 'report' | 'card'>('entry');
  // Grade state reserved for future controlled input use

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">نمرات و کارنامه</h1>
          <p className="text-sm text-gray-500">ثبت و مدیریت نمرات دانش‌آموزان</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Download size={14} />}>دریافت Excel</Button>
          <Button size="sm" icon={<BarChart2 size={14} />}>چاپ کارنامه</Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="py-3">
          <div className="flex flex-wrap gap-3 items-center">
            <Select options={classOptions} value={selectedClass} onChange={e => setSelectedClass(e.target.value)} label="" />
            <Select options={termOptions} value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)} label="" />
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(['entry', 'report', 'card'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {tab === 'entry' ? 'ثبت نمره' : tab === 'report' ? 'گزارش' : 'کارنامه'}
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {activeTab === 'entry' && (
        <div className="space-y-4">
          {/* Subject selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {subjects.map(sub => (
              <Card key={sub.name} className="cursor-pointer hover:border-blue-200 hover:bg-blue-50/30 transition-all" onClick={() => {}}>
                <CardBody className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{sub.name}</p>
                      <p className="text-xs text-gray-400">{sub.teacher}</p>
                    </div>
                    <div className="text-left">
                      <Badge variant="info">ضریب {sub.coeff}</Badge>
                      <p className="text-xs text-gray-400 mt-0.5">{sub.type}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Grade entry table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-600" />
                  <span className="font-semibold text-sm text-gray-800">ثبت نمرات - ریاضی - {selectedClass}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" icon={<Download size={13} />}>آپلود Excel</Button>
                  <Button size="sm" icon={<Lock size={13} />}>قفل نمرات</Button>
                </div>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100">
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">نام دانش‌آموز</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">مستمر<br/><span className="text-gray-400 font-normal">(۳۰٪)</span></th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">میان‌ترم<br/><span className="text-gray-400 font-normal">(۲۰٪)</span></th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">پایانی<br/><span className="text-gray-400 font-normal">(۵۰٪)</span></th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">نمره کل</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {gradeStudents.map(s => {
                    const total = parseFloat(calcTotal(s));
                    return (
                      <tr key={s.id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-2.5 font-medium text-gray-800">{s.name}</td>
                        <td className="px-4 py-2.5 text-center">
                          {s.locked ? (
                            <span className={gradeColor(s.continuous)}>{s.continuous}</span>
                          ) : (
                            <input
                              type="number"
                              min="0" max="20" step="0.25"
                              defaultValue={s.continuous}
                              className="w-16 text-center border border-gray-200 rounded-lg py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {s.locked ? (
                            <span className={gradeColor(s.midterm)}>{s.midterm}</span>
                          ) : (
                            <input
                              type="number"
                              min="0" max="20" step="0.25"
                              defaultValue={s.midterm}
                              className="w-16 text-center border border-gray-200 rounded-lg py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {s.locked ? (
                            <span className={gradeColor(s.final)}>{s.final}</span>
                          ) : (
                            <input
                              type="number"
                              min="0" max="20" step="0.25"
                              defaultValue={s.final}
                              className="w-16 text-center border border-gray-200 rounded-lg py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <span className={`text-base font-bold ${gradeColor(total)}`}>{total}</span>
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {s.locked ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600">
                              <Lock size={12} /> قفل شده
                            </span>
                          ) : (
                            <button className="inline-flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                              <Check size={12} /> تأیید
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 border-t border-blue-100">
                    <td className="px-4 py-2.5 text-sm font-semibold text-blue-800">میانگین کلاس</td>
                    <td className="px-4 py-2.5 text-center text-sm font-semibold text-blue-800">
                      {(gradeStudents.reduce((a, s) => a + s.continuous, 0) / gradeStudents.length).toFixed(1)}
                    </td>
                    <td className="px-4 py-2.5 text-center text-sm font-semibold text-blue-800">
                      {(gradeStudents.reduce((a, s) => a + s.midterm, 0) / gradeStudents.length).toFixed(1)}
                    </td>
                    <td className="px-4 py-2.5 text-center text-sm font-semibold text-blue-800">
                      {(gradeStudents.reduce((a, s) => a + s.final, 0) / gradeStudents.length).toFixed(1)}
                    </td>
                    <td className="px-4 py-2.5 text-center text-sm font-semibold text-blue-800">
                      {(gradeStudents.reduce((a, s) => a + parseFloat(calcTotal(s)), 0) / gradeStudents.length).toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'report' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><span className="font-semibold text-sm text-gray-800">نمودار عنکبوتی دروس</span></CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <Radar name="میانگین" dataKey="avg" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><span className="font-semibold text-sm text-gray-800">توزیع نمرات</span></CardHeader>
            <CardBody>
              <div className="space-y-3">
                {[
                  { label: 'عالی (۱۷-۲۰)', count: 12, pct: 43, color: 'bg-green-500' },
                  { label: 'خوب (۱۴-۱۷)', count: 9, pct: 32, color: 'bg-blue-500' },
                  { label: 'متوسط (۱۰-۱۴)', count: 5, pct: 18, color: 'bg-orange-500' },
                  { label: 'ضعیف (<۱۰)', count: 2, pct: 7, color: 'bg-red-500' },
                ].map(r => (
                  <div key={r.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600">{r.label}</span>
                      <span className="text-gray-500">{r.count} نفر ({r.pct}٪)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <AlertCircle size={16} className="text-orange-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">در خطر مردودی</p>
                  <p className="font-bold text-orange-600">۲ نفر</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <Check size={16} className="text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">میانگین کلاس</p>
                  <p className="font-bold text-green-600">۱۵.۸</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <Unlock size={16} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">رتبه اول</p>
                  <p className="font-bold text-blue-600">فاطمه احمدی</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'card' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-gray-800">کارنامه - علی رضایی</span>
              <Button size="sm" icon={<Download size={13} />}>چاپ PDF</Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="bg-blue-600 text-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">کارنامه تحصیلی</h3>
                  <p className="text-blue-200 text-sm">سال تحصیلی ۱۴۰۳-۱۴۰۴ | نوبت اول</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">دبیرستان شهید رجایی</p>
                  <p className="text-blue-200 text-sm">کد مدرسه: ۱۲۳۴۵</p>
                </div>
              </div>
              {/* Student info */}
              <div className="bg-blue-50 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'نام و نام خانوادگی', value: 'علی رضایی' },
                  { label: 'کد ملی', value: '۰۰۱۱۲۳۴۵۶۷' },
                  { label: 'پایه و رشته', value: 'دهم - ریاضی' },
                  { label: 'کلاس', value: '۱۰-الف' },
                ].map(r => (
                  <div key={r.label}>
                    <p className="text-xs text-gray-500">{r.label}</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{r.value}</p>
                  </div>
                ))}
              </div>
              {/* Grades */}
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-y border-gray-100">
                  <tr>
                    <th className="text-right px-4 py-2.5 text-xs font-medium text-gray-500">درس</th>
                    <th className="text-center px-4 py-2.5 text-xs font-medium text-gray-500">مستمر</th>
                    <th className="text-center px-4 py-2.5 text-xs font-medium text-gray-500">میان‌ترم</th>
                    <th className="text-center px-4 py-2.5 text-xs font-medium text-gray-500">پایانی</th>
                    <th className="text-center px-4 py-2.5 text-xs font-medium text-gray-500">نمره کل</th>
                    <th className="text-center px-4 py-2.5 text-xs font-medium text-gray-500">وضعیت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {subjects.map((sub, i) => {
                    const g = [17.5, 15, 14, 18, 16.5, 19][i];
                    return (
                      <tr key={sub.name}>
                        <td className="px-4 py-2.5 font-medium text-gray-800">{sub.name}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600">{(g - 1).toFixed(1)}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600">{(g - 1.5).toFixed(1)}</td>
                        <td className="px-4 py-2.5 text-center text-gray-600">{g}</td>
                        <td className={`px-4 py-2.5 text-center font-bold ${gradeColor(g)}`}>{g}</td>
                        <td className="px-4 py-2.5 text-center">
                          <Badge variant={g >= 10 ? 'success' : 'danger'}>{g >= 10 ? 'قبول' : 'مردود'}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                  <tr>
                    <td className="px-4 py-3 font-bold text-blue-800" colSpan={4}>معدل کل</td>
                    <td className="px-4 py-3 text-center font-bold text-xl text-blue-800">۱۶.۷</td>
                    <td className="px-4 py-3 text-center"><Badge variant="success">ارتقا</Badge></td>
                  </tr>
                </tfoot>
              </table>
              {/* Footer */}
              <div className="p-4 bg-gray-50 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400">غیبت موجه</p>
                  <p className="font-bold text-gray-800">۲ روز</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">غیبت غیرموجه</p>
                  <p className="font-bold text-orange-600">۱ روز</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">نمره انضباط</p>
                  <p className="font-bold text-green-600">۱۹.۵</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
