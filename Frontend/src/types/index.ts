// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employer' | 'employee';
  walletAddress?: string;
}

export interface Employee extends User {
  employeeId: string;
  department: string;
  designation: string;
  salary: string;
  joiningDate: string;
  status: 'active' | 'inactive' | 'pending';
}

// Payment Types
export interface Payment {
  id: string;
  amount: string;
  currency: string;
  recipient: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
}

// ESOP Types
export interface Token {
  id: string;
  amount: number;
  vestingDate: string;
  status: 'vested' | 'unvested';
  price: number;
}

export interface VestingSchedule {
  totalTokens: number;
  vestedTokens: number;
  nextVesting: {
    date: string;
    amount: number;
  };
}

// Chart Types
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}