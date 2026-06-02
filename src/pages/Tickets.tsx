import { useState } from 'react';
import { Plus, Search, MessageSquare, Clock, CheckCircle, XCircle, Star } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import { tickets } from '../data/mockData';
import { cn } from '../utils/cn';

type TicketStatus = 'new' | 'in_progress' | 'answered' | 'closed';

const statusConfig: Record<TicketStatus, { label: string; variant: 'danger' | 'warning' | 'info' | 'success'; icon: React.ReactNode }> = {
  new: { label: 'جدید', variant: 'danger', icon: <MessageSquare size={13} /> },
  in_progress: { label: 'در بررسی', variant: 'warning', icon: <Clock size={13} /> },
  answered: { label: 'پاسخ داده شده', variant: 'info', icon: <CheckCircle size={13} /> },
  closed: { label: 'بسته شده', variant: 'success', icon: <XCircle size={13} /> },
};

const priorityConfig: Record<string, { label: string; cls: string }> = {
  urgent: { label: 'اضطراری', cls: 'text-red-600 bg-red-50' },
  high: { label: 'مهم', cls: 'text-orange-600 bg-orange-50' },
  normal: { label: 'عادی', cls: 'text-blue-600 bg-blue-50' },
};

const categoryOpts = [
  { value: '', label: 'همه موضوعات' },
  { value: 'آموزشی', label: 'آموزشی' },
  { value: 'مالی', label: 'مالی' },
  { value: 'انضباطی', label: 'انضباطی' },
  { value: 'سرویس', label: 'سرویس' },
  { value: 'سایر', label: 'سایر' },
];

export default function Tickets() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [activeTicket, setActiveTicket] = useState<typeof tickets[0] | null>(null);
  const [reply, setReply] = useState('');

  const filtered = tickets.filter(t =>
    (!search || t.title.includes(search) || t.student.includes(search)) &&
    (!filter || t.category === filter)
  );

  const stats = {
    new: tickets.filter(t => t.status === 'new').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    answered: tickets.filter(t => t.status === 'answered').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">تیکت‌های پشتیبانی</h1>
          <p className="text-sm text-gray-500">مدیریت درخواست‌ها و پشتیبانی</p>
        </div>
        <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowNew(true)}>تیکت جدید</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'جدید', key: 'new', color: 'bg-red-50 text-red-700' },
          { label: 'در بررسی', key: 'in_progress', color: 'bg-orange-50 text-orange-700' },
          { label: 'پاسخ داده شده', key: 'answered', color: 'bg-blue-50 text-blue-700' },
          { label: 'بسته شده', key: 'closed', color: 'bg-green-50 text-green-700' },
        ].map(s => (
          <div key={s.key} className={cn('rounded-xl p-4', s.color)}>
            <p className="text-2xl font-bold">{stats[s.key as TicketStatus]}</p>
            <p className="text-xs opacity-75 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="py-3">
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 min-w-48 relative">
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full border border-gray-200 rounded-lg pr-9 pl-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="جستجو..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select options={categoryOpts} value={filter} onChange={e => setFilter(e.target.value)} label="" />
          </div>
        </CardBody>
      </Card>

      {/* Ticket list */}
      <Card>
        <CardHeader>
          <span className="font-semibold text-sm text-gray-800">لیست تیکت‌ها ({filtered.length})</span>
        </CardHeader>
        <div className="divide-y divide-gray-50">
          {filtered.map(t => (
            <div
              key={t.id}
              onClick={() => setActiveTicket(t)}
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className={cn('w-1 h-10 rounded-full flex-shrink-0', {
                'bg-red-500': t.priority === 'urgent',
                'bg-orange-500': t.priority === 'high',
                'bg-blue-500': t.priority === 'normal',
              })} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-800">{t.title}</span>
                  <span className={cn('text-xs px-1.5 py-0.5 rounded', priorityConfig[t.priority]?.cls)}>
                    {priorityConfig[t.priority]?.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{t.student}</span>
                  <span>•</span>
                  <span>{t.category}</span>
                  <span>•</span>
                  <span>{t.date}</span>
                </div>
              </div>
              <Badge variant={statusConfig[t.status as TicketStatus]?.variant}>
                {statusConfig[t.status as TicketStatus]?.label}
              </Badge>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">تیکتی یافت نشد</div>
          )}
        </div>
      </Card>

      {/* New Ticket Modal */}
      <Modal open={showNew} onClose={() => setShowNew(false)} title="ثبت تیکت جدید" size="md">
        <div className="space-y-4">
          <Input label="عنوان" placeholder="موضوع درخواست..." />
          <Select label="موضوع" options={categoryOpts.filter(o => o.value)} />
          <Select label="اولویت" options={[
            { value: 'normal', label: 'عادی' },
            { value: 'high', label: 'مهم' },
            { value: 'urgent', label: 'اضطراری' },
          ]} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="توضیحات کامل درخواست خود را بنویسید..."
            />
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-sm text-gray-400 cursor-pointer hover:border-blue-300 transition-colors">
            + آپلود فایل (اختیاری)
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 justify-center">ثبت تیکت</Button>
            <Button variant="outline" onClick={() => setShowNew(false)}>انصراف</Button>
          </div>
        </div>
      </Modal>

      {/* Ticket Detail Modal */}
      <Modal open={!!activeTicket} onClose={() => setActiveTicket(null)} title={activeTicket?.title || ''} size="lg">
        {activeTicket && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">ثبت‌کننده</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{activeTicket.student}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">دسته‌بندی</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{activeTicket.category}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">تاریخ ثبت</p>
                <p className="text-sm font-medium text-gray-800 mt-0.5">{activeTicket.date}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">وضعیت</p>
                <Badge variant={statusConfig[activeTicket.status as TicketStatus]?.variant} className="mt-1">
                  {statusConfig[activeTicket.status as TicketStatus]?.label}
                </Badge>
              </div>
            </div>

            {/* Conversation */}
            <div className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50 max-h-48 overflow-y-auto">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">{activeTicket.student} - {activeTicket.date}</p>
                <p className="text-sm text-gray-700">سلام. می‌خواستم درباره این مشکل راهنمایی بخواهم.</p>
              </div>
            </div>

            {/* Reply */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">پاسخ</label>
              <textarea
                rows={3}
                value={reply}
                onChange={e => setReply(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="پاسخ خود را بنویسید..."
              />
            </div>

            {activeTicket.status === 'closed' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2">
                <Star size={14} className="text-yellow-500" />
                <span className="text-sm text-yellow-700">رضایت‌سنجی: آیا از پاسخ راضی بودید؟</span>
                <div className="flex gap-1 mr-auto">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} className="text-yellow-400 hover:text-yellow-500">★</button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button className="flex-1 justify-center" icon={<MessageSquare size={14} />}>ارسال پاسخ</Button>
              <Button variant="outline">تغییر وضعیت</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
