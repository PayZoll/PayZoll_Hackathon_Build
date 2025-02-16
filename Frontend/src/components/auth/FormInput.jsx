import React from 'react';

const FormInput = React.forwardRef(({
  label,
  icon,
  endIcon,
  error,
  ...props
}, ref) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          ref={ref}
          className={`w-full bg-crypto-card border ${
            error ? 'border-red-500' : 'border-gray-800'
          } text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;