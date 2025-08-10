import React from 'react';
import { useTranslation } from 'next-i18next';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType = 'neutral', icon }) => {
  const { t } = useTranslation();
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-neutral-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{t(title)}</p>
          <p className="text-3xl font-bold text-neutral-900 mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${getChangeColor()}`}>
              {changeType === 'increase' && '↗'} 
              {changeType === 'decrease' && '↘'} 
              {t(change)}
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
