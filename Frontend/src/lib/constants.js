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

export const CHAINS_BY_ID = {
  11155111: {
    name: "Ethereum Sepolia Testnet",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/PuNchGLgPXGKvzg2soOzGs_lCT_0KHiU",
    explorerUrl: "https://sepolia.etherscan.io",
    symbol: "SETH",
  },
  80002: {
    name: "Polygon Amoy Testnet",
    rpcUrl: "https://polygon-amoy.g.alchemy.com/v2/PuNchGLgPXGKvzg2soOzGs_lCT_0KHiU",
    explorerUrl: "https://amoy.polygonscan.com/",
    symbol: "MATIC",
  },
  420: {
    name: "Optimism Goerli Testnet",
    rpcUrl: "https://goerli.optimism.io/",
    explorerUrl: "https://goerli-optimism.etherscan.io/",
    symbol: "ETH",
  },
  421613: {
    name: "Arbitrum Sepolia Testnet",
    rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
    explorerUrl: "https://sepolia.arbiscan.io/",
    symbol: "ETH",
  },
  43113: {
    name: "Avalanche Fuji Testnet",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    explorerUrl: "https://cchain.explorer.avax-test.network/",
    symbol: "AVAX",
  },
  97: {
    name: "BNB Smart Chain Testnet",
    rpcUrl: "https://data-seed-prebsc-1-s1.bnbchain.org:8545/",
    explorerUrl: "https://testnet.bscscan.com/",
    symbol: "tBNB",
  },
  57054: {
    name: "Sonic Blaze Testnet",
    rpcUrl: "https://sonic-blaze.g.alchemy.com/v2/PuNchGLgPXGKvzg2soOzGs_lCT_0KHiU",
    explorerUrl: "https://testnet.sonicscan.org",
    symbol: "SNC",
  },
};

