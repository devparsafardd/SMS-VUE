import { useState } from 'react';
import { Send, Search, Plus, Phone, File, Smile, CheckCheck, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const conversations = [
  {
    id: '1',
    name: 'علی رضایی (والدین)',
    lastMsg: 'ممنون از پیگیری شما',
    time: '۱۰:۳۲',
    unread: 0,
    role: 'parent',
    avatar: 'ع',
    online: false,
  },
  {
    id: '2',
    name: 'آقای موسوی (معلم ریاضی)',
    lastMsg: 'نمرات تا فردا ثبت می‌کنم',
    time: '۰۹:۱۵',
    unread: 2,
    role: 'teacher',
    avatar: 'م',
    online: true,
  },
  {
    id: '3',
    name: 'گروه ۱۰-الف',
    lastMsg: 'تکلیف ریاضی چیه؟',
    time: 'دیروز',
    unread: 5,
    role: 'class',
    avatar: 'گ',
    online: false,
  },
  {
    id: '4',
    name: 'خانم احمدی (والدین)',
    lastMsg: 'سلام، فاطمه امروز مریض است',
    time: 'دیروز',
    unread: 0,
    role: 'parent',
    avatar: 'خ',
    online: false,
  },
  {
    id: '5',
    name: 'گروه معلمان',
    lastMsg: 'جلسه فردا ساعت ۱۴',
    time: 'دیروز',
    unread: 1,
    role: 'group',
    avatar: 'گ',
    online: false,
  },
];

const demoMessages = [
  { id: '1', text: 'سلام، می‌خواستم درباره نمره ریاضی فرزندم صحبت کنم.', time: '۰۸:۳۰', mine: false },
  { id: '2', text: 'سلام. بفرمایید. چه مشکلی هست؟', time: '۰۸:۳۵', mine: true },
  { id: '3', text: 'نمره‌اش از ۱۸ به ۱۵ کاهش پیدا کرده. نگران هستم.', time: '۰۸:۳۶', mine: false },
  { id: '4', text: 'بله، متوجه شدیم. علی در چند تکلیف اخیر کمی کم‌دقتی داشته. پیشنهاد می‌کنم با معلم ریاضی هماهنگ کنیم.', time: '۰۸:۴۰', mine: true },
  { id: '5', text: 'ممنون از پیگیری شما', time: '۱۰:۳۲', mine: false },
];

const roleColors: Record<string, string> = {
  parent: 'bg-blue-100 text-blue-700',
  teacher: 'bg-green-100 text-green-700',
  class: 'bg-purple-100 text-purple-700',
  group: 'bg-orange-100 text-orange-700',
};

const roleLabels: Record<string, string> = {
  parent: 'والدین',
  teacher: 'معلم',
  class: 'کلاس',
  group: 'گروه',
};

export default function Messages() {
  const [activeConv, setActiveConv] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(demoMessages);
  const [search, setSearch] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: newMessage,
      time: 'همین الان',
      mine: true,
    }]);
    setNewMessage('');
  };

  const filtered = conversations.filter(c => !search || c.name.includes(search));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">پیام‌رسان</h1>
          <p className="text-sm text-gray-500">ارتباط با معلمان، والدین و مدیران</p>
        </div>
        <Button size="sm" icon={<Plus size={14} />}>گفتگوی جدید</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden" style={{ height: '600px' }}>
        {/* Conversation list */}
        <div className="border-l border-gray-100 flex flex-col">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full bg-gray-50 rounded-lg pr-8 pl-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="جستجو در گفتگوها..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filtered.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-right',
                  activeConv.id === conv.id && 'bg-blue-50'
                )}
              >
                <div className="relative flex-shrink-0">
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold', roleColors[conv.role])}>
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-800 truncate">{conv.name}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0 mr-1">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-400 truncate">{conv.lastMsg}</span>
                    {conv.unread > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mr-1">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
            <div className={cn('w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold', roleColors[activeConv.role])}>
              {activeConv.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{activeConv.name}</p>
              <p className="text-xs text-gray-400">
                <span className={cn('inline-flex items-center gap-1', roleColors[activeConv.role], 'px-1.5 py-0.5 rounded text-xs')}>
                  {roleLabels[activeConv.role]}
                </span>
                {activeConv.online && <span className="text-green-600 mr-2">● آنلاین</span>}
              </p>
            </div>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><Phone size={15} /></button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><MoreVertical size={15} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div key={msg.id} className={cn('flex', msg.mine ? 'justify-start' : 'justify-end')}>
                <div className={cn(
                  'max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl text-sm',
                  msg.mine
                    ? 'bg-blue-600 text-white rounded-tl-none'
                    : 'bg-white text-gray-800 rounded-tr-none shadow-sm border border-gray-100'
                )}>
                  <p>{msg.text}</p>
                  <div className={cn('flex items-center justify-end gap-1 mt-1', msg.mine ? 'text-blue-200' : 'text-gray-400')}>
                    <span className="text-xs">{msg.time}</span>
                    {msg.mine && <CheckCheck size={12} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                <File size={16} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                <Smile size={16} />
              </button>
              <input
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="پیام خود را بنویسید..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
