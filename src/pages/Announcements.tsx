import { useState } from 'react';
import { Plus, Eye, Megaphone, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, Select } from '../components/ui/Input';
import { announcements } from '../data/mockData';
import { cn } from '../utils/cn';

const priorityConfig: Record<string, { label: string; variant: 'danger' | 'warning' | 'info'; icon: React.ReactNode }> = {
  urgent: { label: 'فوری', variant: 'danger', icon: <AlertTriangle size={13} /> },
  important: { label: 'مهم', variant: 'warning', icon: <Megaphone size={13} /> },
  normal: { label: 'عادی', variant: 'info', icon: <Clock size={13} /> },
};

export default function Announcements() {
  const [showNew, setShowNew] = useState(false);
  const [detail, setDetail] = useState<typeof announcements[0] | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">اطلاعیه‌ها</h1>
          <p className="text-sm text-gray-500">مدیریت اطلاعیه‌های مدرسه</p>
        </div>
        <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowNew(true)}>اطلاعیه جدید</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* List */}
        <div className="md:col-span-2 space-y-3">
          {announcements.map(ann => {
            const pc = priorityConfig[ann.priority];
            return (
              <Card key={ann.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setDetail(ann)}>
                <CardBody>
                  <div className="flex items-start gap-3">
                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', {
                      'bg-red-100 text-red-600': ann.priority === 'urgent',
                      'bg-orange-100 text-orange-600': ann.priority === 'important',
                      'bg-blue-100 text-blue-600': ann.priority === 'normal',
                    })}>
                      {pc.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 text-sm truncate">{ann.title}</h3>
                        <Badge variant={pc.variant}>{pc.label}</Badge>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{ann.content}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>{ann.date}</span>
                        <span>مخاطب: {ann.audience}</span>
                        <span className="flex items-center gap-1"><Eye size={11} /> {ann.views} بازدید</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <Card>
            <CardHeader><span className="font-semibold text-sm text-gray-800">آمار اطلاعیه‌ها</span></CardHeader>
            <CardBody className="space-y-3">
              {[
                { label: 'کل اطلاعیه‌ها', value: 23, color: 'text-blue-600' },
                { label: 'این هفته', value: 3, color: 'text-green-600' },
                { label: 'فوری', value: 1, color: 'text-red-600' },
                { label: 'منتظر تأیید', value: 2, color: 'text-orange-600' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{s.label}</span>
                  <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader><span className="font-semibold text-sm text-gray-800">ارسال سریع</span></CardHeader>
            <CardBody className="space-y-2">
              {['همه', 'فقط معلمان', 'فقط والدین', 'پایه دهم', 'پایه یازدهم'].map(g => (
                <button key={g} className="w-full text-right text-xs py-2 px-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-gray-700">
                  📢 {g}
                </button>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* New Announcement Modal */}
      <Modal open={showNew} onClose={() => setShowNew(false)} title="اطلاعیه جدید" size="lg">
        <div className="space-y-4">
          <Input label="عنوان اطلاعیه" placeholder="عنوان..." />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">متن کامل</label>
            <textarea rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="متن اطلاعیه..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="سطح اهمیت" options={[
              { value: 'normal', label: 'عادی' },
              { value: 'important', label: 'مهم' },
              { value: 'urgent', label: 'فوری' },
            ]} />
            <Select label="مخاطبان" options={[
              { value: 'all', label: 'همه' },
              { value: 'teachers', label: 'فقط معلمان' },
              { value: 'parents', label: 'فقط والدین' },
              { value: 'students', label: 'فقط دانش‌آموزان' },
            ]} />
            <Input label="تاریخ انتشار" placeholder="فوری یا تاریخ مشخص" />
            <Input label="تاریخ انقضا" placeholder="تاریخ حذف خودکار" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="require_confirm" className="rounded" />
            <label htmlFor="require_confirm" className="text-sm text-gray-700">تأیید خواندن الزامی باشد</label>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-sm text-gray-400 cursor-pointer hover:border-blue-300">
            + ضمیمه فایل (اختیاری)
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 justify-center">انتشار اطلاعیه</Button>
            <Button variant="outline" onClick={() => setShowNew(false)}>انصراف</Button>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.title || ''} size="md">
        {detail && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={priorityConfig[detail.priority].variant}>{priorityConfig[detail.priority].label}</Badge>
              <span className="text-xs text-gray-400">{detail.date}</span>
              <span className="text-xs text-gray-400">• مخاطب: {detail.audience}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{detail.content}</p>
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Eye size={14} />
                <span>{detail.views} نفر مشاهده کرده‌اند</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
