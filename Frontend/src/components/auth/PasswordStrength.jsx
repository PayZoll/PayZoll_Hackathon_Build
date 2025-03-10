import React from 'react';
import zxcvbn from 'zxcvbn';

function PasswordStrength({ password }) {
  const result = zxcvbn(password || '');
  const score = result.score;

  const getStrengthColor = (score) => {
    switch (score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-500';
      case 4: return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getStrengthText = (score) => {
    switch (score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex h-1 space-x-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              index <= score ? getStrengthColor(score) : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
      {password && (
        <p className={`text-sm ${getStrengthColor(score)} text-right`}>
          {getStrengthText(score)}
        </p>
      )}
    </div>
  );
}

export default PasswordStrength;