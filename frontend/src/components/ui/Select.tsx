import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  labelClassName?: string;
}

export function Select({ label, labelClassName, id, className, children, ...rest }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={labelClassName ?? "text-sm font-medium text-gray-700"}>
        {label}
      </label>
      <select
        id={id}
        className={`rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className ?? ""}`}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}
