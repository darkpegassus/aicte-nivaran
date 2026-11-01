import React from 'react';

const StatCard = ({ title, value, subtitle, icon: Icon, trend = null, color = 'blue' }) => {
  const colorMap = {
    blue: 'border-l-aicte-royal text-aicte-royal bg-blue-50',
    red: 'border-l-aicte-accentRed text-aicte-accentRed bg-red-50',
    green: 'border-l-aicte-accentGreen text-aicte-accentGreen bg-emerald-50',
    yellow: 'border-l-aicte-accentYellow text-amber-600 bg-amber-50',
    violet: 'border-l-aicte-accentViolet text-aicte-accentViolet bg-purple-50'
  };

  return (
    <div className={`relative overflow-hidden rounded-lg border border-aicte-border border-l-4 bg-white p-4 shadow-card ${colorMap[color] || colorMap.blue}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-aicte-textSecondary">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-aicte-navy">{value}</span>
            {trend && (
              <span className={`text-xs font-semibold ${trend.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorMap[color]}`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;