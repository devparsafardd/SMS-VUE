import { useState } from 'react';
import { School, Users, Calendar, Bell, Lock, Palette, Globe, Shield } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { cn } from '../utils/cn';

const sections = [
  { id: 'school', label: 'اطلاعات مدرسه', icon: <School size={16} /> },
  { id: 'academic', label: 'سال تحصیلی', icon: <Calendar size={16} /> },
  { id: 'users', label: 'نقش‌ها و دسترسی', icon: <Users size={16} /> },
  { id: 'notifications', label: 'اعلان‌ها', icon: <Bell size={16} /> },
  { id: 'security', label: 'امنیت', icon: <Lock size={16} /> },
  { id: 'appearance', label: 'ظاهر', icon: <Palette size={16} /> },
  { id: 'integrations', label: 'یکپارچه‌سازی', icon: <Globe size={16} /> },
  { id: 'permissions', label: 'مجوزها', icon: <Shield size={16} /> },
];

const roles = [
  { id: '1', name: 'مدیرکل', permissions: 'دسترسی کامل', users: 1 },
  { id: '2', name: 'مدیر مدرسه', permissions: 'مدیریت مدرسه', users: 1 },
  { id: '3', name: 'معاون آموزشی', permissions: 'آموزش، نمرات، کارنامه', users: 2 },
  { id: '4', name: 'معلم', permissions: 'کلاس‌داری، نمرات', users: 32 },
  { id: '5', name: 'حسابدار', permissions: 'مالی، حسابداری', users: 1 },
  { id: '6', name: 'مشاور', permissions: 'مشاوره، پرونده‌ها', users: 2 },
  { id: '7', name: 'دانش‌آموز', permissions: 'پورتال دانش‌آموز', users: 487 },
  { id: '8', name: 'والدین', permissions: 'پورتال والدین', users: 412 },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('school');

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">تنظیمات سیستم</h1>
        <p className="text-sm text-gray-500">مدیریت تنظیمات و پیکربندی سیستم</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <Card>
          <CardBody className="p-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-right', activeSection === s.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50')}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </CardBody>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4">
          {activeSection === 'school' && (
            <Card>
              <CardHeader><span className="font-semibold text-sm text-gray-800">اطلاعات مدرسه</span></CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="نام مدرسه" defaultValue="دبیرستان شهید رجایی" />
                  <Input label="کد مدرسه" defaultValue="SCH001" />
                  <Select label="دوره تحصیلی" options={[
                    { value: 'high1', label: 'متوسطه اول' },
                    { value: 'high2', label: 'متوسطه دوم' },
                    { value: 'elem', label: 'دبستان' },
                  ]} />
                  <Input label="کد پستی" defaultValue="1234567890" />
                  <div className="col-span-2">
                    <Input label="آدرس" defaultValue="تهران، خیابان..." />
                  </div>
                  <Input label="تلفن مدرسه" defaultValue="021-12345678" />
                  <Input label="ایمیل" defaultValue="info@school.ir" />
                </div>
                <div className="mt-4 flex gap-3">
                  <Button>ذخیره تغییرات</Button>
                  <Button variant="outline">بازگردانی</Button>
                </div>
              </CardBody>
            </Card>
          )}

          {activeSection === 'academic' && (
            <Card>
              <CardHeader><span className="font-semibold text-sm text-gray-800">سال تحصیلی جاری</span></CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="عنوان سال تحصیلی" defaultValue="سال تحصیلی ۱۴۰۳-۱۴۰۴" />
                  <Select label="وضعیت" options={[
                    { value: 'active', label: 'فعال' },
                    { value: 'closed', label: 'بسته شده' },
                  ]} />
                  <Input label="تاریخ شروع" defaultValue="۱۴۰۳/۰۶/۰۱" />
                  <Input label="تاریخ پایان" defaultValue="۱۴۰۴/۰۳/۳۱" />
                </div>
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                  <p className="text-sm font-medium text-orange-800 mb-2">تنظیمات نوبت‌های ارزشیابی</p>
                  <div className="space-y-2">
                    {['مستمر', 'میان‌ترم', 'نوبت اول', 'نوبت دوم', 'شهریور'].map(t => (
                      <div key={t} className="flex items-center justify-between bg-white rounded-lg p-2">
                        <span className="text-sm text-gray-700">{t}</span>
                        <div className="flex gap-2 items-center">
                          <input type="date" className="text-xs border border-gray-200 rounded px-2 py-1" />
                          <span className="text-xs text-gray-400">تا</span>
                          <input type="date" className="text-xs border border-gray-200 rounded px-2 py-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <Button>ذخیره</Button>
                </div>
              </CardBody>
            </Card>
          )}

          {activeSection === 'users' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-800">نقش‌های سیستم</span>
                  <Button size="sm" icon={<Users size={13} />}>نقش سفارشی</Button>
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-y border-gray-100">
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">نقش</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">دسترسی‌ها</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">تعداد کاربران</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {roles.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{r.permissions}</td>
                        <td className="px-4 py-3 text-center font-medium text-gray-700">{r.users}</td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="ghost">ویرایش دسترسی</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card>
              <CardHeader><span className="font-semibold text-sm text-gray-800">تنظیمات امنیتی</span></CardHeader>
              <CardBody className="space-y-5">
                {[
                  { label: 'احراز هویت دو مرحله‌ای برای مدیر', defaultOn: true },
                  { label: 'احراز هویت دو مرحله‌ای برای حسابدار', defaultOn: true },
                  { label: 'قفل خودکار پس از ۵ بار ورود ناموفق', defaultOn: true },
                  { label: 'هشدار ورود از IP ناشناس', defaultOn: true },
                  { label: 'ثبت لاگ تمام عملیات‌ها', defaultOn: true },
                  { label: 'احراز هویت دو مرحله‌ای برای معلمان (اختیاری)', defaultOn: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <button
                      className={cn('w-11 h-6 rounded-full transition-colors relative', item.defaultOn ? 'bg-blue-600' : 'bg-gray-300')}
                    >
                      <div className={cn('w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-all', item.defaultOn ? 'left-5' : 'left-0.5')} />
                    </button>
                  </div>
                ))}
                <div>
                  <Input label="مدت زمان قفل حساب (دقیقه)" defaultValue="30" type="number" />
                </div>
                <div>
                  <Input label="IP مجاز برای مدیران (با کاما جدا کنید)" placeholder="192.168.1.100, 10.0.0.1" />
                </div>
                <Button>ذخیره تنظیمات امنیتی</Button>
              </CardBody>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <CardHeader><span className="font-semibold text-sm text-gray-800">تنظیمات اعلان‌ها</span></CardHeader>
              <CardBody className="space-y-4">
                <Input label="API پیامک" placeholder="آدرس API ارائه‌دهنده پیامک" />
                <Input label="کلید API" placeholder="API Key" />
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">ارسال خودکار پیامک برای:</p>
                  <div className="space-y-2">
                    {['غیبت غیرموجه', 'ورود نمره', 'بدهی معوق', 'تغییر برنامه', 'سررسید اقساط', 'تولد دانش‌آموز'].map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="ساعت شروع آرام" defaultValue="23:00" type="time" />
                  <Input label="ساعت پایان آرام" defaultValue="07:00" type="time" />
                </div>
                <Button>ذخیره</Button>
              </CardBody>
            </Card>
          )}

          {!['school', 'academic', 'users', 'security', 'notifications'].includes(activeSection) && (
            <Card>
              <CardBody>
                <p className="text-sm text-gray-400 text-center py-8">بخش {sections.find(s => s.id === activeSection)?.label} در حال توسعه است.</p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
