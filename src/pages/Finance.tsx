import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, Plus, Download, Search, CreditCard, Check } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import { financialDebtors } from '../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../utils/cn';

function formatCurrency(n: number) {
  return n.toLocaleString('fa-IR') + ' تومان';
}

const debtStatus: Record<string, { label: string; variant: 'danger' | 'warning' | 'info' }> = {
  new: { label: 'جدید (< ۱ ماه)', variant: 'info' },
  mid: { label: 'میان‌مدت (۱-۳ ماه)', variant: 'warning' },
  old: { label: 'قدیمی (> ۳ ماه)', variant: 'danger' },
};

const paymentMethods = [
  { value: 'cash', label: 'نقدی' },
  { value: 'card', label: 'کارتخوان' },
  { value: 'transfer', label: 'واریز به حساب' },
  { value: 'check', label: 'چک' },
  { value: 'online', label: 'درگاه آنلاین' },
];

const incomeItems = [
  { id: '1', name: 'شهریه ماهانه', type: 'شهریه ثابت', amount: 5000000, grade: 'دهم' },
  { id: '2', name: 'هزینه کتاب', type: 'متغیر', amount: 850000, grade: 'همه' },
  { id: '3', name: 'هزینه سرویس', type: 'متغیر', amount: 2500000, grade: 'همه' },
  { id: '4', name: 'شهریه فوق‌برنامه', type: 'متغیر', amount: 1200000, grade: 'یازدهم' },
];

