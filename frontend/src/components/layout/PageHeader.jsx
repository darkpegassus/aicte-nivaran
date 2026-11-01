import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, breadcrumbs = [], actions = null }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <nav className="mb-1 flex items-center gap-1.5 text-xs text-aicte-textSecondary">
          <Link to="/dashboard" className="hover:text-aicte-royal">OneView</Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="h-3 w-3 text-slate-400" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-aicte-royal">{crumb.label}</Link>
              ) : (
                <span className="font-medium text-aicte-textPrimary">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h2 className="text-xl font-bold tracking-tight text-aicte-navy sm:text-2xl">{title}</h2>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
};

export default PageHeader;