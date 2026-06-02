import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '../../utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { sidebarOpen } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main
        className={cn(
          'pt-14 min-h-screen transition-all duration-300',
          sidebarOpen ? 'pr-60' : 'pr-14'
        )}
      >
        <div className="p-4 md:p-5 max-w-screen-2xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
