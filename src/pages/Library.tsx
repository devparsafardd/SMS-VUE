import { useState } from 'react';
import { Search, Plus, BookOpen, AlertCircle, RotateCcw } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';

const books = [
  { id: '1', title: 'ریاضیات عمومی', author: 'دکتر محمدی', publisher: 'دانش', year: '1401', isbn: '978-964-0-00000-0', total: 5, available: 3, category: 'آموزشی' },
  { id: '2', title: 'بوف کور', author: 'صادق هدایت', publisher: 'جامی', year: '1398', isbn: '978-964-0-00001-7', total: 2, available: 2, category: 'ادبیات' },
  { id: '3', title: 'شازده کوچولو', author: 'سنت اگزوپری', publisher: 'نشر آفرینش', year: '1400', isbn: '978-964-0-00002-4', total: 3, available: 0, category: 'ادبیات' },
  { id: '4', title: 'فیزیک هالیدی', author: 'هالیدی و رزنیک', publisher: 'مرکز نشر', year: '1402', isbn: '978-964-0-00003-1', total: 4, available: 2, category: 'آموزشی' },
];

const loans = [
  { id: '1', book: 'ریاضیات عمومی', borrower: 'علی رضایی', type: 'دانش‌آموز', loanDate: '۱۴۰۳/۰۹/۱۵', dueDate: '۱۴۰۳/۱۰/۱۵', status: 'active', overdue: false },
  { id: '2', book: 'فیزیک هالیدی', borrower: 'آقای موسوی', type: 'معلم', loanDate: '۱۴۰۳/۰۹/۰۱', dueDate: '۱۴۰۳/۱۰/۰۱', status: 'overdue', overdue: true },
  { id: '3', book: 'شازده کوچولو', borrower: 'فاطمه احمدی', type: 'دانش‌آموز', loanDate: '۱۴۰۳/۰۹/۲۰', dueDate: '۱۴۰۳/۱۰/۲۰', status: 'active', overdue: false },
];

export default function Library() {
  const [activeTab, setActiveTab] = useState<'books' | 'loans'>('books');
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [showLoan, setShowLoan] = useState(false);

  const filteredBooks = books.filter(b => !search || b.title.includes(search) || b.author.includes(search));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">کتابخانه</h1>
          <p className="text-sm text-gray-500">مدیریت کتاب‌ها، امانت و بازگشت</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" icon={<BookOpen size={14} />} onClick={() => setShowLoan(true)}>ثبت امانت</Button>
          <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowAdd(true)}>کتاب جدید</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'کل کتاب‌ها', value: books.reduce((a, b) => a + b.total, 0), color: 'bg-blue-50 text-blue-700' },
          { label: 'موجود', value: books.reduce((a, b) => a + b.available, 0), color: 'bg-green-50 text-green-700' },
          { label: 'امانت داده شده', value: loans.length, color: 'bg-orange-50 text-orange-700' },
          { label: 'دیرکرد', value: loans.filter(l => l.overdue).length, color: 'bg-red-50 text-red-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs opacity-75 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(['books', 'loans'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {tab === 'books' ? 'کتاب‌ها' : 'امانت‌ها'}
            </button>
          ))}
        </div>
        <div className="flex-1 relative max-w-xs">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="w-full border border-gray-200 rounded-lg pr-8 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="جستجو..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {activeTab === 'books' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عنوان کتاب</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden md:table-cell">نویسنده</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden lg:table-cell">دسته</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">موجودی</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBooks.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                          <BookOpen size={13} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{b.title}</p>
                          <p className="text-xs text-gray-400">{b.isbn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{b.author}</td>
                    <td className="px-4 py-3 hidden lg:table-cell"><Badge variant="info">{b.category}</Badge></td>
                    <td className="px-4 py-3 text-center">
                      <span className={b.available === 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                        {b.available}
                      </span>
                      <span className="text-gray-400 text-xs">/{b.total}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={b.available > 0 ? 'success' : 'danger'}>
                        {b.available > 0 ? 'موجود' : 'ناموجود'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => setShowLoan(true)}>امانت</Button>
                        <Button size="sm" variant="ghost" icon={<RotateCcw size={12} />} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'loans' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100">
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">کتاب</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">گیرنده</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 hidden md:table-cell">تاریخ امانت</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">بازگشت مورد انتظار</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">وضعیت</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loans.map(loan => (
                  <tr key={loan.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{loan.book}</td>
                    <td className="px-4 py-3">
                      <p className="text-gray-800">{loan.borrower}</p>
                      <p className="text-xs text-gray-400">{loan.type}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{loan.loanDate}</td>
                    <td className="px-4 py-3">
                      <p className={loan.overdue ? 'text-red-600 font-medium' : 'text-gray-600'}>{loan.dueDate}</p>
                      {loan.overdue && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> دیرکرد!</p>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={loan.overdue ? 'danger' : 'success'}>{loan.overdue ? 'دیرکرد' : 'فعال'}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="outline" icon={<RotateCcw size={12} />}>بازگشت</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="افزودن کتاب جدید" size="lg">
        <div className="grid grid-cols-2 gap-4">
          <Input label="عنوان کتاب" placeholder="عنوان..." />
          <Input label="نویسنده" placeholder="نویسنده..." />
          <Input label="ناشر" placeholder="ناشر..." />
          <Input label="سال چاپ" placeholder="۱۴۰۲" />
          <Input label="شابک (ISBN)" placeholder="978-964-..." />
          <Input label="تعداد نسخه" type="number" placeholder="۵" />
          <Select label="دسته‌بندی" options={[
            { value: 'edu', label: 'آموزشی' },
            { value: 'lit', label: 'ادبیات' },
            { value: 'sci', label: 'علمی' },
            { value: 'other', label: 'سایر' },
          ]} />
          <Input label="مکان قفسه" placeholder="قفسه ۱ - ردیف ۳" />
        </div>
        <div className="flex gap-3 mt-4">
          <Button className="flex-1 justify-center">ثبت کتاب</Button>
          <Button variant="outline" onClick={() => setShowAdd(false)}>انصراف</Button>
        </div>
      </Modal>

      <Modal open={showLoan} onClose={() => setShowLoan(false)} title="ثبت امانت">
        <div className="space-y-4">
          <Input label="کتاب" placeholder="جستجوی عنوان کتاب..." />
          <Input label="گیرنده (نام یا کد ملی)" placeholder="جستجو..." />
          <Select label="نوع گیرنده" options={[
            { value: 'student', label: 'دانش‌آموز' },
            { value: 'teacher', label: 'معلم' },
          ]} />
          <Input label="تاریخ بازگشت مورد انتظار" placeholder="۱۴۰۳/۱۱/۱۵" />
          <div className="flex gap-3">
            <Button className="flex-1 justify-center">ثبت امانت</Button>
            <Button variant="outline" onClick={() => setShowLoan(false)}>انصراف</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
