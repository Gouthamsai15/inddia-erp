import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface TableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
}

export function Table({ headers, children, className }: TableProps) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-slate-200', className)}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-bottom border-slate-200">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {children}
        </tbody>
      </table>
    </div>
  );
}
