
import React from 'react';
import { User, Book, Loan } from '../../types';

export interface OverdueLoan {
  user: User;
  book: Book;
  loan: Loan;
  daysOverdue: number;
}

interface OverdueBooksWidgetProps {
  overdueLoans: OverdueLoan[];
}

const OverdueBooksWidget: React.FC<OverdueBooksWidgetProps> = ({ overdueLoans }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overdue Books</h3>
      {overdueLoans.length > 0 ? (
        <div className="flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
            {overdueLoans.slice(0, 5).map(({ user, book, daysOverdue }, index) => (
              <li key={`${user.id}-${book.id}-${index}`} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate" title={book.title}>{book.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Borrowed by: {user.name}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">{daysOverdue} days</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">overdue</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-10">No overdue books at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default OverdueBooksWidget;
