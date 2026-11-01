import React from 'react';

export const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required = false, error = null }) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-aicte-navy">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-md border ${error ? 'border-rose-400 ring-rose-100' : 'border-aicte-border'} bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary placeholder-slate-400 focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal`}
      />
      {error && <p className="text-[10px] font-medium text-rose-500">{error}</p>}
    </div>
  );
};

export const FormSelect = ({ label, name, value, onChange, options = [], required = false, error = null }) => {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-aicte-navy">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full rounded-md border ${error ? 'border-rose-400' : 'border-aicte-border'} bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal`}
      >
        <option value="">Select option...</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <p className="text-[10px] font-medium text-rose-500">{error}</p>}
    </div>
  );
};