import { useState } from 'react';
import { Search, UserPlus, Filter, Download, Eye, Edit, Phone, MoreVertical, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import { students } from '../data/mockData';
import { cn } from '../utils/cn';

const statusLabels: Record<string, { label: string; variant: 'success' | 'danger' | 'warning' }> = {
  active: { label: 'فعال', variant: 'success' },
  inactive: { label: 'غیرفعال', variant: 'danger' },
  transferred: { label: 'انتقالی', variant: 'warning' },
};

const gradeOptions = [
  { value: '', label: 'همه پایه‌ها' },
  { value: 'دهم', label: 'دهم' },
  { value: 'یازدهم', label: 'یازدهم' },
  { value: 'دوازدهم', label: 'دوازدهم' },
];

const fieldOptions = [
  { value: '', label: 'همه رشته‌ها' },
  { value: 'ریاضی', label: 'ریاضی' },
  { value: 'تجربی', label: 'تجربی' },
  { value: 'انسانی', label: 'انسانی' },
];

export default function Students() {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [fieldFilter, setFieldFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState<typeof students[0] | null>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);

  const filtered = students.filter(s => {
    const matchSearch = !search || s.name.includes(search) || s.nationalCode.includes(search);
    const matchGrade = !gradeFilter || s.grade === gradeFilter;
    const matchField = !fieldFilter || s.field === fieldFilter;
    return matchSearch && matchGrade && matchField;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">دانش‌آموزان</h1>
          <p className="text-sm text-gray-500">مدیریت پرونده دانش‌آموزان</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Download size={14} />}>خروجی Excel</Button>
          <Button size="sm" icon={<UserPlus size={14} />} onClick={() => setShowAdd(true)}>دانش‌آموز جدید</Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-48 relative">
              <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full border border-gray-200 rounded-lg pr-9 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="جستجو بر اساس نام یا کد ملی..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="w-36">
              <Select options={gradeOptions} value={gradeFilter} onChange={e => setGradeFilter(e.target.value)} />
            </div>
            <div className="w-36">
              <Select options={fieldOptions} value={fieldFilter} onChange={e => setFieldFilter(e.target.value)} />
            </div>
            <Button variant="ghost" size="sm" icon={<Filter size={14} />}>فیلتر پیشرفته</Button>
          </div>
        </CardBody>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'کل دانش‌آموزان', value: 487, color: 'bg-blue-50 text-blue-700' },
          { label: 'دانش‌آموزان فعال', value: 472, color: 'bg-green-50 text-green-700' },
          { label: 'ثبت‌نام‌های جدید', value: 14, color: 'bg-orange-50 text-orange-700' },
          { label: 'دانش‌آموزان انتقالی', value: 8, color: 'bg-purple-50 text-purple-700' },
        ].map(s => (
          <div key={s.label} className={cn('rounded-xl p-3', s.color)}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs mt-0.5 opacity-75">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-gray-800">لیست دانش‌آموزان ({filtered.length} نفر)</span>
            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
              مرتب‌سازی <ChevronDown size={12} />
            </button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100">
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">نام و نام خانوادگی</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden md:table-cell">کد ملی</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">پایه / رشته</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden sm:table-cell">کلاس</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden lg:table-cell">تلفن والدین</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold flex-shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{s.nationalCode}</td>
                  <td className="px-4 py-3">
                    <span className="text-gray-700">{s.grade}</span>
                    <span className="text-gray-400 text-xs mr-1">({s.field})</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{s.className}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <a href={`tel:${s.parentPhone}`} className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-xs">
                      <Phone size={12} />
                      {s.parentPhone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusLabels[s.status].variant}>{statusLabels[s.status].label}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setShowDetail(s)} className="p-1.5 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye size={15} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit size={15} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setActiveRow(activeRow === s.id ? null : s.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <MoreVertical size={15} />
                        </button>
                        {activeRow === s.id && (
                          <div className="absolute left-0 top-8 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-36 z-10">
                            <button className="w-full text-right px-4 py-2 text-xs hover:bg-gray-50 text-gray-700">مشاهده کارنامه</button>
                            <button className="w-full text-right px-4 py-2 text-xs hover:bg-gray-50 text-gray-700">پرونده انضباطی</button>
                            <button className="w-full text-right px-4 py-2 text-xs hover:bg-gray-50 text-gray-700">پرونده مشاوره</button>
                            <button className="w-full text-right px-4 py-2 text-xs hover:bg-red-50 text-red-600">غیرفعال کردن</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">نتیجه‌ای یافت نشد</p>
            </div>
          )}
        </div>
      </Card>

      {/* Add Student Modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="افزودن دانش‌آموز جدید" size="lg">
        <div className="grid grid-cols-2 gap-4">
          <Input label="نام" placeholder="نام" />
          <Input label="نام خانوادگی" placeholder="نام خانوادگی" />
          <Input label="کد ملی" placeholder="کد ملی ۱۰ رقمی" />
          <Input label="تاریخ تولد" placeholder="۱۳۸۵/۰۱/۰۱" type="text" />
          <Select label="پایه تحصیلی" options={gradeOptions} />
          <Select label="رشته تحصیلی" options={fieldOptions} />
          <Input label="نام پدر" placeholder="نام پدر" />
          <Input label="شماره تماس والدین" placeholder="09XXXXXXXXX" />
          <div className="col-span-2">
            <Input label="آدرس" placeholder="آدرس سکونت" />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <Button className="flex-1 justify-center">ثبت دانش‌آموز</Button>
          <Button variant="outline" onClick={() => setShowAdd(false)}>انصراف</Button>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal open={!!showDetail} onClose={() => setShowDetail(null)} title={showDetail?.name || ''} size="lg">
        {showDetail && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 text-2xl font-bold">
                {showDetail.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{showDetail.name}</h3>
                <p className="text-sm text-gray-500">{showDetail.grade} - {showDetail.field} | {showDetail.className}</p>
                <Badge variant={statusLabels[showDetail.status].variant} className="mt-1">{statusLabels[showDetail.status].label}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: 'کد ملی', value: showDetail.nationalCode },
                { label: 'کلاس', value: showDetail.className },
                { label: 'تلفن والدین', value: showDetail.parentPhone },
                { label: 'وضعیت', value: statusLabels[showDetail.status].label },
              ].map(r => (
                <div key={r.label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">{r.label}</p>
                  <p className="font-medium text-gray-800 mt-0.5">{r.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 justify-center">مشاهده کارنامه</Button>
              <Button size="sm" variant="outline" className="flex-1 justify-center">پرونده مشاوره</Button>
              <Button size="sm" variant="outline" className="flex-1 justify-center">پرونده انضباطی</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
