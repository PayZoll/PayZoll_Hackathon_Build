// Authentication
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  WALLET_CONNECTION_FAILED: 'Failed to connect wallet',
  UNAUTHORIZED: 'Unauthorized access'
};

// Routes
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  EMPLOYER: {
    DASHBOARD: '/employer/dashboard',
    EMPLOYEES: '/employer/employees',
    PAYMENTS: '/employer/payments',
    ESOPS: '/employer/esops',
    SETTINGS: '/employer/settings'
  },
  EMPLOYEE: {
    DASHBOARD: '/employee/dashboard'
  }
};

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  EMPLOYEES: '/api/employees',
  PAYMENTS: '/api/payments',
  ESOPS: '/api/esops'
};

// Supported Cryptocurrencies
export const SUPPORTED_CURRENCIES = [
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'USDT', name: 'Tether' },
  { symbol: 'USDC', name: 'USD Coin' }
];

// Chart Colors
export const CHART_COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444'
};

// Status Colors
export const STATUS_COLORS = {
  active: 'text-green-400 bg-green-400/10',
  pending: 'text-yellow-400 bg-yellow-400/10',
  inactive: 'text-red-400 bg-red-400/10'
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }
};