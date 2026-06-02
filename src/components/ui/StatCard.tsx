import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'teal';
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  onClick?: () => void;
}

const colors = {
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-600', text: 'text-blue-600' },
  green: { bg: 'bg-green-50', icon: 'bg-green-100 text-green-600', text: 'text-green-600' },
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-100 text-orange-600', text: 'text-orange-600' },
  red: { bg: 'bg-red-50', icon: 'bg-red-100 text-red-600', text: 'text-red-600' },
  purple: { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-600', text: 'text-purple-600' },
  teal: { bg: 'bg-teal-50', icon: 'bg-teal-100 text-teal-600', text: 'text-teal-600' },
};

export function StatCard({ title, value, icon, color, change, changeType, onClick }: StatCardProps) {
  const c = colors[color];
  return (
    <div
      className={cn('bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4', onClick && 'cursor-pointer hover:shadow-md transition-shadow')}
      onClick={onClick}
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', c.icon)}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 truncate">{title}</p>
        <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
        {change && (
          <p className={cn('text-xs mt-0.5', changeType === 'up' ? 'text-green-600' : changeType === 'down' ? 'text-red-600' : 'text-gray-400')}>
            {changeType === 'up' ? '▲' : changeType === 'down' ? '▼' : ''} {change}
          </p>
        )}
      </div>
    </div>
  );
}
