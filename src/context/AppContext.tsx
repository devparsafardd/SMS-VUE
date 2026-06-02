import { createContext, useContext, useState, type ReactNode } from 'react';
import type { PageView, UserRole } from '../types';
import { currentUser } from '../data/mockData';

interface AppContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  userRole: UserRole;
  setUserRole: (r: UserRole) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  currentSchool: string;
  setCurrentSchool: (s: string) => void;
  user: typeof currentUser;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageView>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('school_admin');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentSchool, setCurrentSchool] = useState('دبیرستان شهید رجایی');
  const user = currentUser;

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      isLoggedIn, setIsLoggedIn,
      userRole, setUserRole,
      sidebarOpen, setSidebarOpen,
      currentSchool, setCurrentSchool,
      user,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
