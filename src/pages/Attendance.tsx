import { useState } from 'react';
import { UserCheck, UserX, Clock, AlertCircle, Send, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Input';
import { cn } from '../utils/cn';

const classOpts = [
  { value: '10a', label: '۱۰-الف' },
  { value: '10b', label: '۱۰-ب' },
  { value: '11a', label: '۱۱-الف' },
];

type AttStatus = 'present' | 'absent' | 'late' | 'excused';

const statusConfig: Record<AttStatus, { label: string; icon: React.ReactNode; cls: string; badge: 'success' | 'danger' | 'warning' | 'info' }> = {
  present: { label: 'حاضر', icon: <CheckCircle size={16} />, cls: 'bg-green-50 border-green-200 text-green-700', badge: 'success' },
  absent: { label: 'غایب', icon: <XCircle size={16} />, cls: 'bg-red-50 border-red-200 text-red-700', badge: 'danger' },
  late: { label: 'تأخیر', icon: <Clock size={16} />, cls: 'bg-orange-50 border-orange-200 text-orange-700', badge: 'warning' },
  excused: { label: 'موجه', icon: <AlertCircle size={16} />, cls: 'bg-blue-50 border-blue-200 text-blue-700', badge: 'info' },
};

const attendanceStudents = [
  { id: '1', name: 'علی رضایی', totalAbsent: 3, lateCount: 2 },
  { id: '2', name: 'فاطمه احمدی', totalAbsent: 0, lateCount: 0 },
  { id: '3', name: 'محمد حسینی', totalAbsent: 7, lateCount: 1 },
  { id: '4', name: 'زهرا کریمی', totalAbsent: 1, lateCount: 3 },
  { id: '5', name: 'امیر توکلی', totalAbsent: 2, lateCount: 0 },
  { id: '6', name: 'مریم صادقی', totalAbsent: 0, lateCount: 1 },
  { id: '7', name: 'حسین منصوری', totalAbsent: 5, lateCount: 2 },
];

export default function Attendance() {
  const [statuses, setStatuses] = useState<Record<string, AttStatus>>(
    Object.fromEntries(attendanceStudents.map(s => [s.id, 'present']))
  );
  const [selectedClass, setSelectedClass] = useState('10a');
  const [activeTab, setActiveTab] = useState<'today' | 'monthly' | 'history'>('today');
  const [saved, setSaved] = useState(false);

  const toggle = (id: string, status: AttStatus) => {
    setStatuses(prev => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  const counts = Object.values(statuses).reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const monthlyData = [
    { name: 'علی رضایی', absent: 3, late: 2, pct: 89 },
    { name: 'فاطمه احمدی', absent: 0, late: 0, pct: 100 },
    { name: 'محمد حسینی', absent: 7, late: 1, pct: 74 },
    { name: 'زهرا کریمی', absent: 1, late: 3, pct: 96 },
    { name: 'امیر توکلی', absent: 2, late: 0, pct: 93 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">حضور و غیاب</h1>
          <p className="text-sm text-gray-500">ثبت و مدیریت حضور دانش‌آموزان</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Send size={13} />}>ارسال پیامک به غایبین</Button>
          <Button size="sm" icon={<UserCheck size={13} />} onClick={handleSave}>
            {saved ? '✓ ذخیره شد' : 'ذخیره حضور'}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(['today', 'monthly', 'history'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {tab === 'today' ? 'امروز' : tab === 'monthly' ? 'ماهانه' : 'تاریخچه'}
            </button>
          ))}
        </div>
        <Select options={classOpts} value={selectedClass} onChange={e => setSelectedClass(e.target.value)} label="" />
        <input type="date" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue="2025-01-10" />
      </div>

      {activeTab === 'today' && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'حاضر', key: 'present', color: 'green', icon: <UserCheck size={18} /> },
              { label: 'غایب', key: 'absent', color: 'red', icon: <UserX size={18} /> },
              { label: 'تأخیر', key: 'late', color: 'orange', icon: <Clock size={18} /> },
              { label: 'موجه', key: 'excused', color: 'blue', icon: <AlertCircle size={18} /> },
            ].map(c => (
              <div key={c.key} className={cn('rounded-xl p-4 flex items-center gap-3', {
                'bg-green-50 text-green-700': c.color === 'green',
                'bg-red-50 text-red-700': c.color === 'red',
                'bg-orange-50 text-orange-700': c.color === 'orange',
                'bg-blue-50 text-blue-700': c.color === 'blue',
              })}>
                {c.icon}
                <div>
                  <p className="text-xl font-bold">{counts[c.key] || 0}</p>
                  <p className="text-xs opacity-75">{c.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Method selector */}
          <Card>
            <CardBody className="py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">روش ثبت:</span>
                {['دستی', 'RFID', 'QR Code', 'اثر انگشت'].map(m => (
                  <button key={m} className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors', m === 'دستی' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300')}>
                    {m}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Attendance list */}
          <Card>
            <CardHeader>
              <span className="font-semibold text-sm text-gray-800">
                ثبت حضور - کلاس {classOpts.find(c => c.value === selectedClass)?.label} | شنبه ۱۴۰۳/۱۰/۱۴
              </span>
            </CardHeader>
            <div className="divide-y divide-gray-50">
              {attendanceStudents.map((s, i) => {
                const status = statuses[s.id];
                return (
                  <div key={s.id} className="flex items-center gap-4 px-5 py-3">
                    <span className="text-xs text-gray-400 w-5 text-center">{i + 1}</span>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{s.name}</p>
                      <p className="text-xs text-gray-400">
                        غیبت کل: {s.totalAbsent} | تأخیر: {s.lateCount}
                        {s.totalAbsent >= 5 && <span className="text-orange-600 mr-2">⚠ هشدار غیبت</span>}
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      {(Object.keys(statusConfig) as AttStatus[]).map(st => (
                        <button
                          key={st}
                          onClick={() => toggle(s.id, st)}
                          className={cn(
                            'px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all',
                            status === st
                              ? statusConfig[st].cls
                              : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                          )}
                          title={statusConfig[st].label}
                        >
                          {statusConfig[st].label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}

      {activeTab === 'monthly' && (
        <Card>
          <CardHeader>
            <span className="font-semibold text-sm text-gray-800">گزارش حضور ماهانه - دی ۱۴۰۳</span>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">نام دانش‌آموز</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">غیبت</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">تأخیر</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">درصد حضور</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {monthlyData.map(s => (
                  <tr key={s.name} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={s.absent > 5 ? 'text-red-600 font-semibold' : 'text-gray-600'}>{s.absent}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">{s.late}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div
                            className={cn('h-1.5 rounded-full', s.pct >= 90 ? 'bg-green-500' : s.pct >= 75 ? 'bg-orange-500' : 'bg-red-500')}
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-8">{s.pct}٪</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={s.pct >= 90 ? 'success' : s.pct >= 75 ? 'warning' : 'danger'}>
                        {s.pct >= 90 ? 'عادی' : s.pct >= 75 ? 'هشدار' : 'بحرانی'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500 text-center py-8">تاریخچه حضور و غیاب در اینجا نمایش داده می‌شود.</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
