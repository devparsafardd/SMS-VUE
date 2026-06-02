import { Construction } from 'lucide-react';

interface GenericPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function GenericPage({ title, description, icon }: GenericPageProps) {
  return (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
          {icon || <Construction size={28} />}
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-400">{description || 'این بخش در حال توسعه است و به زودی تکمیل می‌شود.'}</p>
      </div>
    </div>
  );
}
