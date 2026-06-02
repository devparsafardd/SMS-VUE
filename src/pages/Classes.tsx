import { useState } from 'react';
import { Plus, Users, BookOpen, Edit, Eye } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import { classes } from '../data/mockData';
import { cn } from '../utils/cn';

const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'];
const periods = ['زنگ اول\n۸:۰۰-۹:۳۰', 'زنگ دوم\n۹:۴۵-۱۱:۱۵', 'زنگ سوم\n۱۱:۳۰-۱۳:۰۰'];

const schedule = [
  ['ریاضی\nآقای موسوی', 'فیزیک\nخانم احمدی', 'شیمی\nآقای رضایی'],
  ['ادبیات\nخانم کریمی', 'زبان\nآقای صادقی', 'ریاضی\nآقای موسوی'],
  ['فیزیک\nخانم احمدی', 'دینی\nآقای حسینی', 'ادبیات\nخانم کریمی'],
  ['شیمی\nآقای رضایی', 'ریاضی\nآقای موسوی', 'زبان\nآقای صادقی'],
  ['دینی\nآقای حسینی', 'ورزش\nآقای نجفی', '---'],
];

export default function Classes() {
  const [activeTab, setActiveTab] = useState<'list' | 'schedule'>('list');
  const [showAdd, setShowAdd] = useState(false);
  const [selectedClass, setSelectedClass] = useState(classes[0]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">کلاس‌ها و برنامه هفتگی</h1>
          <p className="text-sm text-gray-500">مدیریت کلاس‌ها و جدول کلاسی</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {(['list', 'schedule'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab === 'list' ? 'لیست کلاس‌ها' : 'برنامه هفتگی'}
              </button>
            ))}
          </div>
          <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowAdd(true)}>کلاس جدید</Button>
        </div>
      </div>

      {activeTab === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map(cls => (
            <Card key={cls.id} className="hover:shadow-md transition-shadow">
              <CardBody>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">کلاس {cls.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{cls.grade} - {cls.field}</p>
                  </div>
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold', {
                    'bg-blue-100 text-blue-700': cls.field === 'ریاضی',
                    'bg-green-100 text-green-700': cls.field === 'تجربی',
                    'bg-purple-100 text-purple-700': cls.field === 'انسانی',
                  })}>
                    {cls.name.split('-')[0]}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">معلم اصلی:</span>
                    <span className="font-medium text-gray-700">{cls.teacher}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">اتاق:</span>
                    <span className="font-medium text-gray-700">{cls.room}</span>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-500">ظرفیت:</span>
                      <span className="font-medium">{cls.enrolled}/{cls.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={cn('h-1.5 rounded-full', cls.enrolled >= cls.capacity ? 'bg-red-500' : cls.enrolled >= cls.capacity * 0.8 ? 'bg-orange-500' : 'bg-green-500')}
                        style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1 justify-center" icon={<Eye size={12} />}
                    onClick={() => { setSelectedClass(cls); setActiveTab('schedule'); }}>
                    برنامه
                  </Button>
                  <Button size="sm" variant="ghost" icon={<Users size={12} />}>دانش‌آموزان</Button>
                  <Button size="sm" variant="ghost" icon={<Edit size={12} />} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <Card>
            <CardBody className="py-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-gray-700">انتخاب کلاس:</span>
                {classes.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClass(cls)}
                    className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors', selectedClass.id === cls.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300')}
                  >
                    {cls.name}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-800">
                  برنامه هفتگی کلاس {selectedClass.name} | {selectedClass.grade} - {selectedClass.field}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" icon={<BookOpen size={12} />}>خروجی PDF</Button>
                  <Button size="sm" icon={<Edit size={12} />}>ویرایش</Button>
                </div>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-100 px-3 py-2.5 text-right font-medium text-gray-500 w-28">روز / زنگ</th>
                    {periods.map((p, i) => (
                      <th key={i} className="border border-gray-100 px-3 py-2.5 text-center font-medium text-gray-600 min-w-28">
                        {p.split('\n').map((line, li) => (
                          <div key={li} className={li === 1 ? 'text-gray-400 font-normal text-xs' : ''}>{line}</div>
                        ))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weekDays.map((day, di) => (
                    <tr key={day} className="hover:bg-gray-50/50">
                      <td className="border border-gray-100 px-3 py-2 font-medium text-gray-700 bg-gray-50">{day}</td>
                      {schedule[di].map((cell, ci) => {
                        const parts = cell.split('\n');
                        return (
                          <td key={ci} className="border border-gray-100 px-2 py-2">
                            {parts[0] !== '---' ? (
                              <div className="bg-blue-50 rounded-lg p-2 text-center">
                                <p className="font-medium text-blue-800 text-xs">{parts[0]}</p>
                                {parts[1] && <p className="text-gray-500 text-xs mt-0.5">{parts[1]}</p>}
                              </div>
                            ) : (
                              <div className="text-center text-gray-300">-</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-yellow-50 border-t border-yellow-100">
              <p className="text-xs text-yellow-700">
                <span className="font-medium">تشخیص تداخل خودکار:</span> هیچ تداخلی در برنامه این کلاس وجود ندارد. ✓
              </p>
            </div>
          </Card>
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="ایجاد کلاس جدید">
        <div className="space-y-4">
          <Input label="نام کلاس" placeholder="مثلاً ۱۰-الف" />
          <Select label="پایه تحصیلی" options={[
            { value: '10', label: 'دهم' },
            { value: '11', label: 'یازدهم' },
            { value: '12', label: 'دوازدهم' },
          ]} />
          <Select label="رشته تحصیلی" options={[
            { value: 'math', label: 'ریاضی' },
            { value: 'sci', label: 'تجربی' },
            { value: 'hum', label: 'انسانی' },
          ]} />
          <Input label="ظرفیت" type="number" placeholder="۳۰" />
          <Input label="مکان (اتاق)" placeholder="کلاس ۱" />
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 justify-center">ایجاد کلاس</Button>
            <Button variant="outline" onClick={() => setShowAdd(false)}>انصراف</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
