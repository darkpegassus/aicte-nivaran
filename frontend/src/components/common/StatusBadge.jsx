import React from 'react';
import { getStatusColor, getPriorityBadge } from '../../utils/helpers';

export const StatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${getPriorityBadge(priority)}`}>
      {priority}
    </span>
  );
};

export default StatusBadge;