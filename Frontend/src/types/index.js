// User Types
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'employer' | 'employee'} role
 * @property {string} [walletAddress]
 */

/**
 * @typedef {User} Employee
 * @property {string} employeeId
 * @property {string} department
 * @property {string} designation
 * @property {string} salary
 * @property {string} joiningDate
 * @property {'active' | 'inactive' | 'pending'} status
 */

// Payment Types
/**
 * @typedef {Object} Payment
 * @property {string} id
 * @property {string} amount
 * @property {string} currency
 * @property {string} recipient
 * @property {string} date
 * @property {'completed' | 'pending' | 'failed'} status
 * @property {string} [txHash]
 */

// ESOP Types
/**
 * @typedef {Object} Token
 * @property {string} id
 * @property {number} amount
 * @property {string} vestingDate
 * @property {'vested' | 'unvested'} status
 * @property {number} price
 */

/**
 * @typedef {Object} VestingSchedule
 * @property {number} totalTokens
 * @property {number} vestedTokens
 * @property {Object} nextVesting
 * @property {string} nextVesting.date
 * @property {number} nextVesting.amount
 */

// Chart Types
/**
 * @typedef {Object} ChartData
 * @property {string} name
 * @property {number} value
 * @property {string} [color]
 */

// Component Props Types
/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children
 * @property {'primary' | 'secondary' | 'outline'} [variant]
 * @property {'sm' | 'md' | 'lg'} [size]
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {Function} [onClick]
 * @property {string} [className]
 */

/**
 * @typedef {Object} CardProps
 * @property {string} [title]
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen
 * @property {Function} onClose
 * @property {string} [title]
 * @property {React.ReactNode} children
 */

// Export empty object since we're using JSDoc for types
export {};