const monthlyTrend = [
  { month: 'مهر', collected: 115000000, expected: 125000000 },
  { month: 'آبان', collected: 128000000, expected: 130000000 },
  { month: 'آذر', collected: 122000000, expected: 130000000 },
  { month: 'دی', collected: 142000000, expected: 145000000 },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState<'overview' | 'debtors' | 'expenses' | 'income'>('overview');
  const [showPayment, setShowPayment] = useState(false);
  const [search, setSearch] = useState('');

  const filteredDebtors = financialDebtors.filter(d => !search || d.name.includes(search));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">مالی و حسابداری</h1>
          <p className="text-sm text-gray-500">مدیریت درآمد، هزینه و بدهی‌ها</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Download size={14} />}>گزارش مالی</Button>
          <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowPayment(true)}>ثبت پرداخت</Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'درآمد ماه جاری', value: '۱۴۲ میلیون', sub: '۸٪ رشد', icon: <TrendingUp size={18} />, color: 'bg-green-50 text-green-700' },
          { label: 'بدهی معوق', value: '۲۸.۹ میلیون', sub: `${financialDebtors.length} نفر`, icon: <AlertCircle size={18} />, color: 'bg-red-50 text-red-700' },
          { label: 'هزینه‌های جاری', value: '۵۱ میلیون', sub: 'این ماه', icon: <TrendingDown size={18} />, color: 'bg-orange-50 text-orange-700' },
          { label: 'سود خالص', value: '۹۱ میلیون', sub: 'تراز مثبت', icon: <DollarSign size={18} />, color: 'bg-blue-50 text-blue-700' },
        ].map(s => (
          <div key={s.label} className={cn('rounded-xl p-4', s.color)}>
            <div className="flex items-center gap-2 mb-2">{s.icon} <span className="text-xs opacity-75">{s.label}</span></div>
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs opacity-60 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
        {(['overview', 'debtors', 'income', 'expenses'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {tab === 'overview' ? 'نمای کلی' : tab === 'debtors' ? 'بدهکاران' : tab === 'income' ? 'اقلام شهریه' : 'هزینه‌ها'}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4">
          <Card>
            <CardHeader><span className="font-semibold text-sm text-gray-800">روند وصولی ماهانه</span></CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => (v / 1000000).toFixed(0) + 'م'} />
                  <Tooltip formatter={(v: any) => [(v / 1000000).toFixed(1) + ' میلیون']} />
                  <Line type="monotone" dataKey="collected" name="وصول شده" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="expected" name="پیش‌بینی" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><span className="font-semibold text-sm text-gray-800">توزیع هزینه‌ها</span></CardHeader>
              <CardBody>
                {[
                  { label: 'حقوق پرسنل', pct: 65, amount: '۳۳ میلیون', color: 'bg-blue-500' },
                  { label: 'آب، برق، گاز', pct: 12, amount: '۶.۱ میلیون', color: 'bg-green-500' },
                  { label: 'تجهیزات', pct: 10, amount: '۵.۱ میلیون', color: 'bg-orange-500' },
                  { label: 'تعمیرات', pct: 8, amount: '۴.۱ میلیون', color: 'bg-purple-500' },
                  { label: 'سایر', pct: 5, amount: '۲.۵ میلیون', color: 'bg-gray-400' },
                ].map(e => (
                  <div key={e.label} className="flex items-center gap-3 mb-2">
                    <div className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0', e.color)} />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-gray-700">{e.label}</span>
                        <span className="text-gray-500">{e.amount}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={cn('h-1.5 rounded-full', e.color)} style={{ width: `${e.pct}%` }} />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 w-8">{e.pct}٪</span>
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader><span className="font-semibold text-sm text-gray-800">آخرین تراکنش‌ها</span></CardHeader>
              <div className="divide-y divide-gray-50">
                {[
                  { name: 'علی رضایی', type: 'شهریه', amount: 5000000, method: 'آنلاین', time: '۲ ساعت پیش', positive: true },
                  { name: 'فاطمه احمدی', type: 'سرویس', amount: 2500000, method: 'کارتخوان', time: '۴ ساعت پیش', positive: true },
                  { name: 'خرید تجهیزات', type: 'هزینه', amount: 3200000, method: 'نقدی', time: 'دیروز', positive: false },
                  { name: 'محمد حسینی', type: 'شهریه', amount: 4500000, method: 'چک', time: 'دیروز', positive: true },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3">
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', t.positive ? 'bg-green-100' : 'bg-red-100')}>
                      <CreditCard size={14} className={t.positive ? 'text-green-600' : 'text-red-600'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.type} | {t.method} | {t.time}</p>
                    </div>
                    <span className={cn('text-sm font-semibold', t.positive ? 'text-green-600' : 'text-red-600')}>
                      {t.positive ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'debtors' && (
        <div className="space-y-4">
          <Card>
            <CardBody className="py-3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full border border-gray-200 rounded-lg pr-9 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="جستجو بر اساس نام..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">ارسال یادآوری انبوه</Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-800">لیست بدهکاران ({filteredDebtors.length} نفر)</span>
                <span className="text-xs text-red-600 font-medium">جمع کل: ۲۸.۹ میلیون تومان</span>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100">
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">دانش‌آموز</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">پایه</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">مبلغ بدهی</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">مدت</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredDebtors.map(d => (
                    <tr key={d.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-800">{d.name}</td>
                      <td className="px-4 py-3 text-gray-600">{d.grade}</td>
                      <td className="px-4 py-3 text-center font-semibold text-red-600">{formatCurrency(d.amount)}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{d.days} روز</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={debtStatus[d.status].variant}>{debtStatus[d.status].label}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setShowPayment(true)}>ثبت پرداخت</Button>
                          <Button size="sm" variant="ghost">پیامک</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'income' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-gray-800">اقلام دریافتی</span>
              <Button size="sm" icon={<Plus size={13} />}>قلم جدید</Button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">نام قلم</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">نوع</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">مبلغ</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">پایه</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {incomeItems.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                    <td className="px-4 py-3"><Badge variant={item.type === 'شهریه ثابت' ? 'info' : 'warning'}>{item.type}</Badge></td>
                    <td className="px-4 py-3 text-center font-medium text-green-600">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-3 text-gray-600">{item.grade}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">ویرایش</Button>
                        <Button size="sm" variant="ghost">تخفیف</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'expenses' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-gray-800">هزینه‌های ثبت‌شده</span>
              <Button size="sm" icon={<Plus size={13} />}>ثبت هزینه جدید</Button>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عنوان</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">دسته</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">مبلغ</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">تاریخ</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">فاکتور</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { title: 'قبض برق', cat: 'آب‌وبرق', amount: 1800000, date: '۱۴۰۳/۱۰/۰۱', hasDoc: true },
                  { title: 'تعمیر پروژکتور', cat: 'تعمیرات', amount: 850000, date: '۱۴۰۳/۱۰/۰۳', hasDoc: false },
                  { title: 'خرید کاغذ', cat: 'اداری', amount: 320000, date: '۱۴۰۳/۱۰/۰۵', hasDoc: true },
                  { title: 'حقوق دی ماه', cat: 'حقوق', amount: 33000000, date: '۱۴۰۳/۱۰/۰۸', hasDoc: true },
                ].map((e, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{e.title}</td>
                    <td className="px-4 py-3"><Badge variant="default">{e.cat}</Badge></td>
                    <td className="px-4 py-3 text-center font-medium text-red-600">{formatCurrency(e.amount)}</td>
                    <td className="px-4 py-3 text-gray-600">{e.date}</td>
                    <td className="px-4 py-3">
                      {e.hasDoc ? (
                        <span className="text-xs text-green-600 flex items-center gap-1"><Check size={12} /> آپلود شده</span>
                      ) : (
                        <Button size="sm" variant="ghost">آپلود</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Payment Modal */}
      <Modal open={showPayment} onClose={() => setShowPayment(false)} title="ثبت پرداخت جدید" size="md">
        <div className="space-y-4">
          <Input label="نام دانش‌آموز / والدین" placeholder="جستجو..." />
          <Input label="مبلغ (تومان)" placeholder="مثلاً ۵۰۰۰۰۰۰" type="number" />
          <Select label="روش پرداخت" options={paymentMethods} />
          <Input label="شماره پیگیری / رسید" placeholder="اختیاری" />
          <Input label="تاریخ پرداخت" type="text" placeholder="۱۴۰۳/۱۰/۱۴" />
          <Input label="توضیحات" placeholder="اختیاری" />
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 justify-center" icon={<Check size={14} />}>ثبت پرداخت و صدور رسید</Button>
            <Button variant="outline" onClick={() => setShowPayment(false)}>انصراف</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
