export type UserRole =
  | 'superadmin'
  | 'school_admin'
  | 'edu_deputy'
  | 'teacher'
  | 'counselor'
  | 'accountant'
  | 'student'
  | 'parent'
  | 'librarian'
  | 'transport_manager'
  | 'nutrition_manager'
  | 'pta_manager';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  school?: string;
  avatar?: string;
  nationalCode: string;
}

export interface School {
  id: string;
  name: string;
  code: string;
  logo?: string;
  color: string;
  level: string;
  active: boolean;
}

export interface Student {
  id: string;
  name: string;
  nationalCode: string;
  grade: string;
  field: string;
  className: string;
  parentPhone: string;
  status: 'active' | 'inactive' | 'transferred';
  avatar?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: NavItem[];
  badge?: number;
  roles?: UserRole[];
}

export type PageView =
  | 'dashboard'
  | 'students'
  | 'classes'
  | 'schedule'
  | 'grades'
  | 'attendance'
  | 'exams'
  | 'discipline'
  | 'counseling'
  | 'content'
  | 'messages'
  | 'announcements'
  | 'tickets'
  | 'finance'
  | 'reports'
  | 'library'
  | 'transport'
  | 'inventory'
  | 'health'
  | 'cafeteria'
  | 'events'
  | 'settings'
  | 'login'
  | 'registration'
  | 'forms'
  | 'documents'
  | 'analytics';
