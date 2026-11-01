export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Under Process':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Action Initiated':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Disposed':
    case 'Resolved':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Overdue':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const getPriorityBadge = (priority) => {
  switch (priority) {
    case 'Critical':
      return 'bg-red-100 text-red-800 border-red-300 font-semibold';
    case 'High':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'Medium':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Low':
      return 'bg-slate-100 text-slate-800 border-slate-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export const getSimilarityColor = (score) => {
  if (score >= 85) return 'text-rose-600 bg-rose-50 border-rose-200';
  if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-blue-600 bg-blue-50 border-blue-200';
